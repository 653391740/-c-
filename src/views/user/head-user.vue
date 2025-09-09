<template>
<div class="head_user">
    <div class="head_user_info">
        <img :src="userinfo.avatarurl ? 'http://43.138.15.137:4000' + userinfo.avatarurl : '/src/assets/static.png'">
        <div class="name">
            <h3 @click="userinfo.uid ? '' : $router.push('/login')">{{ userinfo.nickname ? userinfo.nickname : '请登录' }}</h3>
            <p @click="$router.push('/useredit')">完善资料让我更懂你</p>
        </div>
        <div class="sign">
            <img src="/src/assets/sign.png">
            <p>每日签到</p>
        </div>
    </div>
    <ul>
        <li>
            <span>12</span>
            <p>我的搜藏</p>
        </li>
        <li>
            <span>12</span>
            <p>浏览记录</p>
        </li>
        <li>
            <span>¥ 0</span>
            <p>我的红包</p>
        </li>
        <li>
            <span>12</span>
            <p>优惠卷</p>
        </li>
    </ul>
    <div class="head_user_order">
        <div class="top">
            <h4>我的订单</h4>
            <a href="#">全部订单 ></a>
        </div>
        <ul>
            <li v-for="(item, index) in orderStatusList"
                :key="index"
                @click="$router.push('/orderlist')">
                <img :src="item.icon">
                <p>{{ item.text }}</p>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            userinfo: {},
            orderStatusList: [
                {
                    icon: '/src/assets/fk.png',
                    text: '待付款'
                },
                {
                    icon: '/src/assets/fh.png',
                    text: '待发货'
                },
                {
                    icon: '/src/assets/qr.png',
                    text: '待确认'
                },
                {
                    icon: '/src/assets/sh.png',
                    text: '售后/退款'
                }
            ]
        }
    },
    mounted() {
        if (localStorage.getItem('userinfo')) this.userinfo = JSON.parse(localStorage.getItem('userinfo'))
        console.log(this.userinfo)
    },
}
</script>

<style scoped
    lang="scss">
    .head_user {
        width: 100%;
        height: 210px;
        background: linear-gradient(#FF6040, #FF8A80);
        color: #fff;
        position: relative;

        .head_user_info {
            display: flex;
            align-items: center;
            position: relative;
            padding-top: 10px;

            .name {
                margin-left: 10px;

                h3 {
                    font-weight: normal;
                }

                p {
                    border: 1px solid #fff;
                    font-size: 10px;
                    padding: 0 7px;
                }
            }

            &>img {
                width: 64px;
                height: 64px;
                object-fit: cover;
                border-radius: 50%;
                margin-left: 10px;
            }

            .sign {
                width: 76px;
                height: 20px;
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
                background-color: #FFD4CC;
                border-radius: 10px 0 0 10px;
                display: flex;
                align-items: center;
                justify-content: space-around;
                color: #FF6040;
                font-size: 10px;

                img {
                    width: 16px;
                    height: 16px;
                    margin-left: 7px;
                }
            }

        }

        ul {
            margin-top: 10px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: space-around;

            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 18px;

                p {
                    font-size: 10px;
                }
            }
        }

        .head_user_order {
            position: absolute;
            width: 355px;
            top: 150px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #fff;
            padding: 10px 10px 15px 10px;
            color: #333;

            .top {
                display: flex;
                justify-content: space-between;

                a {
                    font-size: 12px;
                    color: #FF6040;
                }
            }

            ul {
                height: auto;
            }

            img {
                width: 32px;
                height: 32px;
            }
        }
    }
</style>