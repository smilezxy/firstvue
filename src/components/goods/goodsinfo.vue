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
                <!--动画小球-->
                <transition  v-on:before-enter="beforeEnter"
                               v-on:enter="enter"
                               v-on:after-enter="afterEnter">
                    <div class="ball" v-show="isshow">
                    </div>
                </transition>

            </div>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="toshopdata">加入购物车</mt-button>
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
        <!--4.0商品的图文信息区域--><!--5.0商品的评论区域-->
        <div class="footer">
            <mt-button plain type="primary" size="large" @click="getdesc">图文介绍</mt-button>
            <mt-button plain class="mtbtn" type="danger" size="large" @click="getcomment">商品评论</mt-button>
        </div>
    </div>
</template>
<script>
    //1.0.1导入subimgsilder.vue组件
    import subImgSilder from  '../subcomponents/subimgsilder.vue'
    import common from  '../../kits/common.js'
    //2.0.1导入subnubmer.vue组件
    import subNumber from '../subcomponents/subnumber.vue'
    //注册commonvue.js
    import {vueobj} from '../../kits/commonvue.js'
    import {setItem} from '../../kits/localStorageHelper.js'
    export default {
        data () {
            return {
                imglist:[], //1.0.2这个变量存放着轮播图图片的数据
                goodscount:1,
                goodsinfodata:[],
                isshow: false //控制小球的隐藏与显示
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
            getcount (obj) {
                    this.goodscount = obj.count
            },
            getgoodsinfo () {
                let id = this.$route.params.id
                let url = common.apihost + '/api/goods/getinfo/' + id
                this.$http.get(url).then (res => {
                    this.goodsinfodata = res.body.message[0]
                })
            },
            getcomment () {
                //获取到商品id
                let id = this.$route.params.id
                //跳转到商品评论组件comment.vue
                this.$router.push({name:'goodscomment',params:{id:id}})

            },
            getdesc () {
                let id = this.$route.params.id
                this.$router.push({name:'goodsdesc',params:{id:id}})

            },
            //实现购物车图标上数量的更改
            toshopdata () {
                //发送通知
                vueobj.$emit('shopdata',this.goodscount)
                //将商品的id和数量存储到localStorage
                let id = this.$route.params.id
                setItem({goodsid:id,count:this.goodscount})
                //出现动画效果
                this.isshow = !this.isshow

            },
            //定义小球动画
            beforeEnter (el,done) {
                el.style.transform ='translate3d(0,0,0)'
            },
            enter (el,done) {
                //注意点：想要有动画的效果  就必须不停的刷新页面
                var  offset = el.offsetWidth  //设置这句话就能保证小球时时移动
                el.style.transform ='translate3d(90px,210px,0)'
                done ()
            },
            afterEnter (el,done) {
                this.isshow = !this.isshow
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
        position: relative;
    }
    .ball {
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        position:absolute;
        top:0px;
        left: 120px;
        transition: all 0.5s cubic-bezier(.35,-0.44,0.83,.67);
        z-index: 50;
    }
    .subnumber {
        display: inline-block;
    }
    /*小球动画样式*/
    /*.drop-enter-active, .drop-leave-active {*/
        /*transition: opacity 1s*/
    /*}*/
    /*.drop-enter, .drop-leave-active {*/
        /*opacity: 0*/
    /*}*/

    /*商品参数样式*/
    .params h6 {
        padding:5px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
        color: #000;
    }
    .params li {
        list-style: none;
    }
    .mtbtn {
        margin-top: 10px;
    }
</style>