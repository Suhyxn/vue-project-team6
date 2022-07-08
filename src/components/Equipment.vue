<template>
  <ul class="item-list">
    <li
      v-for="item in clientStore.getAllProduct"
      :key="item.id"
      class="item">
      <div 
        class="sumnail"
        :style="{backgroundImage:`url(${item.thumbnail})`}">
      </div>
      <div class="info">
        <p class="title">
          이름: {{ item.title }}
        </p> 
        <p class="price">
          가격: {{ item.price }}
        </p>
      </div>
      <div class="btns">
        <button 
          class="btn"
          @click="handler(item.id);">
          구매하기 
        </button>
      
        <router-link
          class="btn btn--move"
          :to="`/store/detail/${item.id}`">
          상세페이지
        </router-link>
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

  methods: {
    handler(id){
      this.clientStore.modalHandler()
      this.clientStore.singleProductId = id
      console.log(this.clientStore.singleProductId)
    }
  },
}
</script>

<style lang="scss" scoped>
  .item-list{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item{
      width:200px;
      height:250px;
      background:red;
      border: ridge 15px #fff;
      border-radius: 8px;
      box-sizing: border-box;
      margin: 10px 0;
      display: flex;
      flex-direction: column;
      
    
     .sumnail{
      width: 60px;
      height: 60px;
      padding: 15px;
      background: #808080;
      background-repeat: no-repeat;
      background-size: cover;
      margin: 10px;
      box-sizing: border-box;
     }
     .info{
      margin: 10px;
      .title{
        margin-bottom: 25px;
      }
     }
     .btns{
      display: flex;
      margin-top:25px;
      .btn{
        display: inline-block;
        padding:5px 10px;
        box-sizing: border-box;
        outline: none;
        border:none;
        border-radius: 8px;
        background: #000;
        color: #fff;
        &:first-child{
        margin: 0 10px;    
        }
        font-size:12px;
        &:hover{
          background:green;
        }
      }
      .btn--move{
        text-decoration: none;
        display:flex;
        align-items: center;
      }
     }
    }
  }
</style>
