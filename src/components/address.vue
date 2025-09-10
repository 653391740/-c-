<template>
<div class="addressbox">
    <Input label="姓名"
        placeholder="收货人姓名"
        v-model="form.username"></Input>
    <Input label="电话"
        placeholder="收货人手机号"
        v-model="form.userphone"></Input>
    <Input label="地区"
        @click="showCity = true"
        hasslot>
    <div class="city">
        <p :style="{ color: form.location ? '#333' : '#c8c9cf' }">{{ form.location || '选择省 / 市 / 区' }}</p>
        <span>></span>
    </div>
    </Input>
    <Input label="详细地址"
        hasslot>
    <div class="address">
        <textarea placeholder="街道门牌、楼层房间号等信息"
            @focus="isfocus = true"
            @blur="isfocus = false"
            rows="4"
            maxlength="150"
            v-model="form.useraddress"></textarea>
        <span :style="{ opacity: form.useraddress && isfocus ? 1 : 0 }"
            @click="form.useraddress = ''">×</span>
    </div>
    </Input>
    <Input label="设为默认收货地址"
        hasslot>
    <div class="switch">
        <input type="checkbox"
            id="switch"
            v-model="form.status"
            :true-value="1"
            :false-value="0">
        <label for="switch">
        </label>
    </div>
    </Input>
    <button class="save"
        @click="save">保存</button>
    <button class="delete"
        @click="dialogShow = true">删除</button>
    <Popup :show.sync="showCity"
        :close="false">
        <Region :region="form.location"
            :show.sync="showCity"
            @region-change="form.location = $event.split(',').join('/')"></Region>
    </Popup>
    <Dialog :show="dialogShow"
        title="确定要删除吗?"
        @close="dialogShow = false"
        @confirm="del">
    </Dialog>
</div>
</template>

<script>
import Dialog from '@/components/dialog.vue'
import Popup from '@/components/Popup.vue'
import Region from '@/components/region.vue'
export default {
    components: {
        Popup,
        Region,
        Dialog
    },
    props: {
        form: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            dialogShow: false,
            showCity: false,
            isfocus: false,
        }
    },
    methods: {
        save() {
            const { status, regioncode, ...other } = this.form
            if (!Object.values(other).every(e => e)) return this.$msg('请填写完整信息')
            this.$emit('save')
        },
        del() {
            this.dialogShow = false
            console.log(this.$route.query);
            this.$emit('delete')
        }
    }
}
</script>

<style scoped
    lang="scss">
    .addressbox {
        height: 100%;

        button {
            width: 341px;
            height: 44px;
            border-radius: 22px;
            margin: 5px 17px;
        }

        .save {
            margin-top: 20px;
            background-color: #ee0a24;
            color: #fff;
        }

        .delete {
            background-color: #fff;
            border: 1px solid #ccc;
        }

        .switch {
            text-align: right;

            input {
                display: none;

                &:checked+label {
                    background-color: #1989fa;

                    &::after {
                        transform: translateX(25px);
                    }
                }
            }

            label {
                display: inline-block;
                width: 50px;
                height: 25px;
                border-radius: 12.5px;
                background-color: #fff;
                border: 1px solid #ccc;
                position: relative;
                transition: all 0.3s ease;
                cursor: pointer;

                &::after {
                    content: '';
                    position: absolute;
                    left: 1px;
                    width: 23px;
                    height: 23px;
                    border-radius: 11.5px;
                    background-color: #fff;
                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
                    transition: transform 0.5s;
                }
            }
        }

        .address {
            display: flex;
            align-items: center;
            justify-content: space-between;

            textarea {
                flex: 1;
                border: 0;
                outline: none;
                font-size: 16px;

                &::placeholder {
                    color: #c8c9cf;
                }
            }

            span {
                width: 16px;
                line-height: 16px;
                border-radius: 50%;
                font-size: 10px;
                text-align: center;
                color: #fff;
                background-color: #c8c9cc;
            }
        }

        .city {
            line-height: 35px;
            overflow: hidden;
            position: relative;

            p {
                flex: 1;
                margin: 0;
            }

            span {
                padding-left: 5px;
                background-color: #fff;
                color: #c8c9cf;
                position: absolute;
                right: 0;
                top: 0;
            }
        }
    }
</style>