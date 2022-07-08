<template>
  <div class="background">
    <div class="content">
      <div class="text">
        <p>정말 구매하시겠습니까?</p>
      </div>
      <div class="actions">
        <button
          class="btn"
          @click="handler">
          구매
        </button>
        <button 
          class="btn"
          @click="handler">
          취소
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import {useClientStore} from '~/store/client'
import {useAccouontStore} from '~/store/account'
import {useAdminStore} from '~/store/admin'
export default {
  computed:{
    ...mapStores([useClientStore,useAccouontStore,useAdminStore])  
  },
  created(){
    console.log(this.clientStore.singleProductId)
  },
  methods:{
      handler(){
        this.clientStore.productPurchase()
        this.clientStore.modalHandler()
        //추가로직 this.$router.push(<전체 구매 제품목록 컴포넌트 경로>)
        // 구매하기 버튼을 눌렀을때 내가 구매한 제품목록을 확인하게 하기위해서
    },
  },
}
</script>

<style lang="scss" scoped>
$width:450px;
.background{
  width: 100vw;
  height: 100vh;
  background-color:rgba(0,0,0,.5);
  position:fixed;
  display:flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
    margin: 0;
  .content{
    width:$width;
    height:calc($width * 1/3);
    background:#fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
  
    .text{
      background: skyblue;
      width:95%;
      height:100px;
      border-radius: 8px 8px 0 0;
      position: relative;
      p{
        color: #fff;
        font-size: 20px;
        position: absolute;
        top: 50%;
        left: 25%;
      }
    }
    .actions{
      width:95%;
      height:30px;
      background: orange;
      border-radius: 0 0 8px 8px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn{
          margin: 0 8px;
          padding: 0 20px;
          outline: none;
          border: none;
          background: #f05650;
          box-sizing: border-box;
          border-radius: 5px;
          color: #fff;
          &:hover{
            background:rgba(0,0,0,.5)
          }
      }
    }
  }
}
</style>
