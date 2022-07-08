<template>
  <div class="menu_list">
    <button 
      class="account"
      :class="{ active: /^\/mypage\/userinfo$/.test($route.fullPath) }"
      @click="$router.push(`/mypage/userinfo`)">
      내 정보
    </button>
    <button 
      class="account"
      :class="{ active: /^\/mypage\/account.*/.test($route.fullPath) }"
      @click="$router.push(`/mypage/accountlist`)">
      계좌
    </button>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAccountStore } from '~/store/account'
import { useMainStore } from '~/store/main'

export default {
  data() {
    return {
      buttonActive: false
    }
  }, 
  computed: {
    ...mapStores([
      useMainStore,
      useAccountStore
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.menu_list {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: flex-start;
  width: 20%;
  height: 60vh;
  background-color: #F999B7;
  border-radius: 20px;
  margin-right: 5%;
  .account {
    width: 70%;
    height: 10%;
    margin-top: 10%;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    border: solid 2px #c7c7e1;
    border-radius: 5px;
    color: #fff;
    background-color: gray;
    &:hover {
      color: #000;
      background-color: aliceblue;
      border-color: aliceblue;
    }
    &.active {
      color: #000;
      background-color: aliceblue;
      border-color: aliceblue;
    }
  }
}
</style>
