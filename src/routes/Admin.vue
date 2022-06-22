<template>
  <button @click="AllReadProduct">
    조회
  </button>
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
    }
  }
}
</script>
