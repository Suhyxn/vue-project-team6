<template>
  <ul class="item-list">
    <li
      v-for="(item,index) in 20"
      :key="index"
      class="item">
      <div class="sumnail">
        이미지 영역
      </div>
      <div class="info">
        <p class="title">
          이름: 검은고양이
        </p> 
        <p class="price">
          가격: 0000
        </p>
      </div>
      <div class="btns">
        <button 
          class="btn"
          @click="handler(item.id)">
          구매하기
        </button>
        <button class="btn">
          상세페이지
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import { mapStores } from 'pinia'
import {useClientStore} from '~/store/client'
export default {
  computed:{
    ...mapStores([useClientStore])
  },
  methods:{
    handler(id){
      this.clientStore.modalHandler()
      this.clientStore.singleProductId = id
      console.log(this.clientStore.singleProductId)
    }
  }
}
</script>

<style lang="scss" scoped>
  .item-list{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item{
      width:170px;
      height:200px;
      background:red;
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
    
     .sumnail{
      width: 85%;
      height: 80px;
      background: blue;
      margin: 10px;
      box-sizing: border-box;
     }
     .info{
      margin: 10px;
      .title{
        margin-bottom: 5px;
      }
     }
     .btns{
      display: flex;
      
      .btn{
        display: inline-block;
        padding:5px 5px;
        box-sizing: border-box;
        outline: none;
        border:none;
        border-radius: 8px;
        background: #000;
        color: #fff;
        &:first-child{
        margin: 0 3px;    
        }
        &:hover{
          background:green;
        }
      }
     }
    }
  }
</style>
