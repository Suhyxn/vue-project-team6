import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import MyPage from './MyPage.vue'
import AccountList from './AccountList.vue'
import AccountAdd from './AccountAdd.vue'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({top: 0}),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/mypage',
      component: MyPage,
      children: [
        {
          path: 'accountlist',
          component: AccountList
        },
        { 
          path: 'accountadd',
          component: AccountAdd
        }
      ]
    }
  ]
})
