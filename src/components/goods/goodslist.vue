<template>
    <div class="tmpl">
        <!--将mui中的图文表格迁移过来-->
        <ul class="mui-table-view mui-grid-view">
            <li class="mui-table-view-cell mui-media mui-col-xs-6" v-for="item in goodslist">
                <router-link v-bind = '{to:"/goods/goodsinfo/" +item.id}'>
                    <img class="mui-media-object" :src="item.img_url">
                </router-link>
                <div class="desc">
                    <h5>{{item.title}}</h5>
                    <div class="box">
                        <p class="price">
                            <span class="red">￥{{item.sell_price}}</span><span class="old">￥{{item.market_price}}</span>
                        </p>
                        <p>
                            <span class="fl">热卖中</span>
                            <span class="fr">剩{{item.stock_quantity}}件</span>
                        </p>
                    </div>
                </div>
            </li>


        </ul>
    </div>
</template>
<script>
    import common from '../../kits/common.js'
    export default {
        data () {
            return {
                goodslist:[] //用来存储api获取到的message数据
            }
        },
        created () {
          this.getgoodslist (1)
        },
        methods:{
            getgoodslist (pageindex) {
                let url = common.apihost + '/api/getgoods?pageindex=' + pageindex
                this.$http.get(url).then(res => {
                    this.goodslist = res.body.message
                })
            }
        }
    }
</script>
<style scoped>
    .mui-table-view.mui-grid-view .mui-table-view-cell {
        padding:0;
    }
    .mui-table-view li {
        border: 1px solid rgba(92,92,92,0.4);
        box-shadow: 0 0 4px #666;
        margin-left: 10px;
        margin-bottom: 4px;
        margin-top: 8px;
        width: 175px;
        height: 300px;
    }
    .desc h5 {
        color: #000;
        padding-left:5px;
        text-align: left;
        font-size: 14px;
        font-family: "微软雅黑";
    }
    .desc .box {
        height: 80px;
        background-color: rgba(92,92,92,0.2);
        margin: 10px 2px 2px 2px;
        padding: 5px;
    }
    .price {
        text-align: left;
        margin-top: 10px;
        margin-bottom: 20px;
    }
   .price span{
        font-size: 17px;
    }
    .price .red {
        color: red;
        margin-right: 15px;
        font-size: 18px;
    }
    .old {
        text-decoration: line-through;
        color: rgba(92,92,92,0.5);
    }
    .fl {
        float: left;
    }
    .fr{
        float: right;
    }
</style>