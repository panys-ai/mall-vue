<template>
  <div class="app">
    <van-nav-bar title="长沙前端-1903" left-text="返回" left-arrow @click-left="goBack" />
    <div class="hetop"></div>
    <transition name="fly">
      <router-view></router-view>
    </transition>
    <div class="hebott"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" to="/home">home</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/friends">friends</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :info="$store.getters.getAllCount" to="/cart">cart</van-tabbar-item>
      <van-tabbar-item icon="search" to="/search">search</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data: () => ({
    active: 0
  }),
  created () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less" scoped>
.app {
  .hetop{
    height: 46px;
  }
  .hebott{
    height: 50px;
  }
  .van-nav-bar{
    position: fixed;
    width: 100%;
  }
  overflow: hidden;
  .fly-enter {
    transform: translateX(100%);
  }
  .fly-leave-to {
    transform: translateX(-100%);
    position: absolute;
    left:-300%;
  }
  .fly-enter-active,
  .fly-leave-active {
    transition: all .3s ease;
  }
}
</style>
