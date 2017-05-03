<template>
    <div class="tmpl">
        <div class="commentArea">
            提价评论
        </div>
        <div class="submitarea">
            <textarea class="textarea" placeholder="请输入评论内容" ref="contentText"></textarea>
            <mt-button type="primary" size="large" @click="postcomment">发表</mt-button>
        </div>
        <div class="commentTitle">
            评论列表
        </div>
        <div class="commentList">
            <!--<div class="outwrap">-->
                <!--&lt;!&ndash;<div class="comment">{{item.content}}</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="user">{{item.user_name}}</div>&ndash;&gt;-->
                <!--&lt;!&ndash;<div class="time">{{item.add_time | fmtdate(YYYY-MM-DD)}}</div>&ndash;&gt;-->
                <!--<div class="comment">一条评论</div>-->
                <!--<div class="user">匿名</div>-->
                <!--<div class="time">2018-2-2</div>-->
            <!--</div>-->
            <div class="outwrap" v-for="item in comment">
                <div class="comment">{{item.content}}</div>
                <div class="user">{{item.user_name}}</div>
                <div class="time">{{item.add_time | fmtdate('YYYY-MM-DD')}}</div>
            </div>
        </div>
        <!--加载更多-->
        <mt-button class="more" type="danger" size="large" plain @click="getmore">加载更多</mt-button>
    </div>
</template>
<script>
    import common from '../../kits/common.js'
    import { Toast } from 'mint-ui';
    export default {
        data () {
            return {
                comment:[],  //获取到评论信息放到这
                pageindex:1  //获取评论的页码
            }
        },
        created () {
            this.getcomment (this.pageindex)
        },
        methods: {
            //提交评论信息
            postcomment () {
                let url = common.apihost + '/api/postcomment/' + this.artid
                //获取到textarea中的文本
                let content = this.$refs.contentText.value
                //判断内容是否为空
                if (!content || content.trim().length <= 0) {
                    Toast('请填写评论内容');
                    return
                }
                this.$http.post(url,{content:content},{emulateJSON:true}).then(res => {
                    Toast('评论提交成功');  //mint-ui中的组件
                    //重新加载
                    this.getcomment(this.pageindex)
                    //清空文本框的值
                    this.$refs.contentText.value = ''
                },res => {
                    console.log('提交失败')

                })

            },
            //获取评论信息
            getcomment (pageindex) {
                let  url =   common.apihost + '/api/getcomments/' + this.artid + '?pageindex=' + pageindex
                this.$http.get(url).then(
                    res => {
                        //由于我们要实现加载更多的功能  这里应该是最新数据加载到原数据中
                        //this.comment = res.body.message
                        this.comment  =  this.comment.concat(res.body.message)
                    },
                    res => {console.log('获取失败')})
            },
            getmore () {
                //将pageindex++
                this.pageindex++
                //将自增以后的pageindex传入getcomments(pageindex)
                this.getcomment(this.pageindex)

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
        max-height: 100px;
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
    /*加载更多*/
    .more {
        margin-top: 10px;
    }
</style>