<template>
<div :class="['popup', { 'show': show }]"
    @click="$emit('update:show', false)">
    <div class="popup-content"
        @click.stop>
        <span v-if="close"
            @click="$emit('update:show', false)"
            class="popup-close">×</span>
        <slot></slot>
    </div>
</div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false
        },
        close: {
            type: Boolean,
            default: true
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



            .popup-close {
                position: absolute;
                top: 15px;
                right: 15px;
                font-size: 25px;
                line-height: 1;
                font-weight: bold;
                color: #c8c9cc;
                z-index: 99;
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