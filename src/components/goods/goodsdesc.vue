<template>
    <div class="tmpl">
        <h3>{{info.title}}</h3>
        <div v-html="info.content" class="content">

        </div>
    </div>
</template>
<script>
    import commen from '../../kits/common.js'
    export default {
        data () {
            return {
                info: { }
            }
        },
        methods:{
            getinfo () {
                let id = this.$route.params.id
                let url = commen.apihost + '/api/goods/getdesc/' + id
                this.$http.get(url).then(res => {
                    this.info = res.body.message[0]
                })
            }
        },
        created () {
            this.getinfo ()
        }
    }
</script>
<style scoped>
    .tmpl {
        padding: 5px;
    }
    .tmpl h3 {
        color: #007aff;
        padding: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }
    .tmpl .content {
        margin-top: 10px;
    }
</style>