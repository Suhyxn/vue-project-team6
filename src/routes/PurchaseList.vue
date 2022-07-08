<template>
  <div
    v-for="(item,index) in 20"
    :key="index"
    class="test">
    <div class="img"></div>
    <div class="title">
    </div>
  </div>
</template>

<script>
import {useClientStore} from '~/store/client'
import { mapStores } from 'pinia'
export default {
  computed:{
    ...mapStores([useClientStore])
  },
  
  created(){
  
  },
  methods:{

  },
}
</script>

<style lang="scss" scoped>
  .test{
    width: 100%;
    height: 150px;
    border: 10px solid red;
    margin: 5px 0;
    box-sizing: border-box;
    display: flex;
    .img{
      width:25%;
      height: 100%;
      border-right:3px solid blue;
      box-sizing: border-box;
      background: black;
    }
    .title{
      width: 80%;
      height:100%;
      background:green;
    }
  }
</style>
