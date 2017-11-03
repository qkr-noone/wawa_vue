// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import mint from 'mint-ui'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import store from './store'

import 'element-ui/lib/theme-default/index.css'
import 'mint-ui/lib/style.css'
import '../../fonts/font_h5/iconfont.css'
import '../../css/wawa.fonts.css'
import '../../css/wa.web.content.css'
import 'mint-ui/src/style/empty.css' // 需要的css文件
// export { default } from './src/infinite-scroll.js'; // 核心代码

Vue.use(mint)
Vue.use(ElementUI)
Vue.use(VueResource)

Vue.config.productionTip = false
/* eslint-disable no-new */
/* render: h => h(App), */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  // render: h => h(App),
  components: { App }
})
