<template>
    <div class="tmpl">
        <!--{{this.$route.params.id}}-->
        <div class="title">
            <h3>{{article.title}}</h3>
            <p>
                {{article.add_time | fmtdate('YYYY-MM-DD')}}
                {{article.click}}次浏览
                分类：经济民生
            </p>
        </div>
        <div class="content" v-html="article.content"></div>
        <!--评论组件的使用-->
        <div>
            <subcomment :artid="artid"></subcomment>
        </div>
    </div>
</template>
<script>
    import common from '../../kits/common.js'
    import subcomment from  '../subcomponents/subcomment.vue'
    export default {
        data () {
            return {
                article:{},
                artid:0 //定义评论组件注册的id值
            }
        },
        created () {
           this.getnewsinfo ();
           this.artid = this.$route.params.id
        },
        components : {
            subcomment  //将评论组件注册为私有组件
        },
        methods: {
            getnewsinfo () {
                //负责根据传入的id获取到详细数据 /api/getnew/:newid
                let id = this.$route.params.id
                let url = common.apihost + '/api/getnew/' + id
                //用ajax请求获取数据
                this.$http.get(url).then(res=>{
                      //获取到图文数据对象 但是message是一个数组
                    this.article = res.body.message[0]
                },res=>{console.log('获取图文资讯详情失败')})
            }
        }
    }
</script>
<style scoped>
    .title {
        height: 100%;
        border-bottom: 2px solid #f0f0f0;
        padding: 5px;
    }
    .title h3 {
        color:#007aff;
    }
    .title p {
        font-size: 12px;
        color: #929292;
        padding-top: 5px;
        margin: 0;
    }
    .content {
        padding: 5px;
    }
</style>