import Vuex from 'vuex'
import Vue from 'vue'

//命名空间
import user from './user'

//vuex自定义插件
import userPlugins from './user/userPlugins'
const plugins = [userPlugins]

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        user,
    },
    plugins
})