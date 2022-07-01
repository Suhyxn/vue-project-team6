<template>
  <div class="button">
    <button class="account_add">
      <RouterLink to="/mypage/accountadd">
        계좌 추가
      </RouterLink>
    </button>
    <button class="account_delete">
      계좌 삭제
    </button>
  </div>
  <div class="account_list">
    <ul>
      <!-- v-if 반복문 -->
      <AccountListDetail />
    </ul>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccouontStore } from '~/store/account'
import AccountListDetail from '~/components/AccountListDetail.vue'

export default {
  components: {
    AccountListDetail
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
.account_list {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85%;
  overflow-y: auto;
  ul {
    width: 80%;
    height: 100%;
  }
}
</style>
