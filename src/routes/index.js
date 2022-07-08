import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";
import MyPage from "./MyPage.vue";
import AccountList from "./AccountList.vue";
import AccountAdd from "./AccountAdd.vue";
import LoginHome from "./LoginHome.vue";
import Test from "./test.vue";
import Admin from "./Admin.vue";
import AllReadProduct from "./AllReadProduct.vue";
import EditUserInfo from "./EditUserInfo.vue";
import Store from "./Store.vue";
import PurchaseList from "./PurchaseList.vue";
import Detail from "./Detail.vue";

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/mypage",
      component: MyPage,
      children: [
        {
          path: "accountlist",
          component: AccountList,
        },
        {
          path: "accountadd",
          component: AccountAdd,
        },
        {
          path: "purchaselist",
          component: PurchaseList,
        },
      ],
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
      path: "/loginHome",
      component: LoginHome,
      meta: {
        auth: true,
      },
    },
    {
      path: "/test",
      component: Test,
    },
    {
      path: "/store",
      component: Store,
    },
    {
      path: "/store/detail/:id",
      component: Detail,
    },
    {
      path: "/signin",
      component: SignIn,
    },
    {
      path: "/signup",
      component: SignUp,
    },
    {
      path: "/editUserInfo",
      component: EditUserInfo,
    },
  ],
});
