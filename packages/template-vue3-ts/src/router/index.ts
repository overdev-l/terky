import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/home',
        component: () => import('@/layout/layout.vue'),
        name: 'layout',
        children: []
    }
]
export default createRouter({
    history: createWebHistory('/admin'),
    routes
})
