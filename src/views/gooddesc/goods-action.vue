<template>
<div class="goods-action"
    :style="{ zIndex: showPopup ? 101 : 99 }">
    <ul>
        <li class=""
            :class="['iconfont icon-xiaoxi',
                messageCount > 0 ? 'info' : 'info-dot']"
            :data-count="messageCount">客服</li>
        <li :class="['iconfont icon-gouwuche',
            cartCount > 0 ? 'info' : '']"
            @click="$router.push('/cart')"
            :data-count="cartCount">购物车</li>
        <li :class="['iconfont icon-store',
            storeCount > 0 ? 'info' : '']"
            :data-count="storeCount">店铺</li>
    </ul>
    <button class="button-first"
        @click="showPopup = true">加入购物车</button>
    <button class="button-last">立即购买</button>
    <Popup :show.sync="showPopup">
        <Popups @addCart="handleAddCart"></Popups>
    </Popup>
</div>
</template>
<script>
import { cartlist, cartadd } from '@/api/cart'
import Popup from '@/components/Popup.vue'
import Popups from './Popup.vue'

export default {
    data() {
        return {
            showPopup: false,
            messageCount: 0,
            cartCount: 0,
            storeCount: 12
        }
    },
    async mounted() {
        if (localStorage.getItem('userinfo')) {
            const { list } = await cartlist()
            if (list !== null) this.cartCount = list.length
        }
    },
    methods: {
        async handleAddCart(obj) {
            const userinfo = JSON.parse(localStorage.getItem('userinfo'))
            if ([obj.color, obj.gMemory].every(e => e)) {
                if (!userinfo) return this.$popupMsg.warn('请先登录')
                // 创建飞动动画
                this.createFlyAnimation(obj.img);
                this.showPopup = false
                const { msg, list: { cartCount } } = await cartadd({
                    uid: userinfo.uid,
                    num: obj.num,
                    goodsid: this.$route.query.id
                })
                this.$msg(msg)
                this.cartCount = cartCount
            } else {
                this.$msg('请先选择商品规格')
            }
        },
        createFlyAnimation(img) {
            // 获取商品图片元素
            const productImg = document.querySelector('.popups .head img');

            // 获取购物车元素
            const cartElement = document.querySelector('.goods-action .icon-gouwuche');

            // 获取位置信息
            const productRect = productImg.offset();
            const cartRect = cartElement.getBoundingClientRect();
            console.log(productRect);
            


            // 计算起点（商品图片中心）
            const startX = productRect.left + productRect.width / 2;
            const startY = productRect.top + productRect.height / 2;

            // 计算终点（购物车图标中心）
            const endX = cartRect.left + cartRect.width / 2;
            const endY = cartRect.top + cartRect.height / 2;

            // 计算控制点（形成抛物线）
            // 控制中间点X在起点右侧 形成右抛
            const controlX = startX + 200;
            // 控制点Y在起点上方，形成上抛
            const controlY = startY - 150;

            // 创建飞动的图片元素
            const flyImg = document.createElement('img');
            flyImg.src = img;
            flyImg.style.position = 'fixed';
            flyImg.style.width = '96px';
            flyImg.style.height = '96px';
            flyImg.style.zIndex = '1000';
            flyImg.style.left = `${startX}px`;
            flyImg.style.top = `${startY}px`;
            flyImg.style.transform = 'translate(-50%, -50%)';
            document.body.appendChild(flyImg);

            // 使用requestAnimationFrame实现抛物线动画
            const duration = 600; // 动画持续时间（毫秒）
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);

                // 使用二次贝塞尔曲线公式计算当前位置
                // P = (1−t)²P₁ + 2(1−t)tP₂ + t²P₃
                const t = progress; // 参数t，范围从0到1
                const oneMinusT = 1 - t;

                // 计算X坐标
                const currentX = oneMinusT * oneMinusT * startX +
                    2 * oneMinusT * t * controlX +
                    t * t * endX;

                // 计算Y坐标
                const currentY = oneMinusT * oneMinusT * startY +
                    2 * oneMinusT * t * controlY +
                    t * t * endY;

                // 更新飞动图片位置
                flyImg.style.left = `${currentX}px`;
                flyImg.style.top = `${currentY}px`;

                // 随着动画进行，逐渐缩小并降低透明度
                const scale = 1 - progress * 0.8;
                const opacity = 1 - progress * 0.5;
                const radius = progress * 100 / 1.5;
                flyImg.style.transform = `translate(-50%, -50%) scale(${scale})`;
                flyImg.style.opacity = opacity;
                flyImg.style.borderRadius = `${radius}%`;

                // 继续动画或结束
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    document.body.removeChild(flyImg);
                }
            };

            // 调用 requestAnimationFrame 方法来启动动画循环，将 animate 函数作为回调传入。
            // requestAnimationFrame 会在浏览器下一次重绘之前调用该回调函数，从而实现平滑的动画效果。
            requestAnimationFrame(animate);
        }
    },
    components: {
        Popups,
        Popup
    }
}
</script>

<style scoped
    lang="scss">
    .goods-action {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        z-index: 99;
        background-color: #fff;

        ul {
            display: flex;
            align-items: center;

            li {
                width: 48px;
                height: 50px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                position: relative;

                &.info {
                    &::after {
                        content: attr(data-count);
                        color: #fff;
                        position: absolute;
                        font-size: 12px;
                        line-height: 1;
                        left: 28px;
                        bottom: 34px;
                        padding: 1px 4px;
                        background-color: red;
                        border-radius: 7px;
                    }
                }

                &.info-dot {
                    &::after {
                        content: '';
                        position: absolute;
                        left: 33px;
                        bottom: 40px;
                        padding: 3px;
                        background-color: red;
                        border-radius: 50%;
                    }
                }

                &::before {
                    font-size: 18px;
                }
            }
        }

        button {
            flex: 1;
            height: 40px;
            font-size: 14px;
            color: #fff;
            border-radius: 0;

            &.button-first {
                background: linear-gradient(to right, #ffd01e, #ff8917);
                border-top-left-radius: 25px;
                border-bottom-left-radius: 25px;
                margin-left: 5px;
            }

            &.button-last {
                background: linear-gradient(to right, #ff6034, #ee0a24);
                border-top-right-radius: 25px;
                border-bottom-right-radius: 25px;
                margin-right: 5px;
            }
        }
    }
</style>