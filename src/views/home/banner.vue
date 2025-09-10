<template>
<div class="carousel-container"
    ref="carouselContainer">
    <!-- 轮播图轨道 -->
    <div class="carousel-track"
        ref="carouselTrack"
        :style="{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: isTransitioning ? 'transform 0.3s ease' : 'none'
        }">
        <!-- 复制最后一张到开头，用于无缝滚动 -->
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
            :class="{ 'active': index === realIndex }"
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
            slides: [],
            autoPlay: true,
            currentIndex: 1,
            timer: null,
            isTransitioning: false,
            startX: 0,
            endX: 0,
            touchTime: 0
        };
    },
    computed: {
        // 实际显示的索引（排除前后复制的元素）
        realIndex() {
            if (this.currentIndex === 0) {
                return this.slides.length - 1;
            } else if (this.currentIndex === this.slides.length + 1) {
                return 0;
            }
            return this.currentIndex - 1;
        }
    },
    mounted() {
        if (this.autoPlay) this.startAutoPlay();
        this.getbanner()
        this.bindTouchEvents();
    },
    beforeUnmount() {
        this.unbindTouchEvents();
    },
    methods: {
        async getbanner() {
            const { code, list } = await getbanner()
            if (code === 200) {
                this.slides = list
            }
        },
        // 开始自动轮播
        startAutoPlay() {
            this.clearTimer();
            this.timer = setInterval(() => {
                this.nextSlide();
            }, 3000);
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
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentIndex++;

            // 当到达最后一个复制的元素时，无缝切换到第一个
            setTimeout(() => {
                if (this.currentIndex > this.slides.length) {
                    this.isTransitioning = false;
                    this.currentIndex = 1;
                } else {
                    this.isTransitioning = false;
                }
            }, 500);

            // 重置自动轮播计时器
            if (this.autoPlay) {
                this.startAutoPlay();
            }
        },

        // 上一张
        prevSlide() {
            if (this.isTransitioning) return;

            this.isTransitioning = true;
            this.currentIndex--;

            // 当到达第一个复制的元素时，无缝切换到最后一个
            setTimeout(() => {
                if (this.currentIndex < 1) {
                    this.isTransitioning = false;
                    this.currentIndex = this.slides.length;
                } else {
                    this.isTransitioning = false;
                }
            }, 500);

            // 重置自动轮播计时器
            if (this.autoPlay) {
                this.startAutoPlay();
            }
        },

        // 绑定触摸事件
        bindTouchEvents() {
            const track = this.$refs.carouselTrack;
            track.addEventListener('touchstart', this.handleTouchStart);
            track.addEventListener('touchmove', this.handleTouchMove);
            track.addEventListener('touchend', this.handleTouchEnd);
        },

        // 解绑触摸事件
        unbindTouchEvents() {
            const track = this.$refs.carouselTrack;
            track.removeEventListener('touchstart', this.handleTouchStart);
            track.removeEventListener('touchmove', this.handleTouchMove);
            track.removeEventListener('touchend', this.handleTouchEnd);
        },

        // 触摸开始处理
        handleTouchStart(e) {
            this.startX = e.touches[0].clientX;
            this.endX = e.touches[0].clientX
            this.isTransitioning = false;
            this.touchTime = new Date()
            // 暂停自动播放
            if (this.autoPlay) {
                this.clearTimer();
            }
        },

        // 触摸移动处理
        handleTouchMove(e) {
            this.endX = e.touches[0].clientX;
            const diffX = this.endX - this.startX;

            // 计算当前轮播图应该偏移的距离
            const offset = -(this.currentIndex * 100) + (diffX / this.$refs.carouselContainer.offsetWidth * 100);

            // 实时更新轮播图位置，实现跟随手指移动效果
            this.$refs.carouselTrack.style.transform = `translateX(${offset}%)`;
            this.$refs.carouselTrack.style.transition = 'none';
        },

        // 触摸结束处理
        handleTouchEnd() {
            const diffX = this.endX - this.startX;
            this.$refs.carouselTrack.style.transition = 'transform 0.5s ease';
            const time = new Date() - this.touchTime
            if (time < 300) {
                if (diffX > 10) {
                    this.prevSlide();
                } else if (diffX < -10) {
                    this.nextSlide();
                } else {
                    this.$refs.carouselTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
                }
            } else {
                if (diffX > window.innerWidth / 2) {
                    this.prevSlide();
                } else if (diffX < -window.innerWidth / 2) {
                    this.nextSlide();
                } else {
                    this.$refs.carouselTrack.style.transform = `translateX(-${this.currentIndex * 100}%)`;
                }
            }
            this.startX = 0
            this.endX = 0
            this.touchTime = 0
            // 恢复自动播放
            if (this.autoPlay) {
                this.startAutoPlay();
            }
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
