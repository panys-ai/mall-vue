<template>
  <div class="photoinfo">
    <van-card :title="imgs.title">
      <div slot="price">
        <span class="add_tiem">发表时间:{{imgs.add_time}}</span>
      </div>
      <div slot="num">点击{{imgs.click}}次</div>
    </van-card>
    <hr />
    <div class="imgs-box">
      <div class="imgs-thum">
        <img :src="thum" alt v-for="(thum,index) in thums" :key="thum" @click="showImg(index)" />
      </div>
      <p class="desc">{{imgs.content}}</p>
      <comment :comments="comments" @postcomment="postcomment"></comment>

      <van-button plain type="danger" class="more" @click="getMore">{{hasFlag? '没数据了':'加载更多'}}</van-button>
    </div>
  </div>
</template>
<script>
import Comment from '@/components/comment'
export default {
  data: () => ({
    id: '',
    imgs: {},
    thums: [],
    comments: [],
    hasFlag: false,
    pageindex: 0,
    limit: 6
  }),
  created() {
    this.id = this.$route.params.id
    this.getImgs()
    this.getThumImages()
    this.getComments()
  },
  methods: {
    async getImgs() {
      const {
        data: { status, message }
      } = await this.$http.get(`api/getimageInfo/${this.id}`)
      if (status !== 0) return this.$Toast(message)
      this.imgs = message
    },
    async getThumImages() {
      const {
        data: { status, message }
      } = await this.$http.get(`api/getthumimages/${this.id}`)
      if (status !== 0) return this.$Toast(message)
      console.log(message)

      let arr = []
      message.forEach(item => {
        if (item.src) {
          arr.push(item.src)
        }
      })
      console.log(arr)
      this.thums = arr
    },
    showImg(startPosition) {
      this.$ImagePreview({
        images: this.thums,
        startPosition
      })
    },
    async getComments() {
      if (this.hasFlag !== false) return
      this.pageindex++
      const {
        data: { message, status, count }
      } = await this.$http.get(`api/getcomments/${this.id}?pageindex=${this.pageindex}&limit=${this.limit}`)
      if (status !== 0) return this.$Toast(message)
      this.comments = this.comments.concat(message)
      console.log(count)
      this.hasFlag = this.pageindex * this.limit > count
      //   console.log(this.hasFlag)
    },
    getMore() {
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
.photoinfo {
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
  .imgs-thum {
    display: flex;
    justify-content: space-around;
    img {
      width: 100px;
      height: 100px;
    }
  }
}
</style>
