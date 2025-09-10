<template>
<div class="addressedit">
    <Title title="编辑收货地址"
        back></Title>
    <Address @save="save"
        @delete="del"
        :form="form"></Address>
</div>
</template>

<script>
import { addressedit, addressremove } from '@/api/cart'
import Address from '@/components/address.vue'
import Title from '@/components/title.vue'

export default {
    components: {
        Address,
        Title,
    },
    data() {
        return {
            form: this.$route.query
        }
    },
    methods: {
        async save() {
            const res = await addressedit(this.form)
            if (res.code === 200) {
                this.$popupMsg.success('修改成功')
                this.$router.back()
            }
        },
        async del() {
            const { msg, code } = await addressremove({ id: this.form.id })
            if (code === 200) {
                this.$popupMsg.success(msg)
                this.$router.back()
            }
        }
    }
}
</script>

<style scoped
    lang="scss">
    .addressedit {
        height: 100%;
        padding-top: 44px;
    }
</style>