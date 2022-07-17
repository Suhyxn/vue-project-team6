<template>
  <div class="container">
    <div class="item-box">
      <div
        class="single-product--img"
        :style="{backgroundImage:`url(${clientStore.singlePageData.thumbnail})`}">
      </div>
     
      
      <div class="single-product--data">
        <div class="single-product--data__title">
          제목: {{ clientStore.singlePageData.title }}      
        </div>
        
        <div class="single-product-data__price">
          가격: {{ clientStore.singlePageData.price }}
        </div>
      
        <div class="single-product-data__description">
          상품설명: {{ clientStore.singlePageData.description }}
        </div>
        
        <div class="actions">
          <button
            class="btn"
            @click="handler(
              {id:clientStore.singlePageData.id,
               price:clientStore.singlePageData.price
              })">
            구매하기
          </button>
          
          <button
            class="btn"    
            @click="$router.push('/store/everyitem')">
            상점으로 이동
          </button>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { useClientStore } from '~/store/client'
import { useAccountStore } from '../store/account'
import { mapStores } from 'pinia'
export default {
  
  computed:{
    ...mapStores([useClientStore,useAccountStore])
  },
  created(){
    this.clientStore.readSingleProduct(this.$route.params.id)
     console.log(this.clientStore.singlePageData)
    //라우트에 params에들어있는 id를 이용해 상세페이지의 id를 
    //readSingleProduct에 전달하여 api 호출
  },
  methods:{
    handler(payload){
        if(!sessionStorage.getItem('token')){
          alert('제품구매는 로그인을 해야 할 수 있습니다!')
          this.$router.push('/signin')
          return 
        }
        this.accountStore.isShow = !this.accountStore.isShow
        this.clientStore.singleProductData = payload      
    }
  }
  
}
</script> 

<style lang="scss" scoped>
@mixin inner{
  margin: 0 auto;
  width: 1320px;
}
  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-position-y: 80%;
    background-repeat : no-repeat;
    background-size : cover;
    background-image: url('../backgroundImg/Store.png');
    
    .item-box{
      width: 80vw;
      height: 80vh;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      .single-product--img{
      width:200px;
      height:200px;
      margin-right: 50px;
      margin-bottom: 125px;
      background: #808080;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 5px;
      border: 12px ridge royalblue;
      box-sizing: border-box;
      }
    
    .single-product--data{
      width:50%;
      height: 80%;
      
     
      div{
        font-size: 25px;
        margin: 70px 30px;
       
      }
      .actions{
        .btn{
          margin-right: 20px;
          outline: none;
          border: none;
          padding: 10px 40px;
          box-sizing: border-box;
          background: orange;
          border-radius: 8px;
          color:#fff;
          &:hover{
            background:rgba(0,0,0,.5);
          }
        }
      }
    }
  } 
}
  
</style>
