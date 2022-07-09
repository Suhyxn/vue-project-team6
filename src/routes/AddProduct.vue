<template>
  <input
    v-model="title"
    placeholder="title"
    type="text" />
  <input
    v-model="description"
    placeholder="description"    
    type="text" />
  <input
    v-model="price"
    placeholder="price"
    type="text" />
  <input
    v-model="tags"
    placeholder="tags"
    type="text" />
  <input
    type="file"
    placeholder="file"
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
  methods: {
    async AddProduct() {
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'KDT2_team6' ,
          'masterKey': 'true'
        },
        body: JSON.stringify({
          title: this.title,
          price: this.price,
          description: this.description,
          tags: this.tags,
          thumbnailBase64: this.thumbnail
        })
      })
      const product = await res.json()
      console.log(product)
    },
    SelectImage(event) {
      console.log(event)
      const { files } = event.target
      for ( const file of files ) {
        const reader =  new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.thumbnail = e.target.result
        })
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
