<template>
	<div class="app">
	<!-- 整个系统的头部 -->
	<mt-header fixed title="加油"></mt-header>
		<!--返回按钮-->
		<div class="back" v-on:click="goback" v-if="isShow">
			<a>返回</a>
		</div>


	<!-- 路由占位  将来所有符合条件的组件渲染在此 -->
	<router-view></router-view>
	<!-- 整个系统的底部 -->
	<nav class="mui-bar mui-bar-tab">
			<!-- <a class="mui-tab-item mui-active" href="#tabbar"> -->
		<router-link class="mui-tab-item" to="/home" :class="light">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首页</span>
		</router-link>
		<!-- </a> -->
		<router-link class="mui-tab-item" to="/member">
			<span class="mui-icon mui-icon-email"></span>
			<span class="mui-tab-label">会员</span>
		</router-link>
		<router-link class="mui-tab-item" to="/shopcar">
			<span class="mui-icon mui-icon-contact">
				<span class="mui-badge">9</span>
			</span>
			<span class="mui-tab-label">购物</span>
		</router-link>
		<router-link class="mui-tab-item" to="/search">
			<span class="mui-icon mui-icon-gear"></span>
			<span class="mui-tab-label">搜索</span>
		</router-link>
	</nav>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				isShow : false,
				light:''
			}
		},
		watch: {
		  '$route':function (newval,oldval) {
			  if(newval.path.toLowerCase() == '/home') {
					this.isShow = false;
				  	this.light = 'mui-active'
			  }else {
			      this.isShow = true
			  }
          }
		},
		methods: {
		    goback () {
		        this.$router.go(-1)  //返回上一个页面
			}
		}
	}
</script>
<style scoped>
	.back {
		position: fixed;
		top:10px;
		left: 10px;
		z-index: 50;
	}
	.back a {
		font-size: 16px;
		color: #fff;
		font-weight: bolder;
	}
</style>