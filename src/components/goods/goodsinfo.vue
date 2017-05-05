<template>
    <div class="tmpl">
        <!--1.0实现商品的轮播图-->
        <!--<subImgSilder :imgList = "imglist"></subImgSilder>-->
        <sub-img-silder :imgList = "imglist" class="imgs"></sub-img-silder>
        <!--2.0实现商品购买区域-->
        <div class="sell">
            <h4>{{goodsinfodata.title}}</h4>
            <div class="sellPrice">
                市场价：<s>￥{{goodsinfodata.sell_price}}</s>
                销售价：<span>￥{{goodsinfodata.market_price}}</span>
            </div>
            <div class="count">购买数量：
                <!--组件-->
                <sub-number v-on:count="getcount" class="subnumber"></sub-number>
            </div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small">加入购物车</mt-button>
        </div>
        <!--3.0实现商品参数区域-->
        <div class="params">
            <h6>商品参数</h6>
            <ul>
                <li>商品货号：{{goodsinfodata.goods_no}}</li>
                <li>库存情况：{{goodsinfodata.stock_quantity}}件</li>
                <li>上架时间：{{goodsinfodata.add_time | fmtdate('YYYY-MM-DD')}}</li>

            </ul>
        </div>
        <!--4.0商品的图文信息区域-->
        <!--5.0商品的评论区域-->
    </div>
</template>
<script>
    //1.0.1导入subimgsilder.vue组件
    import subImgSilder from  '../subcomponents/subimgsilder.vue'
    import common from  '../../kits/common.js'
    //2.0.1导入subnubmer.vue组件
    import subNumber from '../subcomponents/subnumber.vue'
    export default {
        data () {
            return {
                imglist:[], //1.0.2这个变量存放着轮播图图片的数据
                goodsinfodata:[]
            }
        },
        created () {
          this.getimglist ()
            this.getgoodsinfo ()
        },
        methods:{
            //1.0.3获取轮播图图片数据的方法
            getimglist () {
                let id = this.$route.params.id
                let url = common.apihost + '/api/getthumimages/' + id
                this.$http.get(url).then(res => {
                    //console.log(this)
                    this.imglist = res.body.message
                })
            },
            //2.0.2定义一个方法用来接收子组件传过来的值
            getcount (count) {
                    console.log(count)
            },
            getgoodsinfo () {
                let id = this.$route.params.id
                let url = common.apihost + '/api/goods/getinfo/' + id
                this.$http.get(url).then (res => {
                    this.goodsinfodata = res.body.message[0]
                })
            }
        },
        components:{
            subImgSilder,
            subNumber
        }
    }
</script>
<style scoped>
    .imgs,.sell,.params{
        border: 1px solid rgba(92,92,92,0.4);
        margin: 5px;
        padding: 0 5px 5px 5px;
        border-radius: 5px;
    }
    /*2.0商品购买区域样式*/
    .sell {
        padding-bottom: 10px;
    }
    .sell h4 {
        color: #007aff;
        border-bottom: 1px solid rgba(92,92,92,0.4);
        padding: 10px 0;
    }
    .sell .sellPrice {
        padding: 10px;
        font-size: 14px;
    }
    .sell .sellPrice span {
        color: red;
        font-size: 20px;
    }
    .sell .sellPrice s {
        margin-right: 20px;
    }
    .sell .count {
        font-size: 14px;
        padding: 10px 0;
        padding-left: 10px;
        margin-bottom: 10px;
    }
    .subnumber {
        display: inline-block;
    }
    /*商品参数样式*/
    .params h6 {
        padding:5px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        color: #000;
    }
    .params li {
        list-style: none;
    }
</style>