<template>
    <div class="subtmpl">
        <div class="left" @click="substrict">-</div>
        <div class="middle">{{count}}</div>
        <div class="right" @click="add">+</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                count:1  //数量的值
            }
        },
        methods:{
            //减1
            substrict () {
                if (this.count <=1) {
                    this.count = 1
                    return
                }
                this.count = this.count -1
                this.notifycount ()
            },
            add () {
                this.count = this.count + 1
                this.notifycount ()
            },
            //定义一个方法  将最新的count传给父组件
            notifycount () {
                this.$emit('count',this.count) //当执行了这个代码之后，就会自动触发goodsinfo.vue中的getcount（）方法
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