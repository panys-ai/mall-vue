<template>
  <div class="newsinof">
    <div class="newsinof-header">
      <van-card :title="news.title">
        <div slot="price">
          <span class="add_tiem">发表时间:{{news.add_time}}</span>
        </div>
        <div slot="num">点击{{news.click}}次</div>
      </van-card>
      <hr />
      <div class="newsinof-body">{{news.content}}</div>
    </div>
    <comment :comments="comments" @postcomment="postcomment"></comment>
    <van-button plain type="danger" class="more" @click="getMore">{{hasFlag? '没数据了':'加载更多'}}</van-button>
  </div>
</template>
<script>
// import { Toast } from 'vant'
import Comment from '@/components/comment'
export default {
  data: () => ({
    id: '',
    news: {},
    pageindex: 1,
    limit: 3,
    comments: [],
    hasFlag: false
  }),
  created() {
    this.id = this.$route.params.id
    this.getNewsInfo()
    this.getComments()
  },
  methods: {
    async getNewsInfo() {
      const {
        data: { message, status }
      } = await this.$http.get(`api/getnew/${this.id}`)
      if (status !== 0) return this.$Toast(message)
      this.news = message
      //   console.log(message)
    },
    async getComments() {
      if (this.hasFlag !== false) return
      const {
        data: { message, status, count }
      } = await this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageindex}&limit=${this.limit}`)
      if (status !== 0) return this.$Toast(message)
      this.comments = this.comments.concat(message)
      console.log(count)
      this.hasFlag = this.pageindex * this.limit > count
      console.log(this.hasFlag)
    },
    getMore() {
      this.pageindex++
      this.getComments()
    },
    async postcomment(data) {
      // console.log(data)
      const {
        data: { message, status }
      } = await this.$http.post(`api/postcomment/${this.id}`, { content: data })
      if (status !== 0) return this.$Toast('发表评论失败')
      console.log(message)
      this.comments.unshift({
        user_name: '匿名用户',
        content: data,
        add_time: Date.now()
      })
    }
  },
  components: {
    Comment
  }
}
</script>
<style lang="less" scoped>
.newsinof {
  .van-card {
    background: #fff;
  }
  .van-card__content {
    min-height: 51px;
    .van-card__title {
      margin-bottom: 20px;
      color: red;
      text-align: center;
      font-size: 16px;
    }
  }
  .van-card__bottom {
    margin-top: 20px;
  }
  .add_tiem {
    color: #226aff;
  }
  .newsinof-content {
    text-indent: 2em;
  }
  .more {
    width: 100%;
  }
}
</style>
