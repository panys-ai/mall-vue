<template>
  <div class="goods-info">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="isShow" id="ball"></div>
    </transition>
    <div class="panel">
      <van-swipe :autoplay="3000" indicator-color="white" class="my-swipe">
        <van-swipe-item class="item" v-for="thum in thums" :key="thum.id">
          <img :src="thum.src" alt />
        </van-swipe-item>
      </van-swipe>
    </div>

    <van-panel :title="goodsinfo.title" class="panel">
      <div class="panel-body">
        <div class="price-group">
          市场价格:
          <span class="old">{{goodsinfo.market_price}}</span>
          销售价格:
          <span class="new">{{goodsinfo.sell_price}}</span>
        </div>
        <!-- 步进器组件 -->
        <div class="indsnu">
          <span>购买数量:</span>
          <van-stepper v-model="value" />
        </div>
        <div class="btn-group">
          <!-- 按钮 -->
          <van-button type="primary" size="small">立即购买</van-button>
          <van-button type="danger" size="small" @click="addCart" :disabled="isDisable">加入购物车</van-button>
        </div>
      </div>
    </van-panel>

    <!-- 列表信息 -->
    <van-panel class="panel" title="商品信息">
      <div class="panel-body">
        <p>商品货号：{{ goodsinfo.goods_no }}</p>
        <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
        <p>上架时间：{{ goodsinfo.add_time | datefmt }}</p>
      </div>
    </van-panel>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div>10</div>
    <div>11</div>
    <div>12</div>
    <div>13</div>
    <div>14</div>
    <div>15</div>
    <div>16</div>
    <div>17</div>
    <div>18</div>
    <div>19</div>
    <div>20</div>
    <div>21</div>
    <div>22</div>
    <div>23</div>
    <div>24</div>
    <div>25</div>
    <div>26</div>
    <div>27</div>
    <div>28</div>
    <div>29</div>
    <div>30</div>
    <div>31</div>
    <div>32</div>
    <div>33</div>
    <div>34</div>
    <div>35</div>
    <div>36</div>
    <div>37</div>
    <div>38</div>
    <div>39</div>
    <div>40</div>
    <div>41</div>
    <div>42</div>
    <div>43</div>
    <div>44</div>
    <div>45</div>
    <div>46</div>
    <div>47</div>
    <div>48</div>
    <div>49</div>
    <div>50</div>
    <div>51</div>
    <div>52</div>
    <div>53</div>
    <div>54</div>
    <div>55</div>
    <div>56</div>
    <div>57</div>
    <div>58</div>
    <div>59</div>
    <div>60</div>
    <div>61</div>
    <div>62</div>
    <div>63</div>
    <div>64</div>
    <div>65</div>
    <div>66</div>
    <div>67</div>
    <div>68</div>
    <div>69</div>
    <div>70</div>
    <div>71</div>
    <div>72</div>
    <div>73</div>
    <div>74</div>
    <div>75</div>
    <div>76</div>
    <div>77</div>
    <div>78</div>
    <div>79</div>
    <div>80</div>
    <div>81</div>
    <div>82</div>
    <div>83</div>
    <div>84</div>
    <div>85</div>
    <div>86</div>
    <div>87</div>
    <div>88</div>
    <div>89</div>
    <div>90</div>
    <div>91</div>
    <div>92</div>
    <div>93</div>
    <div>94</div>
    <div>95</div>
    <div>96</div>
    <div>97</div>
    <div>98</div>
    <div>99</div>
    <div>100</div>
  </div>
</template>
<script>
export default {
  data: () => ({
    id: '',
    thums: [],
    value: 1,
    goodsinfo: {},
    isShow: false,
    isDisable: false
  }),
  created() {
    this.id = this.$route.params.id
    this.getThumImages()
    this.getGoodsInfo()
    console.log(this.goodsinfo)
  },
  methods: {
    async getThumImages() {
      const {
        data: { status, message }
      } = await this.$http.get(`api/getthumimages/${this.id}`)
      if (status !== 0) return this.$Toast(message)
      this.thums = message
    },
    async getGoodsInfo() {
      const {
        data: { status, message }
      } = await this.$http.get('api/goods/getinfo/' + this.id)
      if (status !== 0) return this.$Toast('获取商品信息失败')
      this.goodsinfo = message
    //   console.log(message)
    },
    getBound() {
      let ball = document.querySelector('#ball').getBoundingClientRect()
      // console.log(ball)

      let info = document.querySelector('.van-info').getBoundingClientRect()

      this.xDist = info.left - ball.left
      this.yDist = info.top - ball.top
    },
    addCart() {
      this.isShow = !this.isShow

      this.isDisable = true

      setTimeout(() => {
        this.isDisable = false
      }, 400)

      let goodsinfo = {
        id: this.$route.params.id,
        count: this.value,
        sell_price: this.goodsinfo.sell_price,
        selected: true,
        title: this.goodsinfo.title,
        src: this.thums[0].src,
        timer: null
      }
      console.log(goodsinfo)
      this.$store.commit('addCart', goodsinfo)
    },
    beforeEnter(el) {
      el.style.transform = 'translate(0,0)'
    },
    enter(el, done) {
      // eslint-disable-next-line no-unused-expressions
      el.offserLeft

      this.getBound()

      el.style.transform = `translate(${this.xDist}px,${this.yDist}px)`
      el.style.transition = 'all .3s ease'
      done()
    },
    afterEnter() {
      this.isShow = false
    }
  }
}
</script>
<style lang="less" scoped>
.goods-info {
  position: relative;
  .ball {
    position: absolute;
    background-color: red;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    left: 125px;
    top: 238px;
    z-index: 999;
  }
  .my-swipe {
    height: 150px;
    img {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
  .panel {
    width: 96%;
    border-radius: 6px;
    box-shadow: 0 0 3px #ccc;
    margin: 0 auto;
    margin-top: 10px;
    overflow: hidden;
    .panel-body {
      margin-left: 16px;
      margin-bottom: 10px;
      color: #8f8f94;
      font-size: 14px;
    }
    p {
        margin-top: 10px;
    }
  }
  .indsnu {
    display: flex;
    align-items: center;
    margin: 8px 0;
    span {
      margin-right: 4px;
    }
  }
  .btn-group {
    button {
      margin-right: 4px;
    }
  }
}
</style>
