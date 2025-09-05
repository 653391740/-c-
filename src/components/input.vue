<template>
<div class="item"
    :style="{ 'padding-bottom': hasslot ? '10px' : '25px' }">
    <p>{{ label }}</p>
    <slot v-if="hasslot"></slot>
    <input type="text"
        v-else
        v-input
        :placeholder="label"
        :value="value"
        @input="$emit('input', $event.target.value)">
    <transition name="fade">
        <div class="msg"
            v-if="isShow">
            {{ msg }}
        </div>
    </transition>
</div>
</template>
<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        hasslot: {
            type: Boolean,
            default: false
        },
        msg: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            isShow: false,
        }
    },
    methods: {

    },
    directives: {
        input: {
            inserted(el, binding, vnode) {
                const fn = () => {
                    const vm = vnode.context;
                    vm.isShow = el.value === '' ? true : false
                }
                el.addEventListener('input', () => fn())
                el.addEventListener('blur', () => fn())
            }
        }
    },
}
</script>


<style scoped
    lang="scss">
    .item {
        margin: 0 auto;
        padding: 10px 0 25px 0;
        width: 90%;
        border-bottom: 1px solid #e3e3e3;
        display: flex;
        position: relative;

        p {
            margin-top: 5px;
            width: 30%;
            font-size: 14px;
            color: #646566;
        }

        input {
            font-size: 14px;
            height: 35px;

            &.input {
                &::placeholder {
                    color: #ee0a24;
                }
            }

            &::placeholder {
                color: #c8c9cf;
            }
        }

        .msg {
            position: absolute;
            top: 60%;
            left: 30%;
            font-size: 12px;
            color: #ee0a24;
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>