<template>
  <div class="comment">
    <!-- <van-cell-group>
      <van-cell title="单元格" label="描述信息" />
    </van-cell-group>-->

    <h2>发表评论</h2>
    <hr />
    <textarea v-model="text" cols="10" rows="30" placeholder="请输入bb的内容" class="text"></textarea>

    <van-button type="danger" class="btn" @click="addComment">发表评论</van-button>
    <div class="comment-list" v-for="(comment,index) in comments" :key="index">
      <div class="comment-title">
        <span>第{{index+1}}楼</span>
        <span>用户: {{comment.user_name}}</span>
        <span>发表时间: {{comment.add_time | datefmt}}</span>
      </div>
      <div class="comment-item">{{comment.content}}</div>
    </div>
  </div>
</template>
<script>
// import { Toast } from 'vant'
export default {
  data: () => ({
    text: ''
  }),
  props: {
    comments: {
      type: Array
    }
  },
  created() {},
  methods: {
    addComment() {
      if (this.text.length === 0) return this.$Toast('请输入内容')
      this.$emit('postcomment', this.text)
      this.text = ''
    }
  }
}
</script>
<style lang="less" scoped>
.comment {
  .btn {
    width: 100%;
  }
  .text {
    font-size: 16px;
    width: 100%;
    height: 85px;
  }
  .comment-list {
      margin-top: 6px;
      font-size: 12px;
      .comment-title {
          background-color: #ccc;
          line-height: 30px;
          span {
              margin-right: 4px;
          }
      }
  }
}
</style>
