import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import SignIn from "./SignIn.vue";
import MyPage from "./MyPage.vue";

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
      path: "/store",
      component: Store,
    },
    {
      path: "/signin",
      component: SignIn,
    },
    {
      path: "/MyPage",
      component: MyPage,
    },
  ],
});
