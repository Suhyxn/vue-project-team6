<template>
  <div class="container">
    <div class="search">
      <input
        ref="inputEl"
        placeholder="제품을 검색하세요!"
        class="search-bar"
        @input="clientStore.searchValue = $event.target.value"
        @keydown.enter="search" />
      <span 
        class="material-icons"
        @click="search">
        search
      </span>
    </div>

    <StoreLNB class="store-btn" />

    <div class="item-box">
      <routerView />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import {useClientStore} from '~/store/client'
import { useAccountStore } from '~/store/account'
import { useAdminStore } from '~/store/admin'

import StoreLNB from './StoreLNB.vue'
export default {
  components:{
    StoreLNB
  },
  computed:{
    ...mapStores([useAdminStore,useClientStore,useAccountStore])
  },
  async created(){
    await this.adminStore.allReadProduct()
    await this.accountStore.readAccountList()
  },
  mounted(){
      this.$refs.inputEl.focus()
  },
  methods:{
   async search(){
      await this.clientStore.searchProduct({
        text:this.clientStore.searchValue,
      })
    
    this.clientStore.searchItem.length === 0 ? alert('해당 상품을 찾을 수 없습니다!') : this.$router.replace('/store/searchedproduct')
    this.$refs.inputEl.value = ''
    },
  },
}
</script>

<style lang="scss" scoped> 
.container{
  width: 80vw;
  height: 80vh;
  background: #fff;
  position: relative;
  border-radius: 8px;


  .menu{
    position: absolute;
    right:220px;
    top: 30px;
    .select-section{
      width: 80px;
      height: 30px;
      text-align: center;
      background: #808080;
      font-weight: 700;
      border-radius: 8px;
      border: none;
      outline: none; 
    }
  }
  .search{
    position: absolute;
    right:0px;
    top: 25px;
    .search-bar{
      outline: none;
      border-radius: 8px;
      border: 1px solid ;
      padding: 2px 5px;
      box-sizing: border-box;
    }
  }
  
  .store-btn{
    position: absolute;
     top: 80px;
      left: 50px;
  }
    .item-box{
    width:60vw;
    height:60vh;
    background-image: url('../backgroundImg/itembox.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y:65%;
    overflow-y:scroll;
    position: absolute;
    top: 80px;
    left:200px;
    border-radius: 8px;
  }
}
</style>
