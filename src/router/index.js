import Vue from "vue";
import Router from "vue-router";
import routes from './routes'
import { asideMenu } from '@/projects'
Vue.use(Router);
const router = new Router({
  routes,
  asideMenu,
});
// router.beforeEach((to, from, next) => {
//   // ...
//   console.log('to, from', to, from)
//   next()
// })
router.beforeEach((to, from, next) => {
  // ...
  if (to.fullPath.includes('example-project')) {
    const token = sessionStorage.getItem('token'); 
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
export default router
