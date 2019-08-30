import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/vant.js'

import axios from 'axios'
import store from './store'

// import moment from 'moment'
axios.defaults.baseURL = 'http://localhost:5000'

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter('datefmt', (date, arg = 'YYYY-MM-DD hh:mm:ss') => {
  // return moment(date).format(arg)
})
new Vue({

  render: h => h(App),
  router,
  store
}).$mount('#app')
