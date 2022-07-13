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
      editproduct: {}
    }
  },
  getters: {},
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
    async oneReadProduct (id) {
      const url = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`
      const { data: product } = await axios ({
        url,
        method: 'GET',
        headers,
        id
      })
      console.log(product)
      this.product = product
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
    async editProduct (editP) {
      const id = editP.id
      const url = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`
      const { data: editproduct } = await axios ({
        url,
        method: 'PUT',
        headers,
        data: JSON.stringify({
          title: editP.title,
          price: editP.price,
          description: editP.description,
          tags: editP.tags
        })
      })
      console.log('editing')
      this.editproduct = editproduct
      this.allReadProduct()
    }
  }
})
