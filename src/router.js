import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'


import Login from './views/Login.vue'
import Register from './views/Register.vue'
import { Dashboard } from './views/Dashboard'


Vue.use(Router)
Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  linkActiveClass: 'active bg-c-blue',
  routes: [
    { path: '*', redirect: '/login'},
    { name: 'Login', path: '/login', component: Login, meta: { auth: false } },
    { name: 'Register', path: '/register', component: Register, meta: { auth: false } },
    {
      path: '/',
      name: 'Dashboard',
      // redirect: '/users/all',
      component: Dashboard,
      meta: { auth: true },
      children: [
        // { name: 'Home', path: '/home', component: Home },
      ]
    },
    
  ]
})
