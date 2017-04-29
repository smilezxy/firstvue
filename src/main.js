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
//定义全局过滤器
Vue.filter('tolowercase1',function(input) {
	return input.toLowerCase()
})
//定义路由规则对象
import Home from './components/home/home.vue'
import Member from './components/member/member.vue'
import Shopcar from './components/shopcar/shopcar.vue'
import Search from './components/search/search.vue'

let router = new vueRouter({
	linkActiveClass:'mui-active',
	routes:[
		{name:'root',path:'/',redirect:'/Home'},
		{name:'home',path:'/home',component:Home},
		{name:'member',path:'/member',component:Member},
		{name:'shopcar',path:'/shopcar',component:Shopcar},
		{name:'search',path:'/search',component:Search}

	]
});
//使用router
new Vue ( {
	el:'#app',
	router,
	render:c => c(App)

});
