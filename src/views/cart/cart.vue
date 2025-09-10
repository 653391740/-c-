<template>
<div class="cart-box">
    <div class="top">
        <ul>
            <li v-for="e, i in list"
                @click="cl"
                @touchstart="touchstart($event, i)"
                @touchmove="touchmove($event, i)"
                @touchend="touchend($event, i)"
                ref="li">
                <input type="checkbox"
                    :checked="e.status === 1"
                    @change="e.status = $event.target.checked ? 1 : 0">
                <img :src="'http://43.138.15.137:4000' + e.img">
                <div class="info">
                    <div class="name">{{ e.goodsname }}</div>
                    <div class="desc">描述信息</div>
                    <div class="priceAndnum">
                        <p><span>¥</span>{{ e.price }}</p>
                        <div class="num">
                            <button :class="{ 'disabled': e.num <= 1 }"
                                @touchstart="changeNum(e.id, 1)">-</button>
                            <span> × </span>{{ e.num }}
                            <button @touchstart="changeNum(e.id, 2)">+</button>
                        </div>
                    </div>
                </div>
                <div class="del"
                    @touchstart="dialogTrue(e.id)">删除</div>
            </li>
        </ul>
    </div>
    <dingdan :isAll.sync="isAll"
        @submit="submit"
        :total="total"></dingdan>
    <Dialog :show="dialogShow"
        msg="确定要删除吗?"
        @close="dialogShow = false"
        @confirm="del">
    </Dialog>
</div>
</template>

<script>
import { cartedit, cartdel } from '@/api/cart'
import Dialog from '@/components/dialog.vue'
import dingdan from '@/components/dingdan.vue'

export default {
    components: {
        Dialog,
        dingdan
    },
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            dialogShow: false,
            startX: 0,
            startY: 0,
            moveX: 0,
            moveY: 0,
            delId: 0,
            slideDirection: null
        }
    },
    computed: {
        isAll: {
            get() {
                return this.list.every(e => e.status === 1)
            },
            set(val) {
                this.list.forEach(e => e.status = val ? 1 : 0)
            }
        },
        total() {
            return this.list.reduce((pre, cur) => {
                if (cur.status === 1) {
                    return pre + cur.price * cur.num
                }
                return pre
            }, 0)
        },
        countNumber() {
            return this.list.reduce((pre, cur) => {
                if (cur.status === 1) {
                    return pre + cur.num
                }
                return pre
            }, 0)
        },
    },
    methods: {
        submit() {
            if (this.list.filter(e => e.status === 1).length === 0) return this.$msg('请先选择需要购买的商品信息')
            this.$router.push('/orderconfirm')
            localStorage.setItem('orderData', JSON.stringify({
                countmoney: this.total,
                countnumber: this.countNumber,
                orderData: this.list.filter(e => e.status === 1)
            }))
        },
        dialogTrue(id) {
            this.dialogShow = true
            this.delId = id
        },
        async del() {
            this.dialogShow = false
            const { code, msg } = await cartdel({ id: this.delId })
            if (code === 200) {
                this.$msg(msg)
                const index = this.list.findIndex(e => e.id === this.delId)
                this.list.splice(index, 1)
            }
        },
        touchstart(e, i) {
            const index = this.list.findIndex(e => e.isdel)
            if (index !== i) this.cl()
            this.startX = e.touches[0].clientX
            this.startY = e.touches[0].clientY
            this.slideDirection = null
        },
        cl() {
            this.list.forEach((e, i) => {
                e.isdel = false
                this.$refs.li[i].style.transform = `translateX(0px)`
            });
        },
        touchend(e, i) {
            if (this.slideDirection === 'horizontal') {
                this.$refs.li[i].style.transition = `all .5s`
                this.moveX = e.changedTouches[0].clientX
                const deltaX = this.moveX - this.startX
                if (deltaX < -10) {
                    this.$refs.li[i].style.transform = `translateX(-60px)`
                    this.list[i].isdel = true
                } else if (deltaX > 10) {
                    this.$refs.li[i].style.transform = `translateX(0px)`
                    this.list[i].isdel = false
                }
            }
        },
        touchmove(e, i) {
            this.moveX = e.changedTouches[0].clientX
            this.moveY = e.changedTouches[0].clientY

            const deltaX = this.moveX - this.startX
            const deltaY = this.moveY - this.startY

            if (this.slideDirection === null) {
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    this.slideDirection = 'horizontal'
                } else {
                    this.slideDirection = 'vertical'
                }
            }

            if (this.slideDirection === 'horizontal') {
                this.$refs.li[i].style.transition = `none`
                this.moveX = e.changedTouches[0].clientX
                const startX = (this.list[i].isdel ? -60 : 0) + this.moveX - this.startX
                this.$refs.li[i].style.transform
                    = `translateX(${startX < -60 ? -60
                        : startX > 0 ? 0 : startX}px)`
            }
        },
        changeNum(id, type) {
            const find = this.list.find(e => e.id === id)
            if (find.num <= 1 && type === 1) return
            if (type === 1) find.num--
            if (type === 2) find.num++
            cartedit({ id, type })
        }
    }
}
</script>

<style scoped
    lang="scss">
    .cart-box {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top {
            overflow: scroll;
            flex: 1;
        }

        ul {
            padding-top: 2px;
            display: flex;
            flex-direction: column;
            gap: 5px;
            overflow: hidden;
            flex: 1;

            li {
                transition: all .5s;
                display: flex;
                align-items: center;
                padding: 15px 50px 15px 20px;
                background-color: #fff;
                position: relative;

                .del {
                    width: 60px;
                    height: 118px;
                    position: absolute;
                    background-color: #ff6040;
                    color: #fff;
                    text-align: center;
                    line-height: 118px;
                    top: 0;
                    right: -60px;
                }

                img {
                    width: 88px;
                    height: 88px;
                    margin: 0 10px;
                }

                .info {
                    flex: 1;
                    font-size: 12px;

                    .desc {
                        line-height: 20px;
                        color: #646566;
                        margin-bottom: 20px;
                    }

                    .priceAndnum {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;

                        p {
                            font-size: 16px;

                            span {
                                margin-right: 2px;
                            }
                        }

                        span {
                            font-size: 10px;
                            margin-right: -5px;
                        }

                        .num {
                            display: flex;
                            gap: 5px;
                            align-items: center;
                            color: #969799;
                            font-size: 12px;

                            button {
                                background-color: #ff6040;
                                color: #fff;

                                &.disabled {
                                    background-color: #ffaf9f;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>