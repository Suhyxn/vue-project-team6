<template>
  <div class="category-btns">
    <routerLink 
      to="everyitem"
      :class="{active: clientStore.selected === 'everyItem'}"
      class="btn"
      @click="clientStore.selected = 'everyItem'">
      전체보기
    </routerLink>
    <routerLink 
      to="equipment"
      :class="{ active: clientStore.selected === 'equipment'}"
      class="btn"
      @click="clientStore.selected='equipment'">
      장비
    </routerLink>
    <routerLink 
      to="consumption"
      :class="{ active: clientStore.selected === 'consumption' }"
      class="btn"
      @click="clientStore.selected = 'consumption'">
      소비
    </routerLink>
    <routerLink 
      to="pet"
      :class="{ active: clientStore.selected === 'pet' }"
      class="btn"
      @click="clientStore.selected = 'pet'">
      펫
    </routerLink>
  </div>
</template>

<script>
import {mapStores} from 'pinia'
import { useClientStore } from '~/store/client'
export default {
  computed:{
    ...mapStores([useClientStore])
  },

}
</script>

<style lang="scss" scoped>
 .category-btns{
      height:400px ;
      width:80px;
      display: flex;
      flex-direction:column;
      justify-content: space-around;
      .btn{
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px ;
        text-decoration: none;
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
</style>
