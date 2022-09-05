/**
 * @description 导入所有vuex模块，自动加入如namespaced:true，可解决vuex命名冲突
 */
import Vuex from "vuex";
import Vue from "vue";

const modules = {};
const files = require.context("./modules", false, /\.js$/);
files.keys().forEach((key) => {
  modules[key.replace(/(modules|\/|\.|js)/g, "")] = {
    ...files(key).default,
    namespaced: true,
  };
});

/**
 * @description vuex自定义插件在对应的mutations执行后自动执行，用于处理一些数据实时更新的操作
 */
import userPlugins from "./plugins";
const plugins = [userPlugins];

Vue.use(Vuex);

export default new Vuex.Store({
  modules,
  plugins,
});
