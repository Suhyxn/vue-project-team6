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
      thumbnail: '',
      thumbnailBase64: ''
    }
  },
  getters: {},
  actions: {
    async AddProduct(addP) {
      const { title, price, description, tags, thumbnailBase64 } = addP
      await axios({
        url: adminURL,
        method: 'POST',
        headers,
        data: {
          title,
          price,
          description,
          tags,
          thumbnailBase64
        }
      })
    },
    // Base64 Image
    SelectImage(event) {
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
      this.product = product
    },
    async allReadHistory () {
      const { data: histories } = await axios ({
        url: 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/all',
        method: 'GET',
        headers
      })
      this.histories = histories
    },
    async editProduct (editP) {
      const id = editP.id
      const url = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`
      const { data: editproduct } = await axios ({
        url,
        method: 'PUT',
        headers,
        data: ({
          title: editP.title,
          price: editP.price,
          description: editP.description,
          tags: editP.tags
        })
      })
      this.editproduct = editproduct
      this.allReadProduct()
    },
    async deleteProduct (id) {
      const url = `https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/${id}`
      await axios ({
        url,
        method: 'DELETE',
        headers,
        id
      })
    }
  }
})
