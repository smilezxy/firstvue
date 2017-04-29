<template>
	<div class="tmpl">
		<!-- {{postdemo()}} -->
		{{postdata}}
		{{jsonpdata}}
	</div>
</template>
<script>
	export default {
		data () {
			return {
				list:'',
				postdata:'',
				jsonpdata:''
			}
		},
		created () {
			//表示.vue组件创建完毕  并且data中和methods的所有属性和方法初始化完毕
			this.postdemo(),
			this.jsonpdemo()
		},
		methods:{
			getdemo () {
				var url = 'http://webhm.top:8899/api/getnewslist';
				//接下来就要借助vue-resource使用ajax发送请求
				//this其实就是代表当前组件的vue对象，而在main.js已经将vue-resource对象
				//通过Vue.use（）使用了，所以当前组件this就会自动挂载一个$http
				this.$http.get(url).then(
					res=>{//成功获取到数据
						this.list = res.body;
					},
					res=>{
						console.log('出错了')
					})
			},
			postdemo () {
				var url = 'http://webhm.top:8899/api/post';
				this.$http.post(url,{name:'zxy'},{emulateJSON:true}).then(
					res=>{//成功获取到数据
							this.postdata = res.body
					},
					res=>{
						console.log('出错了')
					})
			},
			jsonpdemo () {
				var url = 'http://webhm.top:8899/api/jsonp';
				this.$http.jsonp(url).then(res => {
					this.jsonpdata = res.body
				},
				res => {
					console.log('出错了')
				})
			}
		}
	}
</script>
<style></style>