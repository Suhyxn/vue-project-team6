<template>
  <EditProductDetail />
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'
import EditProductDetail from '../components/EditProductDetail.vue'

export default {
  components: {
    EditProductDetail
},
  computed: {
    ...mapStores(useAdminStore)
  }
}

</script>
