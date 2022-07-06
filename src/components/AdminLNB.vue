<template>
  <div class="__container">
    <div class="LNB">
      <div class="nav nav-pills">
        <div
          v-for="nav in navigations"
          :key="nav.name"
          class="nav-item">
          <RouterLink
            :to="nav.href"
            active-class="active"
            class="nav-link">
            {{ nav.name }}
          </RouterLink>
        </div>
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
          name: 'ReadHistory',
          href: '/admin/readhistory'
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
      .nav-item {
        padding-bottom: 10px;
      }
    }
  }
}
</style>
