<template>
<div class="item"
    @click="$emit('click')"
    :style="{ 'padding-bottom': !msg || hasslot ? '10px' : '25px' }">
    <p>{{ label }}</p>
    <slot v-if="hasslot"></slot>
    <input type="text"
        v-else
        v-input
        :placeholder="placeholder || label"
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
        placeholder: {
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
        align-items: center;
        position: relative;

        &>* {
            flex: 1;
        }

        p {
            flex: 0 0 auto;
            width: 30%;
            font-size: 14px;
            color: #646566;
        }

        input {
            font-size: 14px;
            height: 35px;
            background-color: transparent;

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