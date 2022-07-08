<template>
  <ul class="history-list">
    <li
      v-for="history in adminStore.histories"
      :key="history.id"
      class="history-item"
      :productId="history.id">
      <div>
        {{ history.detailId }}
        {{ history.user }}
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
