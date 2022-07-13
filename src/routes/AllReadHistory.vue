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
        .
      </div>
      <div>
        [{{ history.product.tags }}]
      </div>
      <div>
        {{ history.product.title }}
      </div>
      <div>
        &nbsp; 구매자:{{ history.user.displayName }}
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
  height: 400px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: scroll;
  li {
    display: flex;
    align-items: center;
    .historyImage {
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
}
  }
}

</style>
