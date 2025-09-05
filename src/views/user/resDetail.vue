<template>
<ul class="resDetail">
    <li>
        <p class="iconfont icon-ditu">地址管理</p>
        <a href="#">></a>
    </li>
    <li>
        <p class="iconfont icon-qianbao">我的钱包</p>
        <a href="#">></a>
    </li>
    <li>
        <p class="iconfont icon-erweima">我的二维码</p>
        <a href="#">></a>
    </li>
    <li>
        <p class="iconfont icon-partner">我的伙伴</p>
        <a href="#">></a>
    </li>
    <li>
        <p class="iconfont icon-mianfei">0元试用</p>
        <a href="#">></a>
    </li>
</ul>
</template>

<script>
export default {

}
</script>

<style scoped
    lang="scss">
    .resDetail {
        width: 100%;
        background-color: #fff;
        margin-top: 55px;
        padding: 10px 30px 0 10px;

        li {
            padding: 10px 0;
            display: flex;
            align-items: center;
            justify-content: space-between;

            a {
                font-size: 18px;
                line-height: 1;
            }

            p {
                font-size: 12px;
                font-weight: bold;

                &::before {
                    color: #FF6040;
                    font-size: 16px;
                    margin-right: 10px;
                }
            }
        }
    }
</style>