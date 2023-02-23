import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const ensureAuthenticated = (to, from, next) => {
   var isAuthenticated= false;
  if (store.getters.isAuthenticated && store.getters.getCurrentUser ) {
     isAuthenticated = true;
   
  } else {
     isAuthenticated= false;
   
  }

  if(isAuthenticated)
 {
  next(); // allow to enter route
 } 
 else
 {
  next('/login'); // go to '/login';
 }
};


const router = new VueRouter({
  
  routes:  [
  
    {
    path: '/',
    beforeEnter: ensureAuthenticated,
    component: () => import('../components/Home.vue')
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue')
  },
  
  {
    path: '/country',
    name: 'Country',
    beforeEnter: ensureAuthenticated,
    component: () => import('../components/country/list.vue')
  },
  {
    path: '/city',
    name: 'City',
    beforeEnter: ensureAuthenticated,
    component: () => import('../components/city/list.vue')
  },
  {
    path: '/configure-view',
    name: 'CinfigureViewComponent',
    component: () => import('../components/utils/ConfigureView.vue')
  },
  {
    path: '/get-profile',
    name: 'GetProfile',
     beforeEnter: ensureAuthenticated,
    component: () => import('../components/auth/GetProfile.vue')
  },
  {
    path: '/view-profile',
    name: 'ViewProfile',
     beforeEnter: ensureAuthenticated,
    component: () => import('../components/auth/ViewProfile.vue')
  },

  // Author .....

  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/auth/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: () => import('../components/auth/ForgotPassword.vue')
  },
  {
    path: '/reset-password/:token',
    name: 'ResetPassword',
    component: () => import('../components/auth/ResetPassword.vue')
  },
  
]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

// const router = new VueRouter({
//   routes
// })

export default router
