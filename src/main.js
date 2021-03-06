import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'nprogress/nprogress.css'
import './assets/css/iconfont/iconfont';
import './assets/css/iconfont/iconfont.css';

import Sider from '@/components/SideBar.vue'

Vue.config.productionTip = false
Vue.component(Sider.name, Sider)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
