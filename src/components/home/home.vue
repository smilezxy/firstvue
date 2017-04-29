<template>
	<div class="tmpl">
		<!-- 利用mint-ui中的组件swipe -->
		<mt-swipe :auto="2000">
  			<mt-swipe-item v-for="(item,index) in list" :key="index">
  				<img class="img" v-bind:src="item.img">
  			</mt-swipe-item>
		</mt-swipe>
		<!-- 利用mui中的九宫格实现系统中的导航按钮 -->
		<div class="mui-content">
		    <ul class="mui-table-view mui-grid-view mui-grid-9">
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		        	<a href="#">
		                <span class="mui-icon icon-news"></span>
		                <div class="mui-media-body">新闻资讯</div>
		            </a>
		        </li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		        	<a href="#">
		                <span class="mui-icon icon-photo">
		                </span>
		                 <div class="mui-media-body">图片分享</div>
		             </a>
		        </li>
		        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
		        	<a href="#">
		                <span class="mui-icon icon-goods"></span>
		                <div class="mui-media-body">商品购买</div>
		            </a>
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
				var url = 'http://webhm.top:8899/api/getlunbo';
				this.$http.get(url).then(res => {
					this.list = res.body.message
				},res => {
					console.log('轮播图获取失败')
				})
			}
		}
	}
</script>
<!-- scoped 代表当前样式是此组件私有 -->
<style scoped>
  .img {
  	width: 100%;
  	height: 100%;
  }
  .mint-swipe {
    overflow: hidden;
    position: relative;
    height: 250px;
  }
  .mint-swipe-items-wrap {
    position: relative;
    overflow: hidden;
    height: 100%;
    -webkit-transform: translateZ(0);
    transform: translateZ(0)
  }
  .mint-swipe-items-wrap > div {
    position: absolute;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
    width: 100%;
    height: 100%;
    display: none;
  }
  .mint-swipe-items-wrap > div.is-active {
    display: block;
    -webkit-transform: none;
    transform: none;
  }
  .mint-swipe-indicators {
    position: absolute;
    bottom: 10px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  .mint-swipe-indicator {
    width: 8px;
    height: 8px;
    display: inline-block;
    border-radius: 100%;
    /*background: #000;*/
    opacity: 0.2;
    margin: 0 3px;
  }
  .mint-swipe-indicator.is-active {
    background: #fff;
  }
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