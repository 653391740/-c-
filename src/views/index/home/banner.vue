<template>
<div class="carousel-container"
    ref="carouselContainer">
    <!-- 轮播图轨道 -->
    <div class="carousel-track"
        ref="carouselTrack">
        <div class="carousel-item"
            v-if="slides.length">
            <img :src="'http://43.138.15.137:4000' + slides[slides.length - 1].img"
                :alt="slides[slides.length - 1].alt"
                class="carousel-img">
        </div>

        <!-- 实际轮播项 -->
        <div class="carousel-item"
            v-for="(slide, index) in slides"
            :key="slide.id">
            <img :src="'http://43.138.15.137:4000' + slide.img"
                :alt="slide.title"
                class="carousel-img">
        </div>

        <!-- 复制第一张到结尾，用于无缝滚动 -->
        <div class="carousel-item"
            v-if="slides.length">
            <img :src="'http://43.138.15.137:4000' + slides[0].img"
                :alt="slides[0].title"
                class="carousel-img">
        </div>
    </div>

    <!-- 指示器 -->
    <div class="carousel-indicators"
        v-if="slides.length > 1">
        <button class="indicator"
            v-for="(slide, index) in slides"
            :key="index"
            :class="{ 'active': index === currentIndex - 1 }"
            aria-label="切换到第n张轮播图"></button>
    </div>

</div>
</template>

<script>
import {
    getbanner
} from '@/api/home'
export default {
    name: 'SeamlessCarousel',
    data() {
        return {
            slides: [], // 轮播图数据
            currentIndex: 1, // 索引
            touchTime: 0, // 触摸时间
            timer: null, // 自动播放定时器
            startX: 0, // 触摸开始位置
        };
    },
    mounted() {
        this.getbanner()
        this.bindTouchEvents();
    },
    beforeUnmount() {
        this.clearTimer();
        this.unbindTouchEvents();
    },
    watch: {
        currentIndex() {
            this.updateCarouselPosition();
        }
    },
    methods: {
        async getbanner() {
            const { code, list } = await getbanner()
            if (code === 200) {
                this.slides = list
                this.startAutoPlay();
            }
        },

        updateCarouselPosition() {
            if (this.$refs.carouselTrack) {
                this.$refs.carouselTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
            }
        },

        startAutoPlay() {
            this.clearTimer();
            if (this.slides.length > 0) {
                this.timer = setInterval(() => {
                    this.nextSlide();
                }, 3000);
            }
        },

        // 清除计时器
        clearTimer() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },

        // 下一张
        nextSlide() {
            this.currentIndex++;
            if (this.currentIndex > this.slides.length) {
                setTimeout(() => {
                    // 无缝滚动处理：立即跳到第一张，无过渡效果
                    this.$refs.carouselTrack.style.transition = 'none';
                    this.currentIndex = 1;
                    setTimeout(() => {
                        this.$refs.carouselTrack.style.transition = 'transform 0.3s ease';
                    }, 10);
                }, 300);
            }
        },

        // 上一张
        prevSlide() {
            this.currentIndex--;
            if (this.currentIndex < 1) {
                setTimeout(() => {
                    this.$refs.carouselTrack.style.transition = 'none';
                    this.currentIndex = this.slides.length;
                    setTimeout(() => {
                        this.$refs.carouselTrack.style.transition = 'transform 0.3s ease';
                    }, 10);
                }, 300);
            }
        },

        // 绑定触摸事件
        bindTouchEvents() {
            if (!this.$refs.carouselTrack) return;
            const track = this.$refs.carouselTrack;
            track.addEventListener('touchstart', this.handleTouchStart);
            track.addEventListener('touchmove', this.handleTouchMove);
            track.addEventListener('touchend', this.handleTouchEnd);
        },

        // 解绑触摸事件
        unbindTouchEvents() {
            if (!this.$refs.carouselTrack) return;
            const track = this.$refs.carouselTrack;
            track.removeEventListener('touchstart', this.handleTouchStart);
            track.removeEventListener('touchmove', this.handleTouchMove);
            track.removeEventListener('touchend', this.handleTouchEnd);
        },

        // 触摸开始处理
        handleTouchStart(e) {
            this.$refs.carouselTrack.style.transition = 'none';
            this.startX = e.touches[0].clientX;
            this.touchTime = new Date();
            this.clearTimer();
        },

        handleTouchMove(e) {
            const diffX = e.touches[0].clientX - this.startX;
            const containerWidth = this.$refs.carouselContainer.offsetWidth;
            const x = this.currentIndex * 100 - diffX / containerWidth * 100;
            this.$refs.carouselTrack.style.transform = `translateX(-${x}%)`;
        },

        // 触摸结束处理
        handleTouchEnd(e) {
            this.$refs.carouselTrack.style.transition = 'transform 0.3s ease';
            const diffX = e.changedTouches[0].clientX - this.startX;
            const time = new Date() - this.touchTime;

            let shouldChange = false;
            if (time < 300 && Math.abs(diffX) > 10) {
                shouldChange = true;
            } else if (Math.abs(diffX) > window.innerWidth / 2) {
                shouldChange = true;
            }

            if (shouldChange) {
                if (diffX > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            } else {
                this.updateCarouselPosition();
            }
            this.startAutoPlay();
        }
    }
};
</script>

<style scoped>
.carousel-container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 10px auto;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.carousel-track {
    transition: transform 0.3s ease;
    display: flex;
    width: 100%;
    height: 100%;
}

.carousel-item {
    flex: 0 0 100%;
    width: 100%;
    height: 0;
    padding-bottom: 50%;
    /* 16:9 比例 */
    position: relative;
}

.carousel-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.carousel-indicators {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
}

.indicator {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.5);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    padding: 0;
}

.indicator.active {
    background-color: #ffffff;
}
</style>
