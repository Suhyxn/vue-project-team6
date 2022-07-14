<template>
  <div
    class="background">
    <div class="content">
      <div class="title">
        결제 할 계좌를 선택 해 주세요!
      </div>
      <div class="bank-select">
        <p
          v-if="accountStore.list.accounts.length === 0"
          class="none-title">
          등록된 계좌가 없습니다
        </p>
        <label
          v-for="item in accountStore.list.accounts "
          :key="item.id">
          <input
            type="radio"
            name="account" 
            @click="selectedBankData(item)" />
          <span>은행명: {{ item.bankName }}/</span>
          <span>잔액: {{ item.balance }}/</span>
          <span>계좌번호: {{ item.accountNumber }}</span>
        </label>
      </div>
    </div>
    <div class="actions">
      <button @click="openProductModal">
        확인
      </button>
      <button @click="accountModalHandler">
        취소
      </button>
      <button @click="moveAccount">
        계좌등록
      </button>
    </div>
  </div>
</template>
<script>
import { mapStores } from 'pinia'
import {useClientStore} from '~/store/client'
import {useAccountStore} from '~/store/account'


export default {
  computed:{
    ...mapStores([useClientStore,useAccountStore])  
  },
  created(){
      this.accountStore.readAccountList()
      this.noneAction()
  },
  methods:{
    selectedBankData(data){
      this.accountStore.selectedBankData = data
    },
    openProductModal(){
      if(this.accountStore.selectedBankData === null){
        alert('금액을 지불할 계좌를 선택 해 주세요!')
        return
      }
      this.accountStore.isShow = !this.accountStore.isShow
      this.clientStore.isShow = !this.clientStore.isShow
    },
    accountModalHandler(){
      this.accountStore.isShow = !this.accountStore.isShow
      this.accountStore.selectedBankData = null
    },
    noneAction(){
      if(this.accountStore.list.accounts.length === 0){
        alert('등록된 계좌가 존재하지 않습니다 계좌를 등록해 주세요!')
      }
    },
    moveAccount(){
      this.accountStore.isShow = !this.accountStore.isShow
      this.$router.push('/mypage/accountlist')
    }
  },
}
</script>

<style lang="scss" scoped>
$width:580px;
.background{
  width: 100vw;
  height: 100vh;
  background-color:rgba(0,0,0,.5);
  position:fixed;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
    margin: 0;
  .content{
    width:$width;
    height:calc($width * 1/3);
     background-color: green;
    display: flex;
    flex-direction: column;
    border-radius: 8px 8px 0 0;
    box-sizing: border-box;
    position: relative;

    .title{
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      padding: 10px 0;
    }
    .bank-select{
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    box-sizing: border-box;
    background-color: green;
    height: 150px;
      .none-title{
        margin-top: 50px;
        text-align: center;
        font-size: 25px;
        font-weight: 700;
        color: rgba($color: #000, $alpha: 0.3);
        overflow:hidden;
      }
      label{
      margin: 10px 0;
      span{
        margin-left: 10px;
        color: #fff;
        font-weight: 700;
      }
    }
    }
  }
  .actions{
  width: $width;
  padding: 7px 0;
  background-color: green;
  border-radius:0 0 8px 8px;
  box-sizing: border-box;
  text-align: end;
  button{
    margin: 0 5px;
    padding: 0 30px;
    outline: none;
    background-color:#FFBA46;
    border-radius: 8px;
    border: none;
    &:hover{
      background-color: rgba(0,0,0,.5);
    }
  }
}
}
</style>
