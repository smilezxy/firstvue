<template>
    <div class="subtmpl">
        <div class="left" @click="substrict">-</div>
        <div class="middle">{{resObj.count}}</div>
        <div class="right" @click="add">+</div>
    </div>
</template>
<script>
    const ADD = 'add'
    const  SUBSTRICT = ' substrict'
    export default {
        data () {
            return {
                //count:1,  //数量的值
                resObj:{type:'add',goodsid:0,count:0}
            }
        },
        props:[ 'initcount','goodsid'],
        created () {
            this.resObj.count = this.initcount > 1 ? this.initcount : 1
            this.resObj.goodsid = this.goodsid > 0 ? this.goodsid : 0
        },
        methods:{
            //减1
            substrict () {
                if (this.resObj.count < 1) {
                    this.resObj.count = 0
                    return
                }
                this.resObj.count = this.resObj.count -1
                this.resObj.type = SUBSTRICT
                this.notifycount ()
            },
            add () {
                this.resObj.count = this.resObj.count + 1
                this.resObj.type = ADD
                this.notifycount ()
            },
            //定义一个方法  将最新的对象传给父组件
            notifycount () {
                this.$emit('count',this.resObj) //当执行了这个代码之后，就会自动触发goodsinfo.vue中的getcount（）方法
            }
        }
    }
</script>
<style scoped>
    .subtmpl div {
        display: inline-block;
        padding: 5px;
        border: 1px solid rgba(92,92,92,0.4);
    }
    .left,.right,.middle {
        width: 30px;
        height: 25px;
        line-height: 15px;
        text-align: center;
    }
    .middle {
        width: 40px;
    }
</style>