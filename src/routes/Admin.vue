<template>
  <div class="background-image">
    <div class="square">
      <div class="container">
        <AdminLNB />
        <div class="content">
          <RouterView />
        </div>
        <!-- <div class="content">
          <button @click="AllReadProduct">
            조회?
          </button>
          <input
            v-model="title"
            type="text" />
          <input
            v-model="description"
            type="text" />
          <input
            v-model="price"
            type="text" />
          <input
            v-model="tags"
            type="text" />
          <input
            type="file"
            @change="SelectImage" />
          <button @click="AddProduct">
            추가
          </button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'
import AdminLNB from '../components/AdminLNB.vue'

export default {
  components: {
    AdminLNB
  },
  data() {
    return {
      title: '',
      price: '',
      description: '',
      tags: '',
      thumbnail: ''
    }
  },
  computed: {
    ...mapStores(useAdminStore)
  },
  methods: {
    async AllReadProduct () {
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/products ', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'KDT2_team6' ,
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
          'username': 'KDT2_team6' ,
          'masterKey': 'true'
        },
        body: JSON.stringify({
          title: this.title,
          price: this.price,
          description: this.description,
          tags: this.tags,
          thumbnailBase64: this.thumbnail
        })
      })
      const product = await res.json()
      console.log(product)
    },
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
    }
  }
}
</script>

<style scoped lang="scss">

.background-image {
  position: relative;
  height: 100%;
  background-position-y: 80%;
  background-repeat : no-repeat;
  background-size : cover;
  background-image: url('../backgroundImg/Main.png');
  .square {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 80px;
    .container {
      position:relative;
      display: flex;
      background-color: white;
      width: 1300px;
      height: 550px;
      opacity: .8;
      align-items: center;
      .content {
        width: 1000px;
        display: flex;
        box-sizing: border-box;
      }
    }
  }
}


</style>
