// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vue-ydui/dist/ydui.rem.css'
import YDUI from 'vue-ydui'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('../static/img/404.jpg'),
  loading: require('../static/img/404.jpg'),
  attempt: 1
})
Vue.use(YDUI)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
