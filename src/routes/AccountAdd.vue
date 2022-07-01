<template>
  <div class="button">
    <button class="account_add">
      계좌 연결
    </button>
    <button class="account_delete">
      <RouterLink to="/mypage/accountlist">
        취소
      </RouterLink>
    </button>
  </div>
  <div class="account_add_list">
    <AccountAddDetail />
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccouontStore } from '~/store/account'
import AccountAddDetail from '~/components/AccountAddDetail.vue'
export default {
  components: {
    AccountAddDetail
  },
  computed: {
  ...mapStores(useAccouontStore)
  },
}
</script>

<style lang="scss" scoped>
button {
  width: 80px;
  height: 30px;
  margin-top: 10px;
  margin-right: 10px;
  border-style: none;
  border-radius: 5px;
  cursor: pointer;
}
.button {
  display: flex;
  justify-content: flex-end;
  .account_add {
    background-color: #5353f1;
  }
  .account_delete {
    background-color: #f83d3d;
  }
}
.account_add_list {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>

