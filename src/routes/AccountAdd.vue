<template>
  <div class="button">
    <button
      class="account_add"
      @click="addAccount">
      계좌 연결
    </button>
    <button class="account_delete">
      <RouterLink to="/mypage/accountlist">
        취소
      </RouterLink>
    </button>
  </div>
  <div class="account_add_list">
    <AccountAddDetail 
      @get-bank-code="getBankCode"
      @get-account-number="getAccountNumber"
      @get-phone-number="getPhoneNumber"
      @get-signature="getSignature"
      @get-digits="getDigits" />
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccountStore } from '~/store/account'
import AccountAddDetail from '~/components/AccountAddDetail.vue'

export default {
  components: {
    AccountAddDetail
  },
  data() {
    return {
      bankCode: '',
      digits: '',
      accountNumber: '',
      phoneNumber: '',
      disabled: false,
      signature: false,
      sum: 0
    }
  },
  computed: {
    ...mapStores(useAccountStore)
  },
  methods: {
    getBankCode(value1, value2) {
      this.bankCode = value1 
      this.disabled = value2
    },
    getAccountNumber(value) {
      this.accountNumber = value 
    },
    getPhoneNumber(value) {
      this.phoneNumber = value 
    },
    getSignature(value) {
      this.signature = value 
    },
    getDigits(value) {
      this.digits = value
      let sum = 0
        for (let i in this.digits) {
          sum += (this.digits[i])
        }
        this.sum = sum
    },
    addAccount() {
      const bankCode = this.bankCode
      const disabled = this.disabled
      const accountNumber = this.accountNumber
      const phoneNumber = this.phoneNumber
      const signature = this.signature
      const sum = this.sum
      const regExp = new RegExp(`^([0-9]{${sum}})$`)
      
      if(!bankCode) {
        return false
      }
      else if (disabled == true) {
        return false
      }
      else if (!accountNumber) {
        return false
      }
      else if (!regExp.test(accountNumber)) {
        return false
      }
      else if (!phoneNumber) {
        return false
      }
      else if (!/^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/.test(phoneNumber)) {
        return false
      }
      else if (!signature) {
        return false
      }
      else {
      const payload = { bankCode, accountNumber, phoneNumber, signature }
      this.accountStore.addAccountList(payload)

      alert('계좌 등록이 완료되었습니다!')
      this.$router.push('/mypage/accountlist')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #fff;
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
    font-weight: 700;
    color: #fff;
  }
  .account_delete {
    font-weight: 700;
    background-color: #f83d3d;
  }
}
.account_add_list {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>

