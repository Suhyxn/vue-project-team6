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
      thumbnail: ''
    }
  },
  getters: {},
  actions: {
    async AddProduct(addP) {
      const { data: product } = await axios({
        url: adminURL,
        method: 'POST',
        headers,
        data: JSON.stringify({
          title: addP.title,
          price: addP.price,
          description: addP.description,
          tags: addP.tags, 
          thumbnailBase64: this.thumbnail
        })
      })
      this.product = product
      console.log(product)
      console.log(product.tags)
    },
    // Base64 Image
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
    },
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
      console.log(typeof product.tags)
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
    },
    async deleteProduct (id) {
      const url = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`
      const { data: product } = await axios ({
        url,
        method: 'DELETE',
        headers,
        id
      })
      console.log (product)
    }
  }
})
