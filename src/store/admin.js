import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state() {
    return {
      Product: [],
    }
  },
  getters: {},
  actions: {
    hello() {
      console.log('hello')
    },
    async ReadProductAdmin() {
      console.log('hello')
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ',
        {
          method: 'GET',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'Team6',
            masterKey: 'true',
          },
        }
      )
      const master = await res.json()
      console.log(master)
    },
  },
})
