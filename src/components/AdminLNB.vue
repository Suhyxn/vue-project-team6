<template>
  <div class="__container">
    <div class="LNB">
      <div class="nav nav-pill menu_list">
        <button 
          class="menu myinfo"
          :class="{ active: /^\/admin\/.*AllReadProduct/.test($route.fullPath) }"
          @click="$router.push(`/admin/allreadproduct`)">
          모든 제품 조회
        </button>
        <button 
          class="menu account"
          :class="{ active: /^\/admin\/.*AllReadHistory/.test($route.fullPath) }"
          @click="$router.push(`/admin/allreadhistory`)">
          모든 거래 내역 조회
        </button>
        <button 
          class="menu myinfo"
          :class="{ active: /^\/admin\/.*EditProduct/.test($route.fullPath) }"
          @click="$router.push(`/admin/editproduct`)">
          제품 자세히 보기 및 수정
        </button>
        <button 
          class="menu account"
          :class="{ active: /^\/admin\/.*AddProduct/.test($route.fullPath) }"
          @click="$router.push(`/admin/addproduct`)">
          제품 추가
        </button>
        <button 
          class="menu myinfo"
          :class="{ active: /^\/admin\/.*DeleteProduct/.test($route.fullPath) }"
          @click="$router.push(`/admin/deleteproduct`)">
          제품 삭제
        </button>
        <!-- <div
          v-for="nav in navigations"
          :key="nav.name"
          class="nav-item">
          <RouterLink
            :to="nav.href"
            active-class="active"
            class="nav-link">
            {{ nav.name }}
          </RouterLink>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'

export default {
  ...mapStores(useAdminStore),
  data() {
    return {
      navigations: [
        {
          name: 'AllReadProduct',
          href: '/admin/allreadproduct'
        },
        {
          name: 'AllReadHistory',
          href: '/admin/allreadhistory'
        },
        {
          name: 'EditProduct',
          href: '/admin/editproduct'
        },
        {
          name: 'AddProduct',
          href: '/admin/addproduct'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

.__container {
  display: flex;
  flex-direction: row;
  width: 200px;
  .LNB {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    .nav {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      margin-left: 10px;
      .menu {
        width: 70%;
        height: 10%;
        margin-top: 10%;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        cursor: pointer;
        border-radius: 5px;
        color: #fff;
        &.myinfo {
          background-color: #F6921D;
          border: solid 2px #F6921D;
          &:hover {
            border: solid 3px #FFE341;
          }
          &.active {
            border: solid 3px #FFE341;
          }
        }
        &.account {
          border: solid 2px #8EC976;
          background-color: #8EC976;
          &:hover {
            border: solid 3px #2d9006;
            }
          &.active {
            border: solid 3px #2d9006;
            }
        }
      // .nav-item {
      //   padding-bottom: 10px;
      // }
      }
    }
  }
}
</style>
