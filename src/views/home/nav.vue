<template>
<nav>
    <ul>
        <li>
            <img src="/src/assets/1.png">
            <p>限时秒杀</p>
        </li>
        <li>
            <img src="/src/assets/2.png">
            <p>畅销商品</p>
        </li>
        <li>
            <img src="/src/assets/3.png">
            <p>品质大牌</p>
        </li>
        <li>
            <img src="/src/assets/4.png">
            <p>商城自营</p>
        </li>
        <li>
            <img src="/src/assets/5.png">
            <p>积分商城</p>
        </li>
    </ul>
</nav>
</template>
<script>

</script>

<style scoped
    lang="scss">
    nav {
        background-color: #fff;

        ul {
            height: 70px;
            display: flex;
            font-size: 7.5px;

            li {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                img {
                    width: 32px;
                    height: 32px;
                    margin-bottom: 5px;
                }
            }
        }
    }
</style>