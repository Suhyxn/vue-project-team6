<template>
  <ul class="product-list">
    <li
      v-for="product in adminStore.products"
      :key="product.id"
      class="product-item"
      :productId="product.id">
      <div
        class="product-image"
        :style="{ backgroundImage: `url(${product.thumbnail})` }">
        .
      </div>
      <div class="product-title">
        {{ product.title }}
      </div>
    </li>
  </ul>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '../store/admin'

export default {
  components: {
  },
  computed: {
    ...mapStores(useAdminStore)
  },
  created() {
    this.adminStore.allReadProduct()
  }
}

</script>

<style scoped lang="scss">
.product-list {
  width: 100%;
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
    width: 16%;
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
</style>
