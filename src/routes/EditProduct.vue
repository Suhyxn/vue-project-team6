<template>
  <div class="relative">
    <div>
      정보를 볼 제품을 클릭하세요!
    </div>

    <ul class="product-list">
      <li
        v-for="product in adminStore.products"
        :key="product.id"
        class="product-item"
        :productId="product.id">
        <div
          class="product-image"
          :style="{ backgroundImage: `url(${product.thumbnail})` }"
          @click="clickDetail(`${product.id}`)">
          .
        </div>
        <div class="product-title">
          {{ product.id }}
        </div>
      </li>
    </ul>
  </div>

  <!-- <div>
    <div
      ref="title"
      contenteditable
      @blur="updateProduct('title')">
      {{ adminStore.product.title }}
    </div>
    <div
      ref="price"
      contenteditable
      @blur="updateProduct('price')">
      {{ adminStore.product.price }}
    </div>
    <div
      ref="description"
      contenteditable
      @blur="updateProduct('description')">
      {{ adminStore.product.description }}
    </div>
    <div
      ref="tags"
      contenteditable
      @blur="updateProduct('tags')">
      {{ adminStore.product.tags }}
    </div>
    <div>{{ adminStore.product.thumbnail }}</div>
  </div> -->

  <div>
    <div>{{ adminStore.product.title }}</div>
    <div>{{ adminStore.product.price }}</div>
    <div>{{ adminStore.product.description }}</div>
    <div>{{ adminStore.product.tags }}</div>

    <input
      v-model="title"
      type="text"
      placeholder="title" />
    <input
      v-model="price"
      type="text" 
      placeholder="price" />
    <input
      v-model="description"
      type="text" 
      placeholder="description" />
    <input
      v-model="tags[0]"
      type="text" 
      placeholder="tags ( 장비, 소비, 펫 )" />
    <input
      v-model="tags[1]"
      type="text" 
      placeholder="tags ( anything )" />
    <input
      v-model="id"
      type="text" 
      placeholder="id" />
    <input type="file" />
    <button
      @click="updateProduct({
        title, price, description, tags, id
      })">
      test
    </button>
    <!-- <button @click="updateProduct({title, content, description, tags},id)">
      수정중
    </button> -->
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '../store/admin'

export default {
  data() {
    return {
      products: [],
      product: {},
      title: '',
      price: '',
      description: '',
      tags: '',
      id: ''
    }
  },
  computed: {
    ...mapStores(useAdminStore)
  },
  created() {
  this.adminStore.allReadProduct()
  },
  methods: {
    clickDetail(productId) {
      this.adminStore.oneReadProduct(productId)
    },
    updateProduct(item) {
      this.adminStore.editProduct(item)
    }
    // updateProduct( type: 'title' || 'content' || '') {

    //   if (type === 'title' && title === this.workspaceStore.workspace.title) return
    //   if (type === 'content' && content === this.workspaceStore.workspace.content) return
  }
}
</script>

<style lang="scss" scoped>
.relative {
  position: relative;
  .product-list {
  width: 40%;
  height: 350px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  .product-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 15px;
    width: 60%;
    .product-image {
      width: 80px;
      height: 80px;
      background-repeat: no-repeat;
      background-size: contain
    }
    .product-title {
      padding-top: 10px;
      height: 20px;
      font-weight: bold;
    }
  }
}
}
</style>
