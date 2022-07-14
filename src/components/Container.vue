<template>
  <div class="container">
    <div class="menu">
      <select 
        v-model="clientStore.selected"
        name="category"
        class="select-section">
        <option :value="'everyItem'">
          전체보기 
        </option>
        <option :value="'equipment'">
          장비
        </option>
        <option :value="'consumption'">
          소비
        </option>
        <option :value="'pet'">
          펫
        </option>
      </select>
    </div>

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

    <div class="category-btns">
      <button
        :class="{active: clientStore.selected === 'everyItem'}"
        class="btn"
        @click="clientStore.selected = 'everyItem'">
        전체보기
      </button>
      <button
        :class="{ active: clientStore.selected === 'equipment'}"
        class="btn"
        @click="clientStore.selected='equipment'">
        장비
      </button>
      <button
        :class="{ active: clientStore.selected === 'consumption' }"
        class="btn"
        @click="clientStore.selected = 'consumption'">
        소비
      </button>
      <button
        :class="{ active: clientStore.selected === 'pet' }"
        class="btn"
        @click="clientStore.selected = 'pet'">
        펫
      </button>
    </div>

    <div class="item-box">
      <EveryItem v-if="clientStore.selected === 'everyItem'" />
      <Equipment v-else-if="clientStore.selected === 'equipment'" />
      <Consumption v-else-if="clientStore.selected === 'consumption'" />
      <Pet v-else-if="clientStore.selected === 'pet'" />
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import {useClientStore} from '~/store/client'
import { useAccountStore } from '../store/account'
import EveryItem from './EveryItem.vue'
import Equipment from './Equipment.vue'
import Pet from './Pet.vue'
import Consumption from './Consumption.vue'
export default {
  components:{
    EveryItem,
    Equipment,
    Consumption,
    Pet,
  },
  computed:{
    ...mapStores([useClientStore,useAccountStore])
  },
  async created(){
    await  this.clientStore.AllReadProduct()
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
    this.clientStore.searchItem.length === 0 ? alert('해당 상품을 찾을 수 없습니다!') : this.$router.push(`/store/singleproductdetail/${this.clientStore.searchItem[0].id}`)
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
  .category-btns{
      height:400px ;
      width:80px;
      display: flex;
      flex-direction:column;
      justify-content: space-around;
      position: absolute;
      top: 60px;
      left: 30px;
      .btn{
        display: inline-block;
        outline: none;
        background: royalblue;
        border-radius: 8px;
        border: none;
        color: #fff;
        &:hover{
          background:rgba(0,0,0,.8);
        }
        &.active {
          background: red;
        }
      }
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
