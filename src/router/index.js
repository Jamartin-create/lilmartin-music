import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import { isAccountLogin } from '@/util/auth';

Vue.use(VueRouter)
//重写push和replace方法（原本方法如果重复跳转同一页面的话会报错）
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push方法，处理原生的报错
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
//重写replace方法，处理原生的报错
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}


const router = new VueRouter({
    mode: 'hash',
    routes
})

router.beforeEach((to, from, next) => {
    //需要登录
    if (to.meta.requireLogin) {
        //是否是账号登录
        if (isAccountLogin()) {
            next()
        } else {
            console.log('login')
            next({ path: '/login' })
        }
    } else {
        next()
    }
})

export default router