import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'event-list',
        component: () =>
            import(
                /* webpackChunkName: "event-list" */ '../views/EventList.vue'
            )
    },
    {
        path: '/event/create',
        name: 'event-create',
        component: () =>
            import(
                /* webpackChunkName: "event-create" */ '../views/EventCreate.vue'
            )
    },
    {
        path: '/event/:id',
        name: 'event-show',
        component: () =>
            import(
                /* webpackChunkName: "event-show" */ '../views/EventShow.vue'
            ),
        props: true
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
