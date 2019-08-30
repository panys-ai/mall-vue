import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Store({
  state: {
    cart: JSON.parse(localStorage.getItem('cart') || '[]')
  },
  getters: {
    getAllCount(state) {
      let c = 0
      state.cart.forEach(item => {
        c += item.count
      })
      return c
    },
    getAllPrice(state) {
      var o = {
        count: 0,
        allPrice: 0
      }
      state.cart.forEach(item => {
        if (item.selected === true) {
          o.count += item.count
          o.allPrice += item.count * item.sell_price
        }
      })
      return o
    }
  },
  mutations: {
    addCart(state, goodsinfo) {
      var flag = false
      state.cart.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count)
          flag = true
          return true
        }
      })
      if (!flag) {
        state.cart.push(goodsinfo)
      }
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }
  }
})
