import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import pariticipant from '../views/participant.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'login',
    meta: {deniedForAuth: true},
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  }, {
    path: '/home',
    name: 'home',
    meta: {requiredAuth: true},
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  }, {
    path: '/participant',
    name: 'participant',
    meta: {requiredAuth: true},
    component: () => import(/* webpackChunkName: "pariticipant" */ '../views/participant.vue')
  }]
});

// router.beforeEach((to: Route, from: Route, next: Function) => {
//   const user: User = doCookieOperation("session");

//   const requiredAuth: boolean = to.matched.some((record: RouteRecord) => record.meta.requiredAuth);
//   const deniedForAuth: boolean = to.matched.some((record: RouteRecord) => record.meta.deniedForAuth);

//   if (requiredAuth && (!user || !user.token)) {
//     return next({path: `/`});
//   } else if (deniedForAuth && user) {
//     return next({path: to.path});
//   }

//   return next();
// });


export default router
