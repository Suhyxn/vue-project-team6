<template>
  <div 
    v-for="account in accountStore.accounts"
    :key="account"
    class="accounts_list"
    :accountId="accountId">
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccouontStore } from '~/store/account'

export default {
  computed: {
  ...mapStores(useAccouontStore)
  },
  created() {
    this.accountStore.readAccountList()
  }
}
</script>

<style>
.accounts_list {
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border-radius: 5px;
  background-color: rgb(250, 234, 214, 1);
}
</style>
