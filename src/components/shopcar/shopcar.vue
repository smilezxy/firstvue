<template>
	<div class="tmpl">
		<!--购物车商品列表-->
		<div class="row" v-for="(item,index) in shopcarlist">
			<div class="left">
				<mt-switch v-model="values[index]"></mt-switch>
			</div>
			<div class="center">
				<img width="75" height="75" :src="item.thumb_path">
			</div>
			<div class="right">
				<h4>{{item.title}}</h4>
				<span>￥{{item.sell_price}}</span>
				<!--使用组件 要给子组件传递参数-->
				<subcomment :initcount="item.count" :goodsid="item.id"  v-on:count="getcount" class="subnumber" ></subcomment>
				<a @click="del(item.id)">删除</a>

			</div>
		</div>
		<!--总计区域-->
		<div class="total">
			<div class="totalLeft">
				<h5>总计（不含运费）</h5>
				<span>
					已经勾选商品{{selectedcount}}件，总价￥{{settment}}元
				</span>
			</div>
			<div class="totalRight">
				<mt-button type="danger" size="normal">去结算</mt-button>
			</div>
		</div>
	</div>
</template>
<style scoped>
	/*总计的样式*/
	.total {
		padding: 10px;
		background-color: rgba(95,95,95,0.3);
		margin-top: 10px;
		height: 80px;
	}
	.total h5{
		color: #000000;
		font-weight: bold;
		margin-bottom: 10px;
	}
	.total .totalLeft {
		width: 70%;
		float: left;
	}
	.total .totalRight {
		width: 28%;
		float: right;
		padding-top: 10px;
	}
	/*商品列表*/
	.row {
		display: flex;
		border-bottom: 1px solid rgba(92,92,92,0.3);
		padding: 5px;
	}
	.row .left {
		flex: 0 0 25px;
		padding-top: 35px;
	}
	.row .center {
		flex: 0 0 75px;
		padding: 0 5px;
	}
	.row .right {
		flex: 1;
		padding: 5px;
	}
	.row .right h4 {
		color: #007aff;
		padding: 5px 0;
	}
	.row .right .subnumber {
		display: inline-block;
		margin: 0 8px;
	}
	.row .right span {
		color: red;
		font-size: 16px;
	}
</style>
<script>
	import subcomment from '../subcomponents/subnumber.vue'
	import {getItem,subStrictItem,setItem,removeItem } from  '../../kits/localStorageHelper.js'
	import common from '../../kits/common.js'
	export default {
		data () {
			return {
				values:[], //用来存储每条数据的switch状态
				shopcarlist:[],
				selectedcount:0 //被选中商品的个数

			}
		},
		created () {
		    this.initPageData()

		},
		methods:{
		    //获取到数量组件中的数值
		  getcount (resObj) {
				//判断resObj中的type类型
			  if(resObj.type == 'add') {
					this.add(resObj)
				  //更新shopcarlist中商品对应的数量
					this.updateshopcarlist(1,resObj.goodsid)
			  }else if (resObj.type = 'substrict') {
                  this.substrict(resObj)
                  //更新shopcarlist中商品对应的数量
                  this.updateshopcarlist(-1,resObj.goodsid)
				  //console.log(resObj.count)
                  if (resObj.count == 0) {
                      //console.log(123)
                      this.del(resObj.goodsid)
                  }
              }
		  },
			add (resObj) {
				setItem({goodsid:resObj.goodsid,count:1})
			},
            substrict (resObj) {
                subStrictItem(resObj.goodsid)
			},
			updateshopcarlist (count,goodsid) {
		      	for(let i = 0; i < this.shopcarlist.length; i++) {
		      	    if(this.shopcarlist[i].id == goodsid) {
		      	        this.shopcarlist[i].count = this.shopcarlist[i].count + count
					}
				}
			},
			//根据商品id初始化页面数据
			initPageData () {
		      //从loacalStorage获取到商品id
                let arr = getItem()
				let goodsObj = {}  //让goodsid的值作为这个对象的key，count值作为value
				arr.forEach(item => {
				    if(goodsObj[item.goodsid]) {
				        //存在  将count追加上去
						let temp = goodsObj[item.goodsid]
						temp += item.count
                        goodsObj[item.goodsid] = temp

					} else {
				        //不存在的话  直接添加
						goodsObj[item.goodsid] = item.count
					}
				})
				//将goodsObj中的属性名称拿出来
				let idarr = []
				for (let goodsid in goodsObj) {
                    idarr.push(goodsid)
				}
				let ids = idarr.join(',')
				//console.log(ids)
				//发送api获取到数据
				let url = common.apihost + '/api/goods/getshopcarlist/' + ids
				this.$http.get(url).then( res => {
				    res.body.message.forEach(item => {
                        item.count = goodsObj[item.id]
                        //初始化values数组  值全为false
						this.values.push(false)
					})

						this.shopcarlist = res.body.message


				})

			},
			//商品的总价
            getTotal () {
		      let total = 0
		       this.values.forEach((item,index) => {
		           if(item == true) {
		              let selectedGoods =  this.shopcarlist[index]  //获取到当前选中的商品
					   total += selectedGoods.sell_price *   selectedGoods.count
				   }
			   })
				return  total
			},
			//删除商品
			del (goodsid) {
				//将shopclist中的数据删除
				let index = this.shopcarlist.findIndex(c => c.id == goodsid)
				if (index >= 0) {
				    this.shopcarlist.splice(index,1)
				}
				//删除localStroage中的数据
                removeItem(goodsid)
            }
		},
		computed:{
		  //统计总价格
			settment () {
			    //统计当前选择的个数
			    let trueArr = this.values.filter(v => v==true)
				this.selectedcount = trueArr.length

				//计算价格
				return this.getTotal()

			}

		},
		components:{
            subcomment
		}
	}
</script>
