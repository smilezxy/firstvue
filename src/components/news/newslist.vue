<template>
    <div class="tmpl">
        <!--利用mui中的图文表格来新闻列表-->
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in list">
                <router-link v-bind="{to:'/news/newsinfo/'+ item.id}">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        {{item.title}}
                        <p class="mui-ellipsis">
                            发布时间:{{item.add_time | fmtdate('YYYY-MM-DD')}}
                            <span class="mui-pull-right">点击{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>
            <!--<li class="mui-table-view-cell mui-media">-->
                <!--<a href="javascript:;">-->
                    <!--<img class="mui-media-object mui-pull-left" src="../../../statics/images/menu4.png">-->
                    <!--<div class="mui-media-body">-->
                        <!--木屋-->
                        <!--<p class='mui-ellipsis'>-->
                            <!--发布时间-->
                            <!--<span class="mui-pull-right">点击</span>-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</a>-->
            <!--</li>-->

        </ul>
    </div>
</template>
<script>
    import common from  '../../kits/common.js'
    export default {
        data () {
            return {
                list:[]
            }
        },
        created () {
            this.getnewslist ()
        },
        methods:{
            getnewslist () {
                //利用vue-resource请求图文资讯列表
                var url = common.apihost + '/api/getnewslist'
                this.$http.get(url).then(
                    res => {
                        this.list = res.body.message
                    },
                     res => {
                        console.log('获取失败')
                    }
                )
                //将图文资讯数据赋值给list

            }
        }
    }
</script>
<style scoped>
    .mui-ellipsis{
        color: #007aff;
        font-size: 13px;
    }
    .mui-table-view .mui-media-object {
        max-width: 62px;
        height: 62px;
        line-height: 62px;
    }
    .mui-ellipsis {
        margin-top: 20px;
    }
    .mui-table-view-cell {
        padding-left: 10px;
    }
</style>