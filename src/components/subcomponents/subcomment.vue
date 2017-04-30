<template>
    <div class="tmpl">
        <div class="commentArea">
            提价评论
        </div>
        <div class="submitarea">
            <textarea class="textarea" placeholder="请输入评论内容"></textarea>
            <mt-button type="primary" size="large">发表</mt-button>
        </div>
        <div class="commentTitle">
            评论列表
        </div>
        <div class="commentList">
            <div class="outwrap">
                <!--<div class="comment">{{item.content}}</div>-->
                <!--<div class="user">{{item.user_name}}</div>-->
                <!--<div class="time">{{item.add_time | fmtdate(YYYY-MM-DD)}}</div>-->
                <div class="comment">一条评论</div>
                <div class="user">匿名</div>
                <div class="time">2018-2-2</div>
            </div>
            <div class="outwrap">
                <!--<div class="comment">{{item.content}}</div>-->
                <!--<div class="user">{{item.user_name}}</div>-->
                <!--<div class="time">{{item.add_time | fmtdate(YYYY-MM-DD)}}</div>-->
                <div class="comment">一条评论</div>
                <div class="user">匿名</div>
                <div class="time">2018-2-2</div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                comment:[]  //获取到评论信息放到这
            }
        },
        methods: {
            //提交评论信息
            postcomment () {

            },
            //获取评论信息
            getcomment () {

            }
        },
        props:['artid']  //用来接收当前评论数据的所属内容id 父组件传递过来
    }
</script>
<style scoped>
    .tmpl {
        margin: 5px;
    }
    .commentArea, .commentTitle {
        font-weight: 700;
        font-size: 21px;
        border-bottom: 1px solid #929292;
        padding-bottom: 15px;
    }
    .commentTitle {
        margin-top: 8px;
        border-top: 1px solid #929292;
        padding-top: 10px;
    }
    .submitarea {
        margin-top: 8px;
    }
    .outwrap {
        border-bottom: 1px solid #929292;
        clear: both;
        max-height: 50px;
        overflow: auto;
        padding: 8px;
    }
    .user {
        float: left;
        color: #007aff;
    }
    .time {
        float: right;
    }
</style>