import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'home',
            component: () =>
                import ('./views/home/')
        },
        {
            path: '/shop',
            name: 'shop',
            component: () =>
                import ('./views/shop/')
        }, {
            path: '/kong',
            name: 'kong',
            component: () =>
                import ('./views/shop/shop.vue')
        }, {
            path: '/address',
            name: 'address',
            component: () =>
                import ('./views/address/')
        },
        {
            path: '*',
            redirect: '/home'
        }
    ]
})