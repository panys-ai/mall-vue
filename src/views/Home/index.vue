<template>
  <div class="home">
    <van-swipe :autoplay="3000" indicator-color="white" class="my-swipe">
      <van-swipe-item class="item" v-for="item in lunbolist" :key="item.id">
        <img :src="item.img" alt />
      </van-swipe-item>
    </van-swipe>

    <van-grid :column-num="3" class="my-grid">
      <van-grid-item
        v-for="gird in girds"
        :key="gird.id"
        :text="gird.title"
        props="gird"
        :to="gird.to"
      >
        <template slot="icon">
          <img :src="gird.src" alt />
        </template>
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script>
// import { Toast } from 'vant'
export default {
  data: () => ({
    lunbolist: [],
    girds: []
  }),
  created() {
    this.getlunbo()
    this.getGrids()
  },
  methods: {
    async getlunbo() {
      const {
        data: { message, status }
      } = await this.$http.get('api/getlunbo')
      if (status !== 0) return this.$Toast('获取轮播图失败')
      this.lunbolist = message
    },
    async getGrids() {
      const {
        data: { message, status }
      } = await this.$http.get('api/girds')
      if (status !== 0) return this.$Toast('获取轮播图失败')
      // this.lunbolist = message
      this.girds = message
      console.log(message)
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  .my-swipe {
    height: 200px;

    .item {
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
  }
  .my-grid {
    img {
      width: 60px;
      height: 60px;
      display: block;
      border-radius: 50%;
    }
  }
}
</style>
