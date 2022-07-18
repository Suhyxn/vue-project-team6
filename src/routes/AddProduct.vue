<template>
  <AddProductDetail />
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'
import AddProductDetail from '../components/AddProductDetail.vue'

export default {
  components: {
    AddProductDetail
  },
  computed: {
    ...mapStores(useAdminStore)
  }
}

</script>
