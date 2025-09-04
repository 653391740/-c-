<template>
<div class="item">
    <p>{{ label }}</p>
    <input type="text"
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
        mag: {
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
                    vm.msg = el.value === '' ? '请输入手机号' : ''
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
        padding: 10px 0 25px 0;
        width: 90%;
        border-bottom: 1px solid #e3e3e3;
        display: flex;
        align-items: center;
        position: relative;

        p {
            width: 30%;
            font-size: 14px;
            color: #646566;
        }

        input {
            font-size: 14px;

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