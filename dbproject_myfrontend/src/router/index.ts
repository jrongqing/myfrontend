import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import userPage from '../views/userPage.vue'
import managerPage from '../views/managerPage.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    name: 'Login',
    component:() =>import('../views/LoginRegister.vue')
  },
  {
    path: '/404',
    name: '404',
    component: ()=> import('../views/404.vue')
  },
  {
    path: '/:pathMatch(.*)',
    redirect:'/404'
  },
  {
    path:'/userPage',
    name:'userPage',
    component:()=> import('../views/userPage.vue')
  },
  {
    path:'/managerPage',
    name:'managerPage',
    component:()=> import('../views/managerPage.vue')
  }
  
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some((route)=>route.meta.Auth)){
      if(localStorage.getItem('token')){
          next()
      }else{
        next({
           path:'/login',
              query:{
               returnURL:to.path
          }
          })
      }
     
}else{
       next()
  }
})


export default router
