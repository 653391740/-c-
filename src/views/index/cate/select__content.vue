<template>
<div class="select__content">
    <div class="title">{{ selectList.catename }}</div>
    <ul>
        <li v-for="item in selectList.children"
            @click="$router.push({
                path: '/goodslist',
                query: {
                    tyep: 2,
                    cateid: item.id
                }
            })">
            <img :src="'http://43.138.15.137:4000' + item.img">
            <p>{{ item.catename }}</p>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props: {
        selectList: {
            type: Object,
            default: () => ({})
        }
    },
}
</script>
<style scoped
    lang="scss">
    .select__content {
        flex: 1;
        background-color: #fff;

        .title {
            display: flex;
            align-items: center;
            font-size: 16px;
            font-weight: 500;
            padding: 16px 0;
            color: #ff6040;
            border-bottom: 1px solid #f4eaea;

            &::after,
            &::before {
                margin: 0 16px;
                content: '';
                display: block;
                flex: 1;
                height: .5px;
                background-color: #ff6040;
            }
        }

        ul {
            display: grid;
            grid-template-columns: repeat(3, 1fr);

            li {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 16px 8px;
                border: 1px solid #fffbfb;
                margin: -.5px;

                img {
                    width: 60px;
                    height: 60px;
                    object-fit: contain;
                }

                p {
                    font-size: 12px;
                    margin-top: 8px;
                }
            }
        }
    }
</style>