<template>
  <div
    v-if="!singlePurchasedItemPageData"
    class="item-box">
    <div
      class="item-image"
      :style="{backgroundImage:`url(${clientStore.singlePurchasedItemPageData.product.thumbnail})`}">
    </div>
    <div class="item-data">
      <div class="bank-name">
        은행명: {{ clientStore.singlePurchasedItemPageData.account.bankName }}
      </div>
      <div class="bank-number">
        계좌번호: {{ clientStore.singlePurchasedItemPageData.account.accountNumber }}
      </div>
      <div class="item-title">
        제품명: {{ clientStore.singlePurchasedItemPageData.product.title }}
      </div>
      <div class="item-price">
        제품가격: {{ clientStore.singlePurchasedItemPageData.product.price }}
      </div>
      <div class="item-description">
        제품설명: {{ clientStore.singlePurchasedItemPageData.product.description }}
      </div>
      <div class="actions">
        <button 
          v-if="!clientStore.singlePurchasedItemPageData.done"
          class="btn"
          @click="purchaseDecision($route.params.id)">
          구매확정
        </button>        
        <button 
          v-if="!clientStore.singlePurchasedItemPageData.done"
          class="btn"
          @click="purchaseCancel($route.params.id)">
          구매취소
        </button>
        <button 
          class="btn"
          @click="$router.push('/mypage/purchaselist')">
          전체구매 내역
        </button>           
        <button 
          class="btn"
          @click="$router.push('/store/everyitem')">
          상점으로 이동
        </button>        
      </div>
    </div>
  </div>
</template>

<script>
import {useClientStore} from '~/store/client'
import {mapStores} from 'pinia'

export default {
computed:{
  ...mapStores([useClientStore]),
  },

async created(){
        await this.clientStore.singlePurchasedList({detailId:this.$route.params.id})
        // await this.clientStore.singlePurchasedItemPageData
        await console.log(this.$route.params.id)
        await console.log(this.clientStore.singlePurchasedItemPageData)
  },

  methods:{
  async purchaseDecision(detailId){
      await this.clientStore.purchaseDecision({detailId})
      alert('구매확정이 완료되었습니다 구매확정 이후에는 구매 취소를 할 수 없습니다!')
      this.$router.push('/store/everyitem')
    },
    async purchaseCancel(detailId){
      await this.clientStore.purchaseCancel({detailId})
      alert('구매취소가 완료되었습니다! 제품금액만큼 계좌에 환불처리됩니다!')
      this.$router.push('/mypage/accountlist')
    },
  }
}
</script>

<style lang="scss" scoped>
.item-box{
  padding-top:10px;
  margin: auto;
  margin-top: 4%;
  width: 95%;
  height: 90%;
  background-color: #faebd7;
  border-radius: 10px;
  .item-image{
    width: 110px;
    height: 100px;
    background-size: cover;
    background-repeat: no-repeat;
    background-color: #808080;
    background-position-y:20%;  
    border-radius: 5px;
    margin: auto;
  }
  .item-data{
    div{
      margin: 20px 10px 20px 10px;
      font-size: 20px;
      font-weight: 700;
    }
    .actions{
      display: flex;
      justify-content: center;
      align-items: center;
      .btn{
        margin: 0 8px;
        outline: none;
        border: none;
        border-radius: 8px;
        background-color: orange;
        color: #fff;
        cursor: pointer;
        padding: 5px 20px;
        &:hover{
          background-color: rgba(0,0,0,.7);
        }
      }
    }
  }
}
  
</style>
