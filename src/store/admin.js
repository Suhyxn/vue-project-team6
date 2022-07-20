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
      console.log(addP)
      const { title, price, description, tags, thumbnailBase64 } = addP
      await axios({
        url: adminURL,
        method: 'POST',
        headers,
        data: {
          title,
          price: Number(price),
          description,
          tags,
          thumbnailBase64
        }
      })
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
      const { title, price, description, tags, thumbnailBase64 } = editP
      const { data: editproduct } = await axios ({
        url,
        method: 'PUT',
        headers,
        data: ({
          title,
          price: Number(price),
          description,
          tags,
          thumbnailBase64
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
