import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import SignIn from './SignIn.vue'
import MyPage from './MyPage.vue'
import AccountList from './AccountList.vue'
import AccountAdd from './AccountAdd.vue'
import LoginHome from './LoginHome.vue'
import Test from './test.vue'
import Admin from './Admin.vue'
import AllReadProduct from './AllReadProduct.vue'
import { useUserStore } from '~/store/user'

import Store from './Store.vue'

const rejectAuthUser = (to, from, next) => {
  const userStore = useUserStore()
  
  if (userStore.isSignin === true) {
    next()
  } else {
    next('/')
  }
}

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
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
    },
    {
      path: '/admin',
      component: Admin
    },
    {
      path: '/admin/allreadproduct',
      component: AllReadProduct
    },
    {
      path: '/loginHome',
      beforeEnter: rejectAuthUser,
      component: LoginHome
    },
    {
      path: '/test',
      component: Test
    },
    {
      path: '/store',
      component: Store,
    },
    {
      path: '/signin',
      component: SignIn,
    }
  ],
})
