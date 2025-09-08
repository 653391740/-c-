<template>
<div class="addresslist">
    <Title title="地址列表"
        back></Title>
    <ul>
        <li v-for="e, i in address"
            @click="change(e, i)">
            <input type="radio"
                name="address"
                :checked="i === active">
            <div class="label">
                <div class="name">{{ e.username }}&nbsp;
                    {{ e.userphone }}
                    <span v-if="e.status">默认</span>
                </div>
                <div class="address">{{ e.location }}{{ e.useraddress }}</div>
            </div>
            <svg t="1757295468929"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4308"
                width="200"
                height="200">
                <path d="M153.6 902.656a32.256 32.256 0 0 1 0-64h716.8a32.256 32.256 0 0 1 0 64zM743.936 151.04l72.192 72.192a51.2 51.2 0 0 1 0 72.192L358.4 751.616a51.2 51.2 0 0 1-36.352 14.848H226.816a25.6 25.6 0 0 1-25.6-25.6v-97.792a51.2 51.2 0 0 1 14.848-36.352l455.68-455.68a51.2 51.2 0 0 1 72.192 0z m-478.72 497.152v54.272h54.272l442.88-442.88L708.096 204.8z"
                    fill="#969799"
                    @click.stop="edit(e)"
                    p-id="4309"></path>
            </svg>
        </li>
    </ul>
    <div class="newaddress">
        <button>新增地址</button>
    </div>
</div>
</template>
<script>
import { addresslist } from '@/api/cart'
import Title from '@/components/title.vue'
export default {
    components: {
        Title
    },
    data() {
        return {
            address: [],
            active: 0,
            type: this.$route.query.type
        }
    },
    mounted() {
        this.addresslist()
    },
    methods: {
        edit(e) {
            console.log(e);
        },
        change(e, i) {
            if (this.type === 1) {
                this.active = i
                setTimeout(() => {
                    this.$router.replace({
                        path: '/orderconfirm',
                        query: {
                            ...e
                        }
                    })
                }, 500)
            }else if(this.type === 2){
                // this.$router.replace({
                //     path: '/orderconfirm',
                //     query: {
                //         ...e
                //     }
                // })
            }
        },
        async addresslist() {
            const { list } = await addresslist()
            this.address = list
        }
    }
}
</script>
<style scoped
    lang="scss">
    .addresslist {
        padding: 44px 0 50px;

        ul {
            padding: 12px;

            li {
                padding: 12px;
                margin-bottom: 12px;
                width: 100%;
                display: flex;
                align-items: center;

                .label {
                    margin: 0 10px;
                    flex: 1;

                    .name {
                        span {
                            font-size: 14px;
                            color: #fff;
                            background-color: #ee0a24;
                            display: inline-block;
                            padding: 0 5px;
                            border-radius: 12px;
                        }
                    }

                    .address {
                        margin-top: 8px;
                        font-size: 14px;
                        font-weight: 300;
                    }
                }
            }
        }

        .newaddress {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 50px;
            padding: 0 16px;
            background-color: #fff;

            button {
                color: #fff;
                background-color: #ee0a24;
                width: 100%;
                height: 40px;
                margin: 5px 0;
                border-radius: 20px;
                font-size: 14px;
            }
        }
    }
</style>