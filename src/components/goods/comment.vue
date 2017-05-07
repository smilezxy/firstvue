<template>
    <div class="tmpl">
        <subcomment :artid="imgid"></subcomment>
    </div>
</template>
<style scoped>

</style>
<script>
    //导入组件
    import subcomment from  '../subcomponents/subcomment.vue'
    export default {
        data () {
            return {
                imgid:0
            }
        },
        created () {
          this.imgid = this.$route.params.id
        },
        components:{
            subcomment
        }
    }
</script>