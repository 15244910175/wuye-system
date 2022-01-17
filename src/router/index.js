// import { resolve } from 'core-js/fn/promise'
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: resolve=>require(['../views/loginRegister.vue'],resolve),
    // meta:{requireAuth:true,roles:['管理员','业主']}
  },
  // {
  //   path:'/ForgetPassword',
  //   component:resolve=>require(['../views/ForgetPassword.vue'])
  // },
  {
    path: '/userhome',
    name:'userhome',
    component: resolve=>require(['../views/userhome.vue'],resolve),
    meta:{requireAuth:true},
    children: [
      {
        path: '/',
        component: resolve=>require(['../pages/defalut.vue'],resolve),
      },
      {
        path: '/check-data',
        component: resolve=>require(['../pages/user/data/check-data.vue'],resolve),
      },
      // {
      //   path:'/useradmin',
      //   component:resolve=>require(['../views/useradmin.vue'],resolve)
      // },
      {
        path: '/add-repair',
        component: resolve=>require(['../pages/user/repair/add-repair.vue'],resolve),
      },
      {
        path: '/check-repair',
        component: resolve=>require(['../pages/user/repair/check-repair.vue'],resolve),
      },
      {
        path: '/pay',
        component: resolve=>require(['../pages/user/pay/pay.vue'],resolve),
      },
      {
        path: '/check-pay',
        component: resolve=>require(['../pages/user/pay/check-pay.vue'],resolve),
      },
      {
        path: '/order-park',
        component: resolve=>require(['../pages/user/park/order-park.vue'],resolve),
      },
	  {
	    path: '/passmag',
	    component: resolve=>require(['../pages/user/pass/passmag.vue'],resolve),
	  },
	  {
	    path: '/colpass',
	    component: resolve=>require(['../pages/user/pass/colpass.vue'],resolve),
	  },
	  {
		  path:'/addNote',
		  component:resolve=>require(['../pages/user/note/addNote.vue'],resolve),
	  },
	  
      {
        path: '/inNote',
        component: resolve=>require(['../pages/user/note/inNote.vue'],resolve),
      },
      {
        path: '/speak',
        component: resolve=>require(['../pages/user/note/speak.vue'],resolve),
      },
	  
    ]
  },
  {
    path: '/adminhome',
    name:'adminhome',
    component: resolve=>require(['../views/adminhome.vue'],resolve),
    // meta:{requireAuth:true,roles:['管理员']},
    children: [
      {
        path: '/',
        component: resolve=>require(['../pages/defalut.vue'],resolve),
      },
     {
      path: '/add-admin',
      component: resolve=>require(['../pages/admin/admin/add-admin.vue'],resolve),
     },
     {
      path: '/check-admin',
      component: resolve=>require(['../pages/admin/admin/check-admin.vue'],resolve),
     },
     {
      path: '/add-baoan',
      component: resolve=>require(['../pages/admin/baoan/add-baoan.vue'],resolve),
     },
     {
      path: '/add-Scheduling',
      component: resolve=>require(['../pages/admin/baoan/add-Scheduling.vue'],resolve),
     },
     {
      path: '/check-Scheduling',
      component: resolve=>require(['../pages/admin/baoan/check-Scheduling.vue'],resolve),
     },
     {
      path: '/check-baoan',
      component: resolve=>require(['../pages/admin/baoan/check-baoan.vue'],resolve),
     },
     {
      path: '/h-change',
      component: resolve=>require(['../pages/admin/data/h-change.vue'],resolve),
     },
     {
      path: '/check-house',
      component: resolve=>require(['../pages/admin/data/check-house.vue'],resolve),
     },
	 {
		 path:'/leasehold',
		 component:resolve=>require(['../pages/admin/data/leasehold.vue'],resolve)
	 },
     {
      path: '/add-equipment',
      component: resolve=>require(['../pages/admin/equipment/add-equipment.vue'],resolve),
     },
     {
      path: '/check-equipment',
      component: resolve=>require(['../pages/admin/equipment/check-equipment.vue'],resolve),
     },
     {
      path: '/note',
      component: resolve=>require(['../pages/admin/note/note.vue'],resolve),
     },
     {
      path: '/complaint',
      component: resolve=>require(['../pages/admin/note/complaint.vue'],resolve),
     },
     {
      path: '/check-carPark',
      component: resolve=>require(['../pages/admin/park/check-carPark.vue'],resolve),
     },
     {
      path: '/check-park',
      component: resolve=>require(['../pages/admin/park/check-park.vue'],resolve),
     },
     {
      path: '/order-adminPark',
      component: resolve=>require(['../pages/admin/park/order-adminPark.vue'],resolve),
     },
     {
      path: '/adminPay',
      component: resolve=>require(['../pages/admin/pay/adminPay.vue'],resolve),
     },
     {
      path: '/check-adminPay',
      component: resolve=>require(['../pages/admin/pay/check-adminPay.vue'],resolve),
     },
     {
      path: '/add-renshi',
      component: resolve=>require(['../pages/admin/renshi/add-renshi.vue'],resolve),
     },
     {
      path: '/check-renshi',
      component: resolve=>require(['../pages/admin/renshi/check-renshi.vue'],resolve),
     },
     {
      path: '/add-adminRepair',
      component: resolve=>require(['../pages/admin/repair/add-adminRepair.vue'],resolve),
     },
     {
      path: '/check-adminRepair',
      component: resolve=>require(['../pages/admin/repair/check-adminRepair.vue'],resolve),
     },
	 {
	  path: '/pass-mag',
	  component: resolve=>require(['../pages/admin/pass/pass-mag.vue'],resolve),
	 },
	 {
	  path: '/col-pass',
	  component: resolve=>require(['../pages/admin/pass/col-pass.vue'],resolve),
	 },
    //  {
    //    path:'/useradmin',
    //    component:resolve=>require(['../views/useradmin.vue'],resolve)
    //  }
  ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router