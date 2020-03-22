import Vue from "vue";
import Router from "vue-router";

// 导入登录组件
import Login from "@/components/Login.vue";
// 导入Home组件
import Home from "@/components/Home.vue";
// 导入User组件
import User from "@/components/User.vue";
Vue.use(Router);

const router = new Router({
  routes: [{
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/home",
      component: Home,
      // 配置嵌套路由
      children: [{
        path: "/user",
        component: User
      }, ]
    },

  ]
});

// 给路由对象设置导航守卫
// router.beforeEach((to, from, next) => {
//   // 判断是否有token
//   const token = localStorage.getItem("token");
//   // 去登录和有token的放行
//   if (to.path === "/login" || token) {
//     next();
//   } else {
//     // 没有token，去登录
//     next("/login");
//   }
// });

// 导出路由对象
export default router;
