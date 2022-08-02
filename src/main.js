import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "@/util/filter";
import "nprogress/nprogress.css";
import "@/assets/css/iconfont/iconfont";
import "@/assets/css/iconfont/iconfont.css";

import Sider from "@/components/SideBar.vue";
import Player from "@/components/Player.vue";

Vue.config.productionTip = false;
Vue.component(Sider.name, Sider);
Vue.component(Player.name, Player);

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
