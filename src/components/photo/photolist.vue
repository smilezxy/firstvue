<template>
    <div class="tmpl">
        <!--分类-->
        <div class="cate">
            <ul id="cateul">
                <li>
                    <a @click="getimglist(0)">全部</a>
                 </li>
                <li v-for="item in catelist">
                    <a @click="getimglist(item.id)">{{item.title}}</a>
                </li>

            </ul>
        </div>
        <!--图片列表-->
        <div class="imglist">
            <ul>
                <li v-for="item in list">
                    <router-link v-bind='{to:"/photo/info/"+item.id}'>
                        <img v-lazy="item.img_url">
                    </router-link>
                    <p>
                        <span class="title">{{item.title}}</span>
                        {{item.zhaiyao}}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import common from  '../../kits/common.js'
    import { Indicator } from 'mint-ui';
    export default {
        data () {
            return {
                catelist:[], //存储分类数据
                list:[]
            }
        },
        created () {
            this.getcate ()
            this.getimglist(0)
        },
        methods: {
            //获取图片的分类id
            getcate () {
                let url = common.apihost + '/api/getimgcategory'
                this.$http.get(url).then(res => {
                    this.catelist = res.body.message
                    //console.log(res.body.message)
                    //重新根据当前分类的个数计算ul的宽度
                    let w = 70 * (res.body.message.length + 1)
                    document.getElementById('cateul').style.width = w + 'px'


                },res => {
                    console.log('获取失败')
                })

            },
            //根据分类id获取图片数据
            getimglist (cateid) {
                //这个位置应该提醒用户图片正在加载
                Indicator.open('加载中...');
                let url = common.apihost + '/api/getimages/' + cateid
                this.$http.get(url).then(res => {
                    this.list = res.body.message
                    //console.log(res.body.message)
                    //这个位置显示加载成功
                    Indicator.close();
                },res => {
                    console.log('获取失败')
                })
            }
        }
    }
</script>
<style scoped>
    .cate {
        max-width: 400px;
        overflow-x:auto ;
        overflow-y: hidden;
    }
    .cate ul {
        padding-left: 10px;
        padding-right: 10px;
        margin: 0;
    }
    .cate ul li {
        list-style: none;
        display: inline-block;
        padding: 5px 0 0 5px;
    }
    .cate ul li a {
        font-size: 16px;
    }
    /*懒加载图片加载样式start*/
    image[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
    }
    .imglist ul {
        padding: 0;
    }
    .imglist li {
        list-style: none;
        position: relative;
    }
    .imglist img {
        width: 100%;
    }
    .imglist .title {
        font-weight: bolder;
        display: block;
    }
    .imglist p {
        color: #fff;
        position: absolute;
        bottom: 10px;
        left: 5px;
        background-color: rgba(0,0,0,0.4);
    }
    /*懒加载图片加载样式end*/

</style>