import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Carousel3d from 'vue-carousel-3d';

Vue.config.productionTip = false
Vue.prototype.axios = axios
axios.defaults.baseURL = 'http://127.0.0.1'

Vue.use(ElementUI).use(Carousel3d);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
