import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import SignIn from "./SignIn.vue";
import MyPage from "./MyPage.vue";
import AccountList from "./AccountList.vue";
import LoginHome from "./LoginHome.vue";
import Admin from "./Admin.vue";
import AllReadProduct from "./AllReadProduct.vue";

import Store from "./Store.vue";
export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/admin",
      component: Admin,
    },
    {
      path: "/admin/allreadproduct",
      component: AllReadProduct,
    },
    {
      path: "/MyPage",
      component: MyPage,
    },
    {
      path: "/MyPage/AccountList",
      component: AccountList,
    },
    {
      path: "/loginHome",
      component: LoginHome,
    },
    {
      path: "/store",
      component: Store,
    },
    {
      path: "/signin",
      component: SignIn,
    },
  ],
});
