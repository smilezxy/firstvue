<template>
    <div class="tmpl">
       <!--标题-->
        <div class="title">
            <h3>{{imgdata.title}}</h3>
            <p>
                {{imgdata.add_time | fmtdate('YYYY-MM-DD')}}
                {{imgdata.click}}次浏览
                分类：经济民生
            </p>
        </div>
        <!--利用九宫格进行图片展示-->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="(item, index) in imglist">
                <!--<a href="#">-->
                <!--<span class="mui-icon mui-icon-home"></span>-->
                <!--<div class="mui-media-body">Home</div></a>-->
                <!--<img width="109px" height="109px" src="http://www.webhm.top:8080/upload/201504/18/thumb_201504181237019134.jpg"/>-->
                <img class="preview-img"
                     :src="item.src" height="100" @click="$preview.open(index, imglist)">
            </li>



        </ul>
        <!--图片详情-->
        <div class="content" v-html="imgdata.content">
            "很美的落地大书柜 可以放超多的图书的吧，
            转角的书柜以及书桌，这里可以收纳超多的东西，书柜,书桌这些是\"七彩人生\"品，双层书柜组合书柜儿童书柜。"
        </div>
        <!--评论组件-->
        <subcomment :artid="imgid"></subcomment>
    </div>
</template>
<script>
    import commen from "../../kits/common.js"
//    导入评论组件
    import subcomment from  "../subcomponents/subcomment.vue"
    export default {
        data () {
            return {
                imgdata:{}, //代表这张图片所有数据的详细信息
                imglist:[], //九宫格图片存储的数据
                imgid:0  //传入到评论组件的图片id
            }
        },
        created () {
            this.getimgdata ();
            this.getthubimg ();
            //图片id初始化
            this.imgid = this.$route.params.id

        },
        components: {
            subcomment //注册评论组件
        },
        methods: {
            getimgdata () {
                let imgid = this.$route.params.id
                let url = commen.apihost + '/api/getimageInfo/' + imgid
                this.$http.get(url).then(res => {
                     this.imgdata = res.body.message[0]
                })
            },
            getthubimg () {
                let imgid = this.$route.params.id
                let url = commen.apihost + '/api/getthumimages/' + imgid
                this.$http.get(url).then(res => {
                   for(var i =0; i < res.body.message.length; i++) {
                       res.body.message[i].w = 600
                       res.body.message[i].h = 400
                   }
                   //console.log(res.body.message)
                    this.imglist = res.body.message
                })
            }
        }
    }
</script>
<style scoped>
    .tmpl .title {
        padding: 10px;
        border-bottom: 2px solid rgba(92,92,92,0.2);
    }
    .title h3{
        color: #007aff;
    }
    .title p {
        font-size: 12px;
        color: #929292;
    }
    /*九宫格样式重写*/
    .mui-grid-view.mui-grid-9 {
        background-color: #fff;
    }
    .mui-grid-view.mui-grid-9 .mui-table-view-cell {
        border: none;
        padding: 0;
    }
    /*图片描述*/
    .content {
        padding: 5px;
        color: #5c5c5c;
        font-size: 14px;
    }
</style>