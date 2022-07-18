<template>
  <ul class="history-list">
    <li
      v-for="history in adminStore.histories"
      :key="history.id"
      class="history-item"
      :productId="history.id">
      <div
        class="historyImage"
        :style="{ backgroundImage: `url(${history.product.thumbnail})`}">
      </div>
      <div class="title">
        {{ history.product.title }} 
      </div>
      <div class="tag">
        &nbsp; {{ history.product.tags }}
      </div>
      <div class="user">
        &nbsp; 구매자: {{ history.user.displayName }}
      </div>
    </li>
  </ul>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '../store/admin'

export default {
  components: {
  },
  computed: {
    ...mapStores(useAdminStore)
  },
  created() {
    this.adminStore.allReadHistory()
  }
}
</script>

<style  lang="scss" scoped>
ul {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: scroll;
  li {
    display: flex;
    align-items: center;
    background-color: #faebd7;
    border-radius: 8px;
    margin: 5px;
    .historyImage {
      margin-top: 8px;
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
    }
    .tag {
      color: #F6921D;
      font-weight: 700;
    }
    .title {
      font-weight: 700;
      color: #2d9006;
    }
    .user {
      font-weight: 700;
      color: #08abb4;
    }
  }
}

</style>
