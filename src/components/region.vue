<template>
<div class="box">
    <div class="toolbar">
        <div class="close"
            @click="$emit('update:show', false)">取消</div>
        <div class="confirm"
            @click="confirm">确认</div>
    </div>
    <div class="calendar"
        ref="calendar">
        <ul @touchstart="handleTouchStart($event, 0)"
            @touchmove="handleTouchMove($event, 0)"
            @touchend="handleTouchEnd($event, 0)">
            <li v-for="(e, i) in regionlist"
                :key="e.province">{{ e.province }}</li>
        </ul>
        <ul @touchstart="handleTouchStart($event, 1)"
            @touchmove="handleTouchMove($event, 1)"
            @touchend="handleTouchEnd($event, 1)">
            <li v-for="(e, i) in provlist"
                :key="e.city">{{ e.city }}</li>
        </ul>
        <ul @touchstart="handleTouchStart($event, 2)"
            @touchmove="handleTouchMove($event, 2)"
            @touchend="handleTouchEnd($event, 2)">
            <li v-for="(e, i) in citylist"
                :key="e.area">{{ e.area }}</li>
        </ul>
        <div class="selected"></div>
        <div class="pop"></div>
    </div>
</div>
</template>
<script>
import json from '/public/city.json'
export default {
    data() {
        return {
            regionlist: json, // 地区数据列表
            province: '北京市', // 当前选中的省份
            citys: '北京市', // 当前选中的城市
            areas: '东城区', // 当前选中的区域
            Y: [
                {
                    StartY: 0, // 触摸开始时的Y坐标
                    MoveY: 0, // 当前移动的Y坐标偏移量
                    LastMoveY: 0, // 上一次移动的Y坐标偏移量
                    Velocity: 0 // 当前滑动速度（像素/毫秒）
                },
                {
                    StartY: 0, // 触摸开始时的Y坐标
                    MoveY: 0, // 当前移动的Y坐标偏移量
                    LastMoveY: 0, // 上一次移动的Y坐标偏移量
                    Velocity: 0 // 当前滑动速度（像素/毫秒）
                },
                {
                    StartY: 0, // 触摸开始时的Y坐标
                    MoveY: 0, // 当前移动的Y坐标偏移量
                    LastMoveY: 0, // 上一次移动的Y坐标偏移量
                    Velocity: 0 // 当前滑动速度（像素/毫秒）
                }
            ],
            time: null, // 触摸开始时间
            lastMoveTime: null, // 上一次移动的时间,
        }
    },
    props: {
        region: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        provlist() {
            const provinceName = this.province || '北京市';
            return this.regionlist.find(e => e.province === provinceName)?.citys || [];
        },
        citylist() {
            const cityName = this.citys || '北京市';
            return this.provlist.find(e => e.city === cityName)?.areas || [];
        },
    },
    methods: {
        confirm() {
            this.$emit('update:show', false)
            this.$emit('region-change', `${this.province},${this.citys},${this.areas}`)
        },
        // handleClick(e, i, index) {
        //     this.Y[i].MoveY = -index * 44;
        // },
        handleTouchStart(e, i) {
            this.Y[i].StartY = e.touches[0].clientY - this.Y[i].MoveY;
            this.lastMoveTime = new Date();
            // 记录上一次的移动位置，用于计算速度
            this.Y[i].LastMoveY = this.Y[i].MoveY;
            // 重置速度，准备计算新的滑动速度
            this.Y[i].Velocity = 0;
        },
        handleTouchMove(e, i) {
            const dome = this.$refs.calendar.children[i]
            const scrollDistance = e.touches[0].clientY - this.Y[i].StartY
            const scrollToTheBottom = this.num(i)
            const now = new Date();
            const deltaTime = now - this.lastMoveTime;// 移动时间距上次差多少毫秒
            const deltaMove = scrollDistance - this.Y[i].MoveY;// 移动距离距上次差多少px
            this.Y[i].Velocity = deltaMove / deltaTime; // 移动速度px/ms
            this.Y[i].LastMoveY = this.Y[i].MoveY; // 上一次移动的位置

            // 限制滚动范围，不能超过顶部和底部边界
            this.Y[i].MoveY = scrollDistance > 0 ? 0
                : scrollDistance < scrollToTheBottom
                    ? scrollToTheBottom : scrollDistance;
            // 关闭过渡跟随手动滑动
            dome.style.transition = 'none';
            dome.style.transform = `translateY(${this.Y[i].MoveY}px)`;

            this.lastMoveTime = now;
        },
        num(i) {
            const listLength = i === 1 ? this.provlist.length : i === 2 ? this.citylist.length : this.regionlist.length;
            return -(listLength - 1) * 44;
        },
        reset(i) {
            this.$refs.calendar.children[i].style.transform = `translateY(0px)`
            this.Y[i].MoveY = 0;
        },
        handleTouchEnd(e, i) {
            const dome = this.$refs.calendar.children[i]
            const inertiaStrength = 300;
            let inertiaDistance = this.Y[i].Velocity * inertiaStrength;

            // 计算最终位置 = 当前位置 + 惯性滑动距离
            let finalPosition = this.Y[i].MoveY + inertiaDistance;
            const scrollToTheBottom = this.num(i);
            finalPosition = finalPosition > 0 ? 0
                : finalPosition < scrollToTheBottom
                    ? scrollToTheBottom : finalPosition;
            const currentIndex = Math.round(Math.abs(finalPosition) / 44);
            dome.style.transition = 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            dome.style.transform = `translateY(${-currentIndex * 44}px)`;
            this.Y[i].MoveY = -currentIndex * 44;
            const transitionend = () => {
                if (i == 0) {
                    this.province = this.regionlist[currentIndex].province
                    this.citys = this.provlist[0].city
                    this.areas = this.citylist[0].area
                    this.reset(1)
                    this.reset(2)
                } else if (i == 1) {
                    this.citys = this.provlist[currentIndex].city
                    this.areas = this.citylist[0].area
                    this.reset(2)
                } else if (i == 2) {
                    this.areas = this.citylist[currentIndex].area
                }
            }
            dome.addEventListener('transitionend', transitionend)
            if (-currentIndex * 44 === scrollToTheBottom) {
                transitionend()
            }
            this.Y[i].Velocity = 0;
        }
    },
}
</script>

<style scoped
    lang="scss">
    .box {
        position: relative;

        .toolbar {
            display: flex;
            justify-content: space-between;

            div {
                padding: 0 16px;
                line-height: 44px;
                font-size: 14px;
            }

            .close {
                color: #969799;
            }

            .confirm {
                color: #576b95;
            }
        }
    }

    .calendar {
        display: flex;
        height: 300px;
        overflow: hidden;
        position: relative;

        .pop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(#ffffff, transparent calc(50% - 22px), transparent calc(50% + 22px), #fff);
            z-index: 1;
            /* 设置元素不响应鼠标、触摸等指针事件，防止该元素干扰下层元素的交互 */
            pointer-events: none;
        }

        ul {
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            padding: 128px 0;
            text-align: center;
            width: calc(100% / 3);

            li {
                line-height: 44px;
                white-space: nowrap;
            }
        }

        .selected {
            position: absolute;
            width: 100%;
            height: 44px;
            border: solid #ccc;
            border-width: 1px 0 1px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }
    }
</style>