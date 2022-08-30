import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";

import "@/util/filter";
import "nprogress/nprogress.css";
import "@/assets/css/iconfont/iconfont";
import "@/assets/css/iconfont/iconfont.css";

import Sider from "@/components/Global_Components/SideBar.vue";
import Player from "@/components/Global_Components/Player.vue";
import Pannel from "@/components/Global_Components/Pannel.vue";
import Toast from "@/components/Global_Components/Toast.vue";

Vue.config.productionTip = false;
Vue.component(Sider.name, Sider);
Vue.component(Player.name, Player);
Vue.component(Pannel.name, Pannel);
Vue.component(Toast.name, Toast);

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
