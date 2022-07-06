import { defineStore } from 'pinia'
import axios from 'axios'

const adminURL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products'
const headers = {
  'content-type': 'application/json',
  'apikey': 'FcKdtJs202204',
  'username': 'KDT2_team6',
  'masterKey': 'true'
}

export const useAdminStore = defineStore('admin', {
  state: () => {
    return {
      products: [],
      product: {},
      done: false
    }
  },
  getters: {

  },
  actions: {
    async AllReadProduct () {
      const { data: products } = await axios ({
        url: adminURL,
        method: 'GET',
        headers
      })
      console.log(products)
      this.products = products
    },
  }
})
