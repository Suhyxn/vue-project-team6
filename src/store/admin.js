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
      histories: [],
      history: {},
      editproduct: {},
      done: false
    }
  },
  getters: {

  },
  actions: {
    async allReadProduct () {
      const { data: products } = await axios ({
        url: adminURL,
        method: 'GET',
        headers
      })
      console.log(products)
      this.products = products
    },
    async allReadHistory () {
      const { data: histories } = await axios ({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all',
        method: 'GET',
        headers
      })
      console.log(histories)
      this.histories = histories
    },
    async editProduct (payload) {
      const { title, price, description, tags, thumbnail, isSoldout } = payload
      const editProduct = await axios ({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/:productId',
        method: 'PUT',
        headers,
        body: {
            title,
            price,
            description,
            tags,
            thumbnail,
            isSoldout
        }
      })
      console.log('hello')
      this.product = editProduct
      this.allReadProduct()
    }
  }
})
