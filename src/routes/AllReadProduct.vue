<template>
  <AllReadProductDetail />
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'
import AllReadProductDetail from '../components/AllReadProductDetail.vue'

export default {
  components: {
    AllReadProductDetail
},
  computed: {
    ...mapStores(useAdminStore)
  }
}

</script>
