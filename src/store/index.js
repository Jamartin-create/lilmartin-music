import Vuex from "vuex";
import Vue from "vue";

//命名空间
import user from "./user";
import sys from "./sys";

//vuex自定义插件
/**
 * vuex自定义插件在对应的mutations执行后自动执行，用于处理一些数据实时更新的操作
 */
import userPlugins from "./user/userPlugins";
const plugins = [userPlugins];

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    sys,
  },
  plugins,
});
