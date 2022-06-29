<template>
  <div class="__container">
    <div class="LNB">
      <nav>
        <ul>
          <li>모든 제품 조회</li>
          <li>전체 판매 내역</li>
          <li>판매 상태</li>
          <li>조회</li>
          <li>추가</li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'

export default {
  ...mapStores(useAdminStore),
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

.__container {
  display: flex;
  flex-direction: row;
  .LNB {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    nav {
      display: flex;
      ul {
        flex-grow: 1;
        li {
          margin-bottom: 30px;
        }
      }
    }
  }
}
</style>
