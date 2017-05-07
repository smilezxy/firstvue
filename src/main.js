//导入包
import Vue from 'vue'
import vueRouter from 'vue-router'
import vueResource from 'vue-resource'
//导入相关的vue组件
import App from './App.vue'



import mintUi from 'mint-ui'
Vue.use(mintUi)
//导入mint-ui的css
import 'mint-ui/lib/style.min.css'

//导入mui相关的css
import '../statics/mui/css/mui.css'
import '../statics/mui/css/icons-extra.css'

//导入我们自己定义好的样式
import '../statics/css/site.css'


//在vue中加载vueRouter
Vue.use(vueRouter)
Vue.use(vueResource)  //使用vueResource对象才能自动在Vue对象实例上挂上$http
//加载图片预览组件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入日期格式化插件
import moment from  'moment'
//定义全局过滤器
Vue.filter('fmtdate',function(input,datastring) {
	return moment(input).format(datastring)
})



//定义路由规则对象
import Home from './components/home/home.vue'
import Member from './components/member/member.vue'
import Shopcar from './components/shopcar/shopcar.vue'
import Search from './components/search/search.vue'
import Newslists from  './components/news/newslist.vue'
import Newsinfo from  './components/news/newsinfo.vue'
import Photolist from  './components/photo/photolist.vue'
import  Photoinfo from  './components/photo/info.vue'
import Goodslist from  './components/goods/goodslist.vue'
import Goodsinfo from  './components/goods/goodsinfo.vue'
import Goodscomment from  './components/goods/comment.vue'
import  Goodsdesc from  './components/goods/goodsdesc.vue'



let router = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		{name:'root',path:'/',redirect:'/home'},
		{name:'home',path:'/home',component:Home},
		{name:'member',path:'/member',component:Member},
		{name:'shopcar',path:'/shopcar',component:Shopcar},
		{name:'search',path:'/search',component:Search},
        {name:'newslist',path:'/news/newslist',component:Newslists}, //图文资讯列表的路由规则
        {name:'newsinfo',path:'/news/newsinfo/:id',component:Newsinfo},  //图文资讯详细的路由规则
		{name:'photolist',path:'/photo/photolist',component:Photolist}, //图片分享的路由规则
        {name:'photoinfo',path:'/photo/info/:id',component:Photoinfo},  //图片详情的路由规则
		{name:'goodslist',path:'/goods/goodslist',component:Goodslist},  //商品列表的路由规则
        {name:'goodsinfo',path:'/goods/goodsinfo/:id',component:Goodsinfo},//商品信息的路由规则
        {name:'goodscomment',path:'/goods/comment/:id',component:Goodscomment}, //商品评论的路由规则
        {name:'goodsdesc',path:'/goods/goodsdesc/:id',component:Goodsdesc} //商品t图文信息的路由规则


	]
});
//使用router
new Vue ( {
	el:'#app',
	router,
	render:c => c(App)

});
