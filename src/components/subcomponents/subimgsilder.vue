<template>
    <div class="subtmpl">
        <!-- 利用mint-ui中的组件swipe -->
        <mt-swipe :auto="2000">
            <mt-swipe-item v-for="(item,index) in imgList" :key="index">
                <img class="img" v-bind:src="item.img">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        },
        props:['imgList']  //这个数据是从父组件得到的
    }
</script>
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
</style>