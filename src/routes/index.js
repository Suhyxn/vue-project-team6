import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import MyPage from './MyPage.vue'
import AccountList from './AccountList.vue'
import Admin from './Admin.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({top: 0}),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/Admin',
      component: Admin
    },
    {
      path: '/MyPage',
      component: MyPage
    },
    {
      path: '/MyPage/AccountList',
      component: AccountList
    }
  ]
})
