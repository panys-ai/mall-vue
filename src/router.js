import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/index.vue'
import Friends from './views/Friends/index.vue'
import Cart from './views/Cart/index.vue'
import Search from './views/Search/index.vue'
import NewsList from './views/Home/news/newslist/index.vue'
import Newsinof from './views/Home/news/newsinof/index.vue'
import Photolist from './views/Home/photos/photolist/index.vue'
import Photoinfo from './views/Home/photos/photoinfo/index.vue'
import Goodslist from './views/Home/goods/goodslist/index.vue'
import Goodsinfo from './views/Home/goods/goodsinfo/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path: '/',
      redirect: 'Home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/friends',
      component: Friends
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/home/newslist',
      component: NewsList
    },
    {
      path: '/home/newsinof/:id',
      component: Newsinof
    },
    {
      path: '/home/photolist',
      component: Photolist
    },
    {
      path: '/home/photoinfo/:id',
      component: Photoinfo
    },
    {
      path: '/home/goodslist',
      component: Goodslist
    },
    {
      path: '/home/goodsinfo/:id',
      component: Goodsinfo
    }
  ]
})
