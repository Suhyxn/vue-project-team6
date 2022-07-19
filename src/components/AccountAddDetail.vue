<template>
  <div
    class="container_account_add">
    <div class="bank">
      <p>은행명</p>
      <select
        @change="onChangeBankCode($event), bankDigits()">
        <option value="all">
          전체
        </option>
        <option 
          v-for="bank in accountStore.banks"
          :key="bank.name"
          :bankName="bank.name"
          :value="JSON.stringify(bank)">
          <div
            v-if="bank.disabled === true">
            {{ `${bank.name} (사용 중)` }}
          </div>
          <div
            v-else>
            {{ `${bank.name} (사용 가능)` }}
          </div>
        </option>
      </select>
    </div>
    <div
      v-if="bankCode && !disabled"
      class="correct_message">
      "{{ bankName }}" 을(를) 선택하셨습니다!
    </div>
    <div
      v-else-if="bankCode && disabled"
      class="wrong_message">
      "{{ bankName }}" 은(는) 이미 연결된 은행입니다!
    </div>
    <div
      v-else
      class="wrong_message">
      은행을 선택해주세요!
    </div>
    <div
      class="account_number">
      <p>계좌번호</p>
      <input
        ref="accountNumberText"
        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
        :placeholder="message"
        :maxlength="sum"
        type="text"
        @input="onInputChangeAccountNumber"
        @change="onChangeAccountNumber" />
    </div>
    <div
      v-if="accountNumber.length !== sum && disabled === false"
      class="wrong_message">
      계좌 번호를 {{ sum }}자리{{ digits }}에 맞게
      <br />
      입력 해주세요!
    </div>
    <div
      v-else-if="!bankCode || disabled === true"
      class="wrong_message">
      은행을 다시 선택해주세요!
    </div>
    <div
      v-else
      class="correct_message">
      계좌 번호 입력이 완료 되었습니다!
    </div>
    <div
      class="phone_number">
      <p>전화번호</p>
      <input
        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
        maxlength="11"
        placeholder="ex) 01012345678"
        type="text"
        @input="onInputChangePhoneNumber"
        @change="onChangePhoneNumber" />
    </div>
    <div
      v-if="phoneNumber === '' || phoneNumber.length !== 11 || !/^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/.test(phoneNumber)"
      class="wrong_message">
      전화번호를 양식에 맞게 입력 해주세요!
    </div>
    <div
      v-else
      class="correct_message">
      전화번호 입력이 완료 되었습니다!
    </div>
    <div
      class="sign">
      <input
        type="checkbox"
        :checked="signature"
        @change="onChangeSign" />
      <p>계좌 연결에 동의합니다</p>
    </div>
    <div
      v-if="!signature"
      class="wrong_message_sign_no">
      계좌 연결에 동의 해주세요!
    </div>
    <div
      v-else
      class="wrong_message_sign_ok">
      동의하셨습니다!
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccountStore } from '~/store/account'

export default {
  emits: 
    [
      'getBankCode',
      'getAccountNumber',
      'getPhoneNumber',
      'getSignature',
      'getDigits'
    ]
  ,
  data() {
    return {
      bankName: '',
      bankCode: '',
      digits: '',
      accountNumber: '',
      phoneNumber: '',
      signature: false,
      message: '',
      disabled: false,
      sum: 0
    }
  },
  computed: {
    ...mapStores(useAccountStore)
  },
  created() {
    this.accountStore.selectBankList(),
    this.bankDigits()
  },
  methods: {
    onChangeBankCode(e) {
      if (e.target.value =='all') {
        this.$refs.accountNumberText.value = ''
        return this.bankCode = ''
      }
      else {
      this.bankCode = JSON.parse(e.target.value).code
      this.bankName = JSON.parse(e.target.value).name
      this.disabled = JSON.parse(e.target.value).disabled
      const bankCode = this.bankCode
      const disabled = this.disabled
      this.$refs.accountNumberText.value = ''
      this.$emit('getBankCode', bankCode, disabled)
      }
    },
    onChangeAccountNumber(e) {
      this.accountNumber = e.target.value.trim()
      const accountNumber = this.accountNumber
      this.$emit('getAccountNumber', accountNumber)
    },
    onInputChangeAccountNumber(e) {
      this.accountNumber = e.target.value.trim()
    },
    onChangePhoneNumber(e) {
      this.phoneNumber = e.target.value.trim()
      const phoneNumber = this.phoneNumber
      this.$emit('getPhoneNumber', phoneNumber)
    },
    onInputChangePhoneNumber(e) {
      this.phoneNumber = e.target.value.trim()
    },
    onChangeSign(e) {
      if (e.target.checked) {
        this.signature = true
      }
      else {
        this.signature = false
      }
      const signature = this.signature
      this.$emit('getSignature', signature)
    },
    bankDigits() {
      for(let i in this.accountStore.banks) {
        if(this.accountStore.banks[i].code === this.bankCode) {
          this.digits = this.accountStore.banks[i].digits
        }
      }
      if(!this.bankCode || this.disabled) {
        this.digits = ''
        this.sum = 0
        this.message = '은행을 선택 해주세요'
      }
      else {
        let sum = 0
        for (let i in this.digits) {
          sum += (this.digits[i])
        }
        this.sum = sum
        this.message = `계좌번호 ${this.sum}자리 (${this.digits})`
      }
      this.$emit('getDigits', this.digits)
    }
  }
}
</script>

<style lang="scss" scoped>
.container_account_add {
  width: 85%;
  height: 50vh;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: #faebd7;
    .wrong_message {
      width: 100%;
      color: red;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .correct_message {
      width: 100%;
      color: #08a108;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
    .wrong_message_sign_no {
      width: 100%;
      color: red;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
    }
    .wrong_message_sign_ok {
      width: 100%;
      color: #08a108;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 15px;
    }
  .bank, .account_number, 
  .phone_number {
    width: 85%;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 3%;
    margin-left: 20px;
    input, select {
      height: 24px;
      border-radius: 4px;
      border: solid 1px #e1dfdf;
      width: 250px;
    }
  } .sign {
    width: 85%;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 3%;
    margin-left: 20px;
    input {
      width: 35px;
      height: 20px;
    }
  }
}
</style>
