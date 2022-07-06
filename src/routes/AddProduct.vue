<template>
  <input
    v-model="title"
    type="text" />
  <input
    v-model="description"
    type="text" />
  <input
    v-model="price"
    type="text" />
  <input
    v-model="tags"
    type="text" />
  <input
    type="file"
    @change="SelectImage" />
  <button @click="AddProduct">
    추가
  </button>
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
      thumbnail: ''
    }
  },
  computed: {
    ...mapStores(useAdminStore)
  },
}

</script>

<style lang="scss" scoped>

</style>
