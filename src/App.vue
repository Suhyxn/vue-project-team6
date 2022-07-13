<template>
  <div class="container">
    <div class="header">
      <TheHeader />
    </div>
    <div class="main">
      <RouterView />
    </div>
    <div class="footer">
      <TheFooter />
    </div>
    <transition name="modal-animation">
      <Modal
        v-if="clientStore.isShow" 
        class="modal" />
    </transition>
    <transition name="modal-animation">
      <SignModal v-if="userStore.signModal" />
    </transition>
    <transition name="modal-animation">
      <UserInfoModal v-if="userStore.userModal" />
    </transition>
  </div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import Modal from '~/components/Modal.vue'
import SignModal from '~/components/SignModal.vue'
import UserInfoModal from '~/components/UserInfoModal.vue'
import { mapStores } from 'pinia'
import { useClientStore } from '~/store/client'
import { useUserStore } from '~/store/user'

export default {
  components: {
    TheHeader,
    TheFooter,
    Modal,
    SignModal,
    UserInfoModal
  },
  computed:{
    ...mapStores([useClientStore, useUserStore])
  },
  created() {
    this.userStore.changeUserName()
  }
}
</script>

<style lang="scss" scoped>

.container {
  height: 100vh;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  .header {
    height: 64px;
    display: flex;
    align-items: center;
  }
  .main {
    flex-grow: 1;
  }
  .footer {
    height: 35px;
  }
}

.modal{
 transition: .4s;

}

.modal-animation-enter-from{
  opacity: 0;
 
}
.modal-animation-enter-to{
   opacity: 1;
 
}
.modal-animation-leave-active{
  opacity:0;
 
}

</style>
