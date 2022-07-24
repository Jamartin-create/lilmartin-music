export default [
    {
        path: '/',
        name: 'home',
        component: () => import('@/view/Mine.vue'),
        meta: {
            requireLogin: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/Login.vue')
    },
]