import Vue from 'vue'
import App from './App'
import router from './router'
import mint from 'mint-ui'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import store from './store'

import 'element-ui/lib/theme-default/index.css'
import 'mint-ui/lib/style.css'
import '../../css/wawa.fonts.css'
import '../../css/wa.web.content.css'
import 'mint-ui/src/style/empty.css' // 需要的css文件

Vue.use(mint)
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.config.productionTip = false
Vue.config.silent = true
let vRouter = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
Vue.use({
  vRouter
})
