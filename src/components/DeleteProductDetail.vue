<template>
  <div>
    <p class="delete_title">
      누르는 즉시 제품이 삭제됩니다!
    </p>
    <ul class="product-list">
      <li
        v-for="product in adminStore.products"
        :key="product.id"
        class="product-item"
        :productId="product.id">
        <div
          class="product-image"
          :style="{ backgroundImage: `url(${product.thumbnail})` }"
          @click="clickDelete(`${product.id}`)">
          .
        </div>
        <div class="product-title">
          {{ product.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapStores(useAdminStore, ['deleteProduct'])
  },
  created() {
    this.adminStore.allReadProduct()
  },
  methods: {
    clickDelete(productId) {
      this.adminStore.deleteProduct(productId)
    }
  }
}
</script>

<style scoped lang="scss">
.delete_title {
  font-size: 22px;
  font-weight: 700;
  color: red;
  margin-left: 45px;
  margin-top: 25px;
}
.product-list {
  width: 100%;
  height: auto;
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
    width: 18%;
    background-color: #faebd7;
    border-radius: 5px;
    .product-image {
      width: 80px;
      height: 80px;
      background-repeat: no-repeat;
      background-size: contain;
      cursor: pointer;
    }
    .product-title {
      width: 100%;
      height: 20px;
      padding-top: 5px;
      border-bottom-right-radius: 5px;
      border-bottom-right-radius: 5px;
      background-color: #edc899;
      font-weight: bold;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
  }
}
</style>

