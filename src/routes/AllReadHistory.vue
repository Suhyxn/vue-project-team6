<template>
  <AllReadHistoryDetail />
</template>

<script>
import { mapStores } from 'pinia'
import { useAdminStore } from '~/store/admin'
import AllReadHistoryDetail from '../components/AllReadHistoryDetail.vue'

export default {
  components: {
    AllReadHistoryDetail
},
  computed: {
    ...mapStores(useAdminStore)
  }
}

</script>


<!-- <script>
import { mapStores } from 'pinia'
import { useAdminStore } from '../store/admin'

export default {
  components: {
  },
  computed: {
    ...mapStores(useAdminStore)
  },
  created() {
    this.adminStore.all()
  }
}
</script> -->

<!-- <style  lang="scss" scoped>
ul {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  overflow-y: scroll;
  li {
    display: flex;
    align-items: center;
    .historyImage {
      width: 40px;
      height: 40px;
      background-repeat: no-repeat;
}
  }
}

</style> -->
