<template>
  EditProduct
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'

export default {
  data() {
    return {
      title: '',
      price: '',
      description: '',
      tags: '',
      thumbnail: '',
      isSoldOut: ''
    }
  },
  computed: {
    ...mapStores(useAdminStore)
  },
  
}

</script>

<style lang="scss" scoped>

</style>
