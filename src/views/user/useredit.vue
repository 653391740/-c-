<template>
<div class="useredit">
    <Title title="编辑会员信息"
        back></Title>
    <Input label="用户昵称"
        msg="请输入用户昵称"
        v-model="userinfo.nickname"></Input>
    <Input hasslot
        label="会员头像">
    <div class="field">
        <div class="img-item"
            v-for="(e, index) in img">
            <img :src="e.url && e.url.includes('uploads')
                ? 'http://43.138.15.137:4000' + e.url : e.url"
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
            value="1"
            v-model="userinfo.sex">
        <label for="man">男</label>
        <input type="radio"
            id="woman"
            name="gender"
            value="2"
            v-model="userinfo.sex">
        <label for="woman">女</label>
    </div>
    </Input>
    <Input label="日历"
        hasslot>
    <div class="birthday"
        @click="showCalendar = true">{{ userinfo.birthday }}</div>
    </Input>
    <Input label="地区选择"
        hasslot>
    <div class="region"
        @click="showRegion = true">{{ userinfo.region }}</div>
    </Input>
    <button class="submit"
        @click="submit">提交</button>
    <Popup :show.sync="showCalendar">
        <Calendar @date-selected="selectDate"></Calendar>
    </Popup>
    <Popup :show.sync="showRegion"
        :close="false">
        <Region :region="userinfo.region"
            :show.sync="showRegion"
            @region-change="userinfo.region = $event"></Region>
    </Popup>
</div>
</template>

<script>
import { getuserinfo, infoedit } from '@/api/login'
import Popup from '@/components/Popup.vue';
import Title from '@/components/title.vue'
import Calendar from './calendar.vue'
import Region from '../../components/region.vue'
export default {
    components: {
        Title,
        Popup,
        Calendar,
        Region
    },
    data() {
        return {
            img: [],
            userinfo: {},
            showCalendar: false,
            showRegion: false
        }
    },
    mounted() {
        this.getuserinfo()
    },
    methods: {
        async submit() {
            const data = { ...this.userinfo, avatarurl: this.img[0].raw ? this.img[0].raw : this.img[0].url }
            if (!Object.values(data).every(e => e)) return this.$msg('请填写完整信息')
            const { code, list: { avatarurl } } = await infoedit(data);
            if (code === 200) {
                localStorage.setItem('userinfo', JSON.stringify({
                    ...JSON.parse(localStorage.getItem('userinfo')),
                    avatarurl,
                    nickname: this.userinfo.nickname,
                }))
                this.$popupMsg.success('修改成功')
                setTimeout(() => this.$router.back(), 500)
            }
        },
        selectDate(date) {
            const dates = new Date(date);
            const birthday = `${dates.getMonth() + 1}/${dates.getDate()}`;
            this.userinfo.birthday = birthday
            this.showCalendar = false
        },
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
        },
        async getuserinfo() {
            let { code, list } = await getuserinfo()
            if (code === 200) {
                this.userinfo = list[0]
                this.img = [{
                    url: list[0].avatarurl
                }]
            }
        },
        del(index) {
            this.img.splice(index, 1)
        },
    }
}
</script>

<style scoped
    lang="scss">
    .useredit {
        width: 100%;
        height: 100%;
        padding-top: 44px;

        input:checked {
            background-color: #1989fa;
        }

        .submit {
            background-color: #ff6040;
            color: #fff;
            font-size: 14px;
            height: 44px;
            border-radius: 22px;
            margin: 16px;
            width: calc(100% - 32px);
        }

        .radio-box {
            display: flex;
            align-items: center;
            gap: 10px;
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