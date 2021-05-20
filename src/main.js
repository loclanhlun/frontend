/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import store from './store'
import Vuex from 'vuex';
import axios from 'axios' 
import moment from 'vue-moment'
import VueSweetalert2 from 'vue-sweetalert2';

// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'

// router setup
import routes from './routes/routes'

Vue.prototype.moment = moment
Vue.prototype.$http = axios;

import './registerServiceWorker'
// plugin setup
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.use(VueSweetalert2);


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const authorizedRoles = to.meta;
  let userRole = '';
  // not use var --> scope
  const auth = JSON.parse(window.localStorage.getItem('auth')); 
  if(auth && auth.object && auth.object.role) {
    userRole = auth.object.role; 
  }

  if(authorizedRoles) {
    if(!userRole) {
      if(to.path === "/login") {
        next();
      }
      return next({
        path: '/login',
        query: {
          returnUrl: to.path
        }
      })
    }

    if(authorizedRoles.length && !authorizedRoles.includes(userRole)) {
      return next({
        path: '/not-found',
        query: {
          returnUrl: to.path
        }
      })
    }
  }
  next();
})

let token = JSON.parse(window.localStorage.getItem('auth'))


if( token ){
  axios.defaults.headers.common['Authorization'] = 'Bearer '+token.object.token
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})

