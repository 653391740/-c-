<template>
<ul>
    <li v-for="item in cateslist"
        :class="{ 'active': item.id === activeId }"
        @click="$emit('update:activeId', item.id)"
        :key="item.id">
        {{ item.catename }}
    </li>
</ul>
</template>

<script>
export default {
    props: {
        cateslist: {
            type: Array,
            default: () => []
        },
        activeId: {
            type: Number,
            default: 0
        }
    }
}
</script>
<style scoped
    lang="scss">
    ul {
        display: flex;
        flex-direction: column;
        width: 125px;
        background-color: #f7f8fa;
        overflow: auto;

        li {
            padding: 14px 12px;
            font-size: 14px;

            &.active {
                background-color: #fff;
                position: relative;

                &::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 5px;
                    height: 20px;
                    transform: translateY(-50%);
                    background-color: #ff4400;
                }
            }
        }
    }
</style>
