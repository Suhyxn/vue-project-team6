<template>
  <button @click="AllReadProduct">
    조회
  </button>

  <input
    v-model="title"
    type="text" />
  <input
    v-model="price"
    type="text" />
  <input
    v-model="description"
    type="text" />
  <input
    type="file"
    @change="SelectImage" />
  <button @click="AddProduct">
    추가
  </button>

  {{ title }}
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'

export default {
  ...mapStores(useAdminStore),
  data() {
    return {
      title: '',
      price: '',
      description: '',
      files: ''
    }
  },
  methods: {
    hello() {
      console.log('hello')
    },
    async AllReadProduct () {
      console.log('hello')
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'Team6' ,
          'masterKey': 'true'
        }
      })
      const master = await res.json()
      console.log(master)
    },
    async AddProduct() {
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'Team6' ,
          'masterKey': 'true'
        },
        body: JSON.stringify({
          title: this.title,
          price: this.price,
          description: this.description
        })
      })
      const product = await res.json()
      console.log(product)
    },
    SelectImage(event) {
      const { files } = event.target
      for (const file of files) {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.workspaceStore.updateWorkspace({
            id: this.$route.params.id,
            poster: e.target.result
          })
        })
      }
    }
  }
}

</script>

