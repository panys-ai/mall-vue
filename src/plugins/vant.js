import Vue from 'vue'
import {
  SubmitBar,
  Switch,
  Stepper,
  Panel,
  ImagePreview,
  Cell, CellGroup,
  Lazyload,
  Tab, Tabs,
  Tag,
  Card,
  Grid, GridItem,
  Toast,
  Swipe, SwipeItem,
  Tabbar, TabbarItem,
  Button,
  NavBar
} from 'vant'

const options = {
  loading: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3345138084,3221952596&fm=26&gp=0.jpg'
}

Vue
  .use(SubmitBar)
  .use(Switch)
  .use(Stepper)
  .use(Panel)
  .use(ImagePreview)
  .use(Cell).use(CellGroup)
  .use(Lazyload, options)
  .use(Tab).use(Tabs)
  .use(Tag)
  .use(Card)
  .use(Grid).use(GridItem)
  .use(Swipe).use(SwipeItem)
  .use(Tabbar).use(TabbarItem)
  .use(NavBar)
  .use(Button)

Vue.prototype.$Toast = Toast
Vue.prototype.$ImagePreview = ImagePreview
