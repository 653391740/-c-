<template>
<div class="calendar">
    <div class="head-title">日期选择</div>
    <div class="head-subtitle">{{ scrollmonth }}</div>
    <div class="weekdays">
        <div class="weekday"
            v-for="day in ['日', '一', '二', '三', '四', '五', '六']"
            :key="day">{{ day }}</div>
    </div>
    <div class="calendar-container"
        ref="calendarContainer"
        @scroll="handleScroll">
        <div class="month"
            v-for="(monthData, index) in calendarData"
            :key="index">
            <div class="month-title">{{ monthData.year }}年{{ monthData.month }}月</div>
            <div class="days"
                :data-month="monthData.month">
                <div class="day"
                    v-for="(day, dayIndex) in monthData.days"
                    :key="dayIndex"
                    :class="{
                        'other-month': isAbove(day.date),
                        'today': isToday(day.date),
                        'selected': isSelected(day.date)
                    }"
                    :style="{
                        marginLeft: dayIndex === 0
                            ? `${monthData.firstDayOfWeek * 100 / 7}%` : '0'
                    }"
                    @click="selectDate(day)">
                    {{ day.day }}
                </div>
            </div>
        </div>
    </div>
    <button class="foot"
        @click="$emit('date-selected', selectedDate)">确定</button>
</div>
</template>

<script>
export default {
    // 组件数据
    data() {
        return {
            calendarData: [],
            selectedDate: null, // 选择的日期
            today: new Date(), // 当前日期
            scrollmonth: null,
        }
    },
    mounted() {
        this.CalendarData();
        this.$nextTick(() => {
            const Container = this.$refs.calendarContainer;
            const children = Container.children;
            let height = 0;
            for (let i = 0; i < Container.children.length; i++) {
                this.calendarData[i].height = height;
                if (i !== children.length - 1) {
                    height += children[i].offsetHeight + 20;
                }
            }
            Container.scrollTop = Container.scrollHeight;
        });
    },
    methods: {
        handleScroll() {
            const Container = this.$refs.calendarContainer;
            const scrollTop = Container.scrollTop;
            for (let i = Container.children.length - 1; i >= 0; i--) {
                if (scrollTop >= this.calendarData[i].height) {
                    this.scrollmonth = `${this.calendarData[i].year}年${this.calendarData[i].month}月`;
                    break;
                }
            }
        },
        // 生成日历数据
        CalendarData() {
            // 获取当前年份
            const currentYear = this.today.getFullYear();
            // 获取当前月份
            const currentMonth = this.today.getMonth();

            // 生成前10年的日历数据
            for (let yearOffset = 10; yearOffset > 0; yearOffset--) {
                // 计算年份 10 9 8 ...年前
                const year = currentYear - yearOffset;
                // 计算1-12月份
                for (let month = 0; month < 12; month++) {
                    // 函数生成指定年，月的数据放到数据数组中
                    this.calendarData.push(this.MonthData(year, month));
                }
            }

            for (let month = 0; month <= currentMonth; month++) {
                this.calendarData.push(this.MonthData(currentYear, month));
            }
        },
        MonthData(year, month) {
            // 1代表该月第一天以此类推 0上月最后一天
            // 该月的第一天
            const firstDay = new Date(year, month, 1);
            // 该月的最后一天
            const lastDay = new Date(year, month + 1, 0);

            // 第一天是周几 0 是周日 1 是周一
            const firstDayOfWeek = firstDay.getDay();

            const days = []; // 用于接收该月的所有日期

            // lastDay.getDate() 是该月的天数
            for (let i = 1; i <= lastDay.getDate(); i++) {
                const date = new Date(year, month, i);
                days.push({
                    day: i,
                    date,
                });
            }
            return {
                year,
                month: month + 1,
                days,
                firstDayOfWeek
            };
        },
        // 判断给定日期是否为今天
        isToday(date) {
            const today = new Date();
            // 比较年、月、日是否都相同
            return date.getDate() === today.getDate() &&
                date.getMonth() === today.getMonth() &&
                date.getFullYear() === today.getFullYear();
        },
        // 判断给定日期是否为用户选择的日期
        isSelected(date) {
            // 如果没有选择日期，返回false
            if (!this.selectedDate) return false;
            return date.getDate() === this.selectedDate.getDate() &&
                date.getMonth() === this.selectedDate.getMonth() &&
                date.getFullYear() === this.selectedDate.getFullYear();
        },
        isAbove(date) {
            return date.getDate() > this.today.getDate() &&
                date.getMonth() === this.today.getMonth() &&
                date.getFullYear() === this.today.getFullYear();
        },
        // 选择日期
        selectDate(day) {
            const selectedDate = day.date;
            if (selectedDate > this.today) return;
            this.selectedDate = selectedDate;
        },
    },
}
</script>

<style scoped
    lang="scss">
    .calendar {
        position: relative;
        text-align: center;

        .foot {
            position: absolute;
            left: 0;
            bottom: 7px;
            height: 36px;
            margin: 0 16px;
            width: calc(100% - 32px);
            border-radius: 18px;
            background-color: #ee0a24;
            color: #fff;
            font-size: 14px;
        }

        .head-title,
        .head-subtitle {
            line-height: 44px;
        }

        .weekdays {
            display: flex;
            justify-content: space-around;
            box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);

            .weekday {
                width: 14%;
                font-size: 12px;
                line-height: 30px;
            }
        }

        .calendar-container {
            height: 400px;
            overflow-y: auto;
            padding-bottom: 50px;

            .month {
                margin-bottom: 20px;

                &:last-child {
                    margin-bottom: 0;
                }

                .month-title {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    padding: 10px 0;
                }

                .days {
                    display: flex;
                    flex-wrap: wrap;
                    position: relative;

                    &::after {
                        content: attr(data-month);
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        opacity: .5;
                        font-size: 130px;
                        transform: translate(-50%, -50%);
                        font-weight: bold;
                    }

                    .day {
                        width: calc(100% / 7);
                        height: 54px;
                        line-height: 54px;
                        margin: 5px 0;
                        cursor: pointer;

                        &.other-month {
                            color: #ccc;
                        }

                        &.today {
                            background-color: #ee0a254c;
                            color: #fff;
                            border-radius: 10px;
                        }

                        &.selected {
                            background-color: #ee0a24;
                            color: #fff;
                            border-radius: 10px;
                        }
                    }
                }
            }
        }
    }
</style>