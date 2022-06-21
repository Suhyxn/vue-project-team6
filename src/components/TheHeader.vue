<template>
  <div class="header">
    <img
      src="../HeaderImage/mapleIcon.png"
      alt="icon" 
      class="icon" />
    <RouterLink to="/">
      <img
        src="../HeaderImage/mapleLogo.png"
        alt="logo"
        class="logo" />
    </RouterLink>
    <div class="user">
      <span class="material-icons">
        account_circle
      </span>
      <div class="user_name">
        Guest
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useMainStore } from '~/store/main'

export default {
  ...mapStores(useMainStore)
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FEE3EC;
  .icon {
    padding-left: 30px;
    width: 48px;
    height: 48px;
  }
  .logo {
    cursor: pointer;
  }
  .user {
    display: flex;
    .material-icons {
      font-size: 30px;
    }
    .user_name {
      font-size: 24px;
      margin-right: 30px;
      margin-left: 10px;
    }
  }
}
</style>
