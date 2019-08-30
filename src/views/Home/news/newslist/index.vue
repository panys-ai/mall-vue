<template>
  <div class="newslist">
    <router-link v-for="item in newslist" :key="item.id" :to="'/home/newsinof/'+ item.id">
      <van-card :title="item.title" :thumb="item.img_url">
        <div slot="price">
          <span class="add_tiem">发表时间:{{item.add_time}}</span>
        </div>
        <div slot="num">点击{{item.click}}次</div>
      </van-card>
    </router-link>
  </div>
</template>
<script>
// import { Toast } from 'vant'
export default {
  data: () => ({
    newslist: []
  }),
  created() {
    this.getNewsList()
  },
  methods: {
    async getNewsList() {
      const {
        data: { message, status }
      } = await this.$http.get('api/getnewslist')
      if (status !== 0) return this.$Toast('获取新闻列表信息数据失败')
      this.newslist = message
      console.log(message)
    }
  }
}
</script>
<style lang="less" scoped>
.van-card__thumb {
  height: 51px;
}
.van-card__content {
  min-height: 51px;
}
.van-card__bottom {
  margin-top: 20px;
}
.add_tiem {
  color: red;
}
</style>
