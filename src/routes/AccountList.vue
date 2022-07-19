<template>
  <div class="button">
    <button
      :disabled="noAddAccount"
      class="account_add"
      @click="$router.push('/mypage/accountadd')">
      계좌 추가
    </button>
    <button
      class="account_delete"
      :disabled="noDeleteAccount"
      @click="deleteAccount">
      계좌 해지
    </button>
  </div>
  <div class="account_list">
    <div
      v-if="noAddAccount"
      class="checkAccountList">
      추가 가능한 계좌가 없습니다!
    </div>
    <div
      v-if="noDeleteAccount"
      class="checkAccountList">
      추가 된 계좌가 없습니다.
      <br /> 
      계좌를 추가해 주세요!
    </div>
    <div
      v-if="accountStore.list.totalBalance"
      class="total_balance">
      전체 보유 금액: <p class="total_balance_account">
        &nbsp;{{ Number(accountStore.list.totalBalance).toLocaleString('ko-KR') }}
      </p>원
    </div>
    <div
      v-else
      class="total_balance">
      전체 보유 금액: <p class="total_balance_account">
        &nbsp; 0
      </p>원
    </div>
    <ul>
      <AccountListDetail 
        v-for="account in accountStore.list.accounts"
        :id="account.id"
        :key="account.bankName"
        :checked="account.checked"
        :bank-name="account.bankName"
        :account-number="account.accountNumber"
        :balance="account.balance"
        class="accounts_list_detail"
        @update:checked="val => account.checked = val" />
    </ul>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccountStore } from '~/store/account'
import AccountListDetail from '~/components/AccountListDetail.vue'

export default {
  components: {
    AccountListDetail
  },
  data() {
    return {
      checked: false
    }
  },
  computed: {
    ...mapStores(useAccountStore),
    noAddAccount() {
      if(!this.accountStore.list.accounts) {
        return true
      }
      else if (this.accountStore.list.accounts.length > 6) {
        return true
      }
      else {
        return false
      }
    },
    noDeleteAccount() {
      if(!this.accountStore.list.accounts) {
        return true
      }
      else if (this.accountStore.list.accounts.length == 0) {
        return true
      }
      else {
        return false
      }
    }
  },
  created() {
    this.accountStore.readAccountList()
  },
  methods: {
    deleteAccount() {
      let accountIds = []

      for (let i in this.accountStore.list.accounts) {
        if(this.accountStore.list.accounts[i].checked === true)
          accountIds.push(this.accountStore.list.accounts[i].id)
      }

      if (accountIds.length) {
        let signature = confirm('정말 선택한 계좌를 해지 하시겠습니까?')
        if(signature) {
          this.accountStore.deleteAccount(accountIds, signature)
          alert('선택한 계좌가 해지되었습니다!')
        }
      }
      else {
        alert('해지할 계좌를 선택해주세요!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #000;
}
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
    background-color: #845FA7;
    color: #fff;
    font-weight: 700;
    &:disabled {
      opacity: 0.7;
      color: #ccc;
    }
  }
  .account_delete {
    background-color: #f83d3d;
    font-weight: 700;
    color: #fff;
    &:disabled {
      opacity: 0.7;
      color: #ccc;
    }
  }
}
.account_list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 85%;
  overflow-y: auto;
  .checkAccountList {
    color: #ff0000;
    padding-bottom: 10px;
    text-align: center;
  }
  .total_balance {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: azure;
    border-radius: 5px;
    width: 80%;
    padding: 10px 0;
    font-weight: 700;
    .total_balance_account {
      color: red;
    }
  }
  ul {
    width: 80%;
    height: 100%;
    .accounts_list_detail {
      margin-top: 10px;
      width: 100%;
      height: 100px;
      border-radius: 5px;
      background-color: rgb(250, 234, 214, 1);
    }
  }
}
</style>
