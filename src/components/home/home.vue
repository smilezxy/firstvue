<template>
	<div class="tmpl">
		<!--利用subimgslider.vue实现轮播-->
		<subimglisder :imgList="list"></subimglisder>
		<!-- 利用mui中的九宫格实现系统中的导航按钮 -->
		<div class="mui-content">
		    <ul class="mui-table-view mui-grid-view mui-grid-9">
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		        	<router-link to="/news/newslist">
		                <span class="mui-icon icon-news"></span>
		                <div class="mui-media-body">新闻资讯</div>
					</router-link>
		        </li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		        	<router-link to="/photo/photolist">
		                <span class="mui-icon icon-photo">
		                </span>
		                 <div class="mui-media-body">图片分享</div>
					</router-link>
		        </li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		        	<router-link to="/goods/goodslist">
		                <span class="mui-icon icon-goods"></span>
		                <div class="mui-media-body">商品购买</div>
					</router-link>
		        </li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		        	<a href="#">
		                <span class="mui-icon icon-feedback"></span>
		                <div class="mui-media-body">留言反馈</div>
		            </a>
		        </li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		        	<a href="#">
		                <span class="mui-icon icon-video"></span>
		                <div class="mui-media-body">视频专区</div>
		            </a>
		        </li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		        	<a href="#">
		                <span class="mui-icon icon-callme"></span>
		                <div class="mui-media-body">联系我们</div>
		            </a>
		        </li>
		    </ul> 
		</div>
	</div>
</template>
<script>
    //导入subimgsilder组件
    import   subimglisder  from  '../subcomponents/subimgsilder.vue'
	import common from  '../../kits/common.js'
	export default {
		data () {
			return {
					// list: [{
					// 	url: 'http://www.itcast.cn/subject/phoneweb/index.html',
					// 	img: 'http://ofv795nmp.bkt.clouddn.com/vuelogobanner1.jpg'
					// }, {
					// 	url: 'http://www.itcast.cn/subject/phoneweb/index.html',
					// 	img: 'http://ofv795nmp.bkt.clouddn.com/vuelogobanner2-1.jpg'
					// }]
					list:[]
			}
		},
		created () {
			this. getBanner()
		},
		methods:{
			getBanner () {
				var url = common.apihost + '/api/getlunbo';
				this.$http.get(url).then(res => {
					this.list = res.body.message
				},res => {
					console.log('轮播图获取失败')
				})
			}
		},
		components: {
            subimglisder
		}
	}
</script>
<!-- scoped 代表当前样式是此组件私有 -->
<style scoped>

  /*定义九宫格的图标样式*/
  .icon-news {
	background: url(../../../statics/images/menu10.png) center/cover;
  }
  .mui-grid-view.mui-grid-9 {
  	background-color: #fff;
  	border: none;
  }
  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
  	border: none;
  }
  .mui-icon {
  	width: 50px;
  	height: 50px;
  }
  .icon-photo {
	background: url(../../../statics/images/menu3.png) center/cover;
  }
  .icon-goods {
	background: url(../../../statics/images/menu4.png) center/cover;
  }
  .icon-feedback {
	background: url(../../../statics/images/menu5.png) center/cover;
  }
  .icon-video {
	background: url(../../../statics/images/menu6.png) center/cover;
  }
  .icon-callme {
	background: url(../../../statics/images/menu9.png) center/cover;
  }
</style>