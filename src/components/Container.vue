<template>
  <div class="container">
    <div class="menu">
      <select 
        v-model="selected"
        name="category"
        class="select-section"
        @change="test">
        <option :value="0">
          전체보기 
        </option>
        <option :value="1">
          장비
        </option>
        <option :value="2">
          소비
        </option>
        <option :value="3">
          펫
        </option>
      </select>
    </div>

    <div class="search">
      <input
        placeholder="제품을 검색하세요!"
        class="search-bar" />
      <span class="material-icons">
        search
      </span>
    </div>

    <div class="category-btns">
      <button
        :class="{active: selected === 0}"
        class="btn"
        @click="selected=0">
        전체보기
      </button>
      <button
        :class="{ active: selected === 1}"
        class="btn"
        @click="selected=1">
        장비
      </button>
      <button
        :class="{ active: selected === 2 }"
        class="btn"
        @click="selected=2">
        소비
      </button>
      <button
        :class="{ active: selected === 3 }"
        class="btn"
        @click="selected=3">
        펫
      </button>
    </div>

    <div class="item-box">
      <EveryItem v-if="selected === 0" />
      <Equipment v-else-if="selected === 1" />
      <Consumption v-else-if="selected === 2" />
      <Pet v-else-if="selected === 3" />
    </div>
  </div>
</template>

<script>
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
  data(){
    return{
      selected:0
    } 
  },
  mounted(){
  },
  methods:{
    test(e){
      console.log(e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped> 
.container{
  width: 80vw;
  height: 80vh;
  background: #fff;
  opacity:.8;
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
    width:65vw;
    height:60vh;
    background: #808080;
    overflow-y:scroll;
    position: absolute;
    top: 80px;
    left:150px;
    border-radius: 8px;
  }
}
</style>
