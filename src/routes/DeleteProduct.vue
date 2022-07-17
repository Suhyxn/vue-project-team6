<template>
  <DeleteProductDetail />
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'
import DeleteProductDetail from '../components/DeleteProductDetail.vue'

export default {
  components: {
    DeleteProductDetail
  },
  computed: {
    ...mapStores(useAdminStore)
    
  },
  created() {
    this.adminStore.allReadProduct()
  }
}
</script>
