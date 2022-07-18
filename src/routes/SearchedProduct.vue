<template>
  <p 
    v-if="clientStore.searchItem.length===0"
    class="none-text">
    검색된 제품이없습니다!
  </p>
  <ul class="item-list">
    <li
      v-for="item in clientStore.searchItem"
      :key="item.id"
      class="item">
      <div 
        class="sumnail"
        :style="{backgroundImage:`url(${item.thumbnail})`}">
      </div>
      <div class="info">
        <p class="title">
          제품: {{ item.title }}
        </p> 
        <p class="price">
          가격: {{ item.price }}
        </p>
      </div>
      <div class="btns">
        <button 
          class="btn"
          @click="handler({
            id:item.id,
            price:item.price
          });">
          구매하기 
        </button>
      
        <button
          class="btn"
          @click="$router.push(`/store/singleproductdetail/${item.id}`)">
          상세페이지
        </button>
      </div>
    </li>
  </ul>
</template>


<script>
import { mapStores } from 'pinia'
import {useClientStore} from '~/store/client'
import { useAccountStore } from '../store/account'
export default {
  computed:{
    ...mapStores([useClientStore,useAccountStore])
  },

  created(){
   console.log( this.clientStore.searchItem )
  },
  methods: {
    handler(payload){
        if(!sessionStorage.getItem('token')){
          alert('제품구매는 로그인을 해야 할 수 있습니다!')
          this.$router.push('/signin')
          return 
        }
      this.clientStore.singleProductData = payload
      this.accountStore.isShow = !this.accountStore.isShow
    }
  },
  
}
</script>

<style lang="scss" scoped>

  .none-text{
    font-size: 40px;
    font-weight: 700;
    color: rgba($color: #808080, $alpha: .6);
    text-align: center;
    margin-top: 200px;
  }
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
      font-weight: 700;
      .title{
        margin-bottom: 10px;
        height: 32px;
      }
      .price{
        margin-bottom: 10px;
      }
     }
     .btns{
      display: flex;
      justify-content:space-around;
      align-items: center;
      
      .btn{
        display: inline-block;
        padding:5px 10px;
        box-sizing: border-box;
        outline: none;
        border:none;
        border-radius: 8px;
        background: #000;
        color: #fff;
        font-size:12px;
        &:hover{
          background:green;
        }
        
      }
     }
    }
  }
</style>
