<template>
<div class="useredit">
    <Title title="编辑会员信息"
        back></Title>
    <Input label="用户昵称"
        msg="请输入用户昵称"></Input>
    <Input hasslot
        label="会员头像">
    <div class="field">
        <div class="img-item"
            v-for="(e, index) in img">
            <img :src="e.url"
                alt="">
            <div class="img-item-del"
                @click="del(index)">×
            </div>
        </div>
        <label for="avatar-upload"
            class="upload-label">
            +
        </label>
        <input id="avatar-upload"
            type="file"
            class="hidden-input"
            @change="handlchange">
    </div>
    </Input>
    <Input label="单选框"
        hasslot>
    <div class="radio-box">
        <input type="radio"
            id="man"
            name="gender"
            value="1">
        <label for="man">男</label>
        <input type="radio"
            id="woman"
            name="gender"
            value="2">
        <label for="woman">女</label>
    </div>
    </Input>
    <Input label="日历"
        hasslot>
    <div class="birthday">

    </div>
    </Input>
</div>
</template>

<script>
import Title from '@/components/title.vue'
export default {
    components: {
        Title
    },
    data() {
        return {
            img: []
        }
    },
    methods: {
        handlchange(e) {
            let file = e.target.files[0]
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.img.push({
                    raw: file,
                    url: reader.result
                })
            }
        }
    }
}
</script>

<style scoped
    lang="scss">
    .useredit {
        width: 100%;
        height: 100%;
        padding-top: 44px;

        .radio-box {
            display: flex;
            align-items: center;
            gap: 10px;

            input {
                width: 20px;
                height: 20px;
                background-color: #fff;
                border: 1px solid #ccc;
                border-radius: 50%;
                outline: none;
                -webkit-appearance: none;

                &:checked {
                    background-color: #1989fa;
                    text-align: center;

                    &::after {
                        content: '✓';
                        color: #fff;
                    }
                }
            }
        }

        .field {
            width: 100%;
            display: flex;
            gap: 5px;
            flex-wrap: wrap;
            align-items: center;

            .img-item {
                position: relative;

                img {
                    width: 80px;
                    height: 80px;
                }

                .img-item-del {
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 14px;
                    height: 14px;
                    font-size: 8px;
                    text-align: center;
                    background-color: rgba(0, 0, 0, 0.5);
                    color: #fff;
                    border-radius: 0 0 0 80%;
                }
            }

            .hidden-input {
                width: 0px;
                height: 0px;
            }

            .upload-label {
                width: 80px;
                line-height: 80px;
                text-align: center;
                border: 1px dashed #ccc;
                border-radius: 4px;
                font-size: 24px;
                color: #999;
            }
        }
    }
</style>