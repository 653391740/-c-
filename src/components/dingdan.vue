<template>
<div class="foot">
    <input type="checkbox"
        v-if="typeof isAll === 'boolean'"
        :checked="isAll"
        @change="$emit('update:isAll', $event.target.checked)"
        id="isAll">
    <label v-if="typeof isAll === 'boolean'"
        for="isAll">全选</label>
    <div class="price">
        <p>
            <label>合计：</label>
            <span class="small">¥</span>
            <span>{{ total }}</span>
        </p>
    </div>
    <button @click="$emit('submit')">提交订单</button>
</div>
</template>
<script>
export default {
    props: {
        total: {
            type: Number,
            default: 0
        },
        isAll: null
    }
}
</script>
<style scoped
    lang="scss">
    input[type="checkbox"]:checked {
        background-color: #ff6040;
    }

    .foot {
        width: 100%;
        height: 50px;
        padding: 0 16px;
        display: flex;
        align-items: center;
        background-color: #fff;

        .price {
            flex: 1;
            text-align: right;
            padding-right: 10px;

            label {
                font-size: 14px;
            }

            span {
                color: #ff6034;
            }

            .small {
                font-size: 12px;
            }
        }

        button {
            background: linear-gradient(to right, #ff6034, #ee0a24);
            color: #fff;
            width: 110px;
            height: 40px;
            font-size: 15px;
            border-radius: 20px;
        }

        input {
            margin-right: 5px;
        }

        label {
            font-size: 14px;
        }
    }
</style>
