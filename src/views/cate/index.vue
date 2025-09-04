<template>
<div class="cate">
    <Title title="商品分类"></Title>
    <Aside :cateslist="cateslist"
        :activeId.sync="activeId"></Aside>
    <SelectContent :selectList="selectList"></SelectContent>
</div>
</template>

<script>
import {
    getcates
} from '@/api/home'
import Title from '@/components/title.vue';
import Aside from '@/views/cate/aside.vue'
import SelectContent from '@/views/cate/select__content.vue'

export default {
    components: {
        Title,
        Aside,
        SelectContent
    },
    data() {
        return {
            cateslist: [],
            activeId: 0
        }
    },
    mounted() {
        this.getcates()
    },
    computed: {
        selectList() {
            return this.cateslist.find(item => item.id === this.activeId)
        }
    },
    methods: {
        async getcates() {
            const { list } = await getcates()
            this.cateslist = list
            this.activeId = list[0].id
        }
    }
}
</script>

<style scoped
    lang="scss">
    .cate {
        display: flex;
    }
</style>