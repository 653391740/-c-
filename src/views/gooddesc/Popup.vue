<template>
<Popup :show="show" @close="togglePopup">
    <div class="head">
        <img :src="img">
        <div>
            <p><span>¥</span>30000</p>
            <span>剩余 400 件</span>
            <span>请选择 {{ color ? '' : '颜色' }}
                {{ gMemory ? '' : '内存' }} </span>
        </div>
    </div>
    <div class="item">
        <div class="title">颜色</div>
        <ul>
            <li :class="{ 'active': color === 'blue' }"
                @click="handleColor('blue', $event)">
                <img src="https://img14.360buyimg.com/n0/jfs/t1/195251/28/503/70907/608a8bc4E87eaf1ae/9aa39ad669ed7f39.jpg">
                <p>蓝色</p>
            </li>
            <li :class="{ 'active': color === 'pink' }"
                @click="handleColor('pink', $event)">
                <img src="https://img14.360buyimg.com/n0/jfs/t1/131776/9/23287/325305/621f295fE9dc6a3ce/117b4d1ed262266a.jpg">
                <p>粉色</p>
            </li>
        </ul>
    </div>
    <div class="item">
        <div class="title">内存</div>
        <button :class="{ 'active': gMemory === '4' }"
            @click="handleMemory('4')">4G</button>
        <button :class="{ 'active': gMemory === '8' }"
            @click="handleMemory('8')">8G</button>
    </div>
    <div class="item">
        <div class="title">购买数量
            <div class="count">
                <button @click="num > 1 ? num-- : num = 1"
                    :style="{
                        backgroundColor: num > 1 ? '#f2f3f5' : '#f7f8fa'
                    }">-</button>
                <p>{{ num }}</p>
                <button @click="num++">+</button>
            </div>
        </div>
    </div>

    <div class="button">
        <button @click="$emit('addCart', {
            num,
            color,
            gMemory
        })">加入购物车</button>
        <button>立即购买</button>
    </div>
</Popup>
</template>

<script>
import Popup from '@/components/Popup.vue';

export default {
    data() {
        return {
            num: 1,
            color: '',
            gMemory: '',
            img: JSON.parse(sessionStorage.getItem('img'))
        }
    },
    components: {
        Popup
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
    },
    methods: {
        handleColor(color, e) {
            if (color === this.color) {
                this.color = ''
                this.img = JSON.parse(sessionStorage.getItem('img'))
                return
            }
            e.target.tagName === 'P'
                ? this.img = e.target.previousElementSibling.src
                : this.img = e.target.src
            this.color = color
        },
        handleMemory(gMemory) {
            if (gMemory === this.gMemory) return this.gMemory = ''
            this.gMemory = gMemory
        },
        togglePopup() {
            if (this.show) {
                this.$emit('update:show', false);
            }
        }
    }
}
</script>

<style scoped
    lang="scss">
    .popup {
        transition: all .2s linear;
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        background-color: rgba(0, 0, 0, 0.5);

        .popup-content {
            position: absolute;
            transition: all .2s ease-in-out;
            transform: translateY(100%);
            bottom: 0;
            width: 100%;
            background-color: #fff;
            border-radius: 20px 20px 0 0;
            padding: 0 16px;
            max-height: 80%;
            min-height: 50%;

            .button {
                display: flex;
                padding: 12px 0;

                button:first-child {
                    border-radius: 20px 0 0 20px;
                    background: linear-gradient(to right, #ffd01e, #ff8917);
                }

                button:last-child {
                    border-radius: 0 20px 20px 0;
                    background: linear-gradient(to right, #ff6034, #ee0a24);
                }

                button {
                    flex: 1;
                    height: 40px;
                    font-size: 15px;
                    color: #fff;
                }
            }

            .head {
                padding-top: 12px;
                display: flex;
                gap: 12px;

                img {
                    width: 96px;
                    height: 96px;
                    border-radius: 5px;
                    object-fit: cover;
                }

                div {
                    display: flex;
                    flex-direction: column;
                    justify-content: end;

                    p {
                        font-size: 22px;
                        color: #ee0a24;

                        span {
                            font-size: 16px;
                        }
                    }

                    &>span {
                        color: #969799;
                        font-size: 12px;
                        line-height: 1;
                        margin-top: 8px;
                    }
                }
            }

            .item {
                border-top: 1px solid #f0e8e8;
                margin-top: 10px;

                .title {
                    padding: 12px 0;
                    display: flex;
                    justify-content: space-between;
                }

                .count {
                    display: flex;
                    align-items: center;
                    gap: 2px;

                    button:first-child {
                        border-radius: 4px 0 0 4px;
                    }

                    button:last-child {
                        border-radius: 0 4px 4px 0;
                    }


                    p {
                        background-color: #f2f3f5;
                        text-align: center;
                        width: 32px;
                        font-size: 14px;
                        line-height: 28px;
                    }

                    button {
                        height: 28px;
                    }
                }

                &>button {
                    font-size: 13px;
                    padding: 8px 10px;
                    background-color: #f7f8fa;
                    margin-right: 10px;

                    &.active {
                        color: #ee0a24;
                        background-color: #fde6e9;
                    }
                }

                ul {
                    display: flex;
                    gap: 12px;

                    li {
                        width: 110px;
                        border-radius: 5px;
                        overflow: hidden;
                        border: 1px solid transparent;

                        &.active {
                            border: 1px solid #ee0a24;

                            p {
                                color: #ee0a24;
                                background-color: #fde6e9;
                            }
                        }

                        img {
                            width: 100%;
                            height: 110px;
                        }

                        p {
                            line-height: 40px;
                            font-size: 12px;
                            text-align: center;
                            background-color: #f7f8fa;
                        }
                    }
                }
            }

            .popup-close {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 25px;
                line-height: 1;
                font-weight: bold;
                color: #c8c9cc;
            }
        }

        &.show {
            opacity: 1;
            z-index: 110;

            .popup-content {
                transform: translateY(0);
            }
        }
    }


</style>