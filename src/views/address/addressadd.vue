<template>
<div class="addressadd">
    <Title title="添加收货地址"
        back></Title>
    <Input label="姓名"
        placeholder="收货人姓名"></Input>
    <Input label="电话"
        placeholder="收货人手机号"></Input>
    <Input label="地区"
        @click="showCity = true"
        hasslot>
    <div class="city">
        <p>选择省 / 市 / 区</p>
        <span>></span>
    </div>
    </Input>
    <Popup :show.sync="showCity"></Popup>
</div>
</template>

<script>
import Title from '@/components/title.vue'
import Popup from '@/components/Popup.vue'
export default {
    components: {
        Title,
        Popup
    },
    data() {
        return {
            showCity: false
        }
    }
}
</script>

<style scoped
    lang="scss">
    .addressadd {
        height: 100%;
        padding-top: 44px;

        .city {
            justify-content: space-between;
            align-items: center;
            display: flex;
            height: 35px;

            p {
                color: #c8c9cf;
                flex: 1;
                margin: 0;
            }

            span {
                color: #c8c9cf;
            }
        }
    }
</style>