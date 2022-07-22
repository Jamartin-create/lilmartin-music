export default [
    {
        path: '/',
        name: 'home',
        redirect: '/mine',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/view/Login.vue')
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import('@/view/Mine.vue'),
        meta: {
            requireLogin: true
        }
    },
]