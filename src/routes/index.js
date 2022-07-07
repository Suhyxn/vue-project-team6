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
import Addproduct from './AddProduct.vue'
import AllReadHistory from './AllReadHistory.vue'
import EditProduct from './Editproduct.vue'

import Store from './Store.vue'
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
      component: Admin,
      children: [
        {
          path: 'allreadproduct',
          component: AllReadProduct
        },
        {
          path: 'allreadhistory',
          component: AllReadHistory
        },
        {
          path: 'editproduct',
          component: EditProduct
        },
        {
          path: 'addproduct',
          component: Addproduct
        }
      ]
    },
    {
      path: '/loginHome',
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
