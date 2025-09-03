<template>
<main>
    <div class="seckill">
        <div class="left-seckill">
            <div class="title">
                <span>限时秒杀</span>
                <a href="#">查看更多 ></a>
            </div>
            <div class="left_seckill_info">
                <ul>
                    <li>0</li>:
                    <li>0</li>:
                    <li>0</li>
                </ul>
            </div>
        </div>
        <div class="right-seckill">
            <div class="right-t">
                <div class="title">
                    <span>限时秒杀</span>
                </div>
                <div class="right_info">
                    <p>234234</p>
                    <div>34534#??></div>
                </div>
            </div>
            <div class="right-b">
                <div class="title">
                    <span>限时秒杀</span>
                </div>
                <div class="right_info">
                    <p>234234</p>
                    <div>34534#??></div>
                </div>
            </div>
        </div>
    </div>
    <div class="tuijian">
        <ul class="tuijian_ul">
            <li class="active">双十一尖货预购</li>
            <li>畅购全球</li>
        </ul>
        <ul class="scroll_ul">
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>5</li>
            <li>6</li>
            <li>7</li>

        </ul>
    </div>
</main>
</template>

<script>
export default {
    data() {
        return {
        }
    },
}
</script>

<style scoped
    lang="scss">
    $color1: #85a642;
    $color2: #ff6040;
    $color3: #af40ff;

    @mixin flex {
        display: flex;

        li {
            flex: 1;
            text-align: center;
        }
    }

    @mixin tu {
        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 10.0012px 10.0012px 4.9988px;

            span {
                font-size: 13.0013px;
                font-weight: bold;
            }

            a {
                font-size: 7.5px;
                color: #333;
            }
        }

        .right_info {
            font-size: 7.5px;
            margin: 0 10px;

            p {
                margin-bottom: 5px;
            }

            div {
                color: #fff;
                border-top-right-radius: 15px;
                border-bottom-right-radius: 15px;
                width: 62.5px;
                line-height: 20px;
                text-align: center;
            }
        }
    }

    main {
        .seckill {
            display: flex;
            margin: 10.0012px;
            height: 175.0012px;
            gap: 4.9988px;

            &>div {
                flex: 1;
            }

            .left-seckill {
                color: $color1;
                background-image: url('/src/assets/xsms.png');
                @include tu;

                .left_seckill_info {
                    ul {
                        margin: 0 10.0012px;
                        display: flex;
                        align-items: end;
                        color: #ff6040;

                        li {
                            margin: 0 2px;
                            width: 17.5px;
                            line-height: 20px;
                            color: #fff;
                            font-size: 6px;
                            text-align: center;
                            background-color: #5D7E37;
                            border-radius: 1.5px;
                        }
                    }
                }
            }

            .right-seckill {
                display: flex;
                flex-direction: column;
                gap: 4.9988px;

                &>div {
                    flex: 1;
                    background-size: cover;
                    background-position: center;
                }

                .right-t {
                    @include tu;
                    color: $color2;
                    background-image: url('/src/assets/xsms.png');

                    .right_info div {
                        background: linear-gradient($color2, #ff9878);
                    }
                }

                .right-b {
                    @include tu;
                    color: $color3;
                    background-image: url('/src/assets/xsms.png');

                    .right_info div {
                        background: linear-gradient($color3, #ef85ff);
                    }
                }
            }
        }

        .tuijian {
            margin: 0 10.0012px;
            background-color: #fff;
            height: 150px;

            .tuijian_ul {
                @include flex;

                li {
                    line-height: 43px;

                    &.active {
                        color: $color2;
                    }
                }
            }

            .scroll_ul {
                margin: 0 10px;
                overflow-x: auto;
                height: 83px;
                display: flex;
                gap: 5px;

                li {
                    flex: 0 0 80px;
                    background-color: #333;
                }
            }
        }
    }
</style>