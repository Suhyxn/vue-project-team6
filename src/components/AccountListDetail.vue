<template>
  <li>
    <input
      type="checkbox" 
      :checked="checked"
      @click="checkedStatus" />
    <div class="account_information">
      <div class="bank_name">
        은행 명: {{ bankName }}
      </div>
      <div class="account_number">
        계좌 번호: {{ accountNumber }}
      </div>
      <div class="balance">
        보유 금액: {{ balance.toLocaleString('ko-KR') }}원
      </div>
    </div>
  </li>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccountStore } from '~/store/account'

export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    bankName: {
      type: String,
      default: ''
    },
    bankCode: {
      type: String,
      default: ''
    },
    accountNumber:{
      type: String,
      default: ''
    },
    balance: {
      type: Number,
      default: 0
    },
    checked: {
      type: Boolean,
      default: false
    }
  }
  ,
  emits: [
    'update:checked'
  ]
  ,computed: {
      ...mapStores(useAccountStore)
  }
  ,methods: {
    checkedStatus(event) {
      this.$emit('update:checked', event.target.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
li {
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 20px;
    height: 20px;
    margin-right: 10%;
  }
  .account_information {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-right: 15%;
    .bank_name {
      padding-top: 3px;
      padding-bottom: 3px;
      font-weight: 700;
      color: #F6921D;
    }
    .account_number {
      padding-top: 3px;
      padding-bottom: 3px;
      font-weight: 700;
      color: #8EC976;
    }
    .balance {
      padding-top: 3px;
      padding-bottom: 3px;
      font-weight: 700;
      color: #83c1c4;
    } 
  }
}
</style>
