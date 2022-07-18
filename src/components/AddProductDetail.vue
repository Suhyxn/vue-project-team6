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
    type="number" />
  <input
    v-model="tags[0]"
    placeholder="tags ( 장비, 소비, 펫 )"
    type="text" />
  <input
    v-model="tags[1]"
    placeholder="tags2 ( anything )"
    type="text" />
  <input
    type="file"
    placeholder="file"
    @change="SelectImage" />
  <button
    @click="AddProd({
      title, description, price, tags, thumbnailBase64
    })">
    추가
  </button>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'

export default {
  data() {
    return {
      product: {},
      title: '',
      price: '',
      description: '',
      tags: [],
      thumbnailBase64: ''
    }
  },
  computed: {
    ...mapStores(useAdminStore)
  },
  methods: {
    AddProd(item) {
      console.log(item)
      this.adminStore.AddProduct(item)
    },
    UpImage(event) {
      console.log(event)
      this.adminStore.SelectImage(event)
    },
    // async AddProduct() {
    //   const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ', {
    //     method: 'POST',
    //     headers: {
    //       'content-type': 'application/json',
    //       'apikey': 'FcKdtJs202204',
    //       'username': 'KDT2_team6' ,
    //       'masterKey': 'true'
    //     },
    //     body: JSON.stringify({
    //       title: this.title,
    //       price: this.price,
    //       description: this.description,
    //       tags: this.tags, 
    //       thumbnailBase64: this.thumbnail
    //     })
    //   })
    //   const product = await res.json()
    //   console.log(product)
    //   console.log(product.tags)
    // },
    SelectImage(event) {
      console.log(event)
      const { files } = event.target
      for ( const file of files ) {
        const reader =  new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.thumbnailBase64 = e.target.result
        })
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
