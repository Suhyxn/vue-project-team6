<template>
  <div class="background-img">
    <div v-if="routerView">
      <div class="welcome">
        <h2>{{ userInfo?.displayName }}님</h2>
        MapleStory Market에 오신 것을 환영합니다!
      </div>
      <div class="select_container">
        <div class="user_in">
          <RouterLink
            to="/sign/signin"
            class="a"
            @click="routerRink">
            로그인
          </routerlink>
        </div>
        <div class="search">
          <router-link
            to="/sign/signup"
            class="move-btn"
            @click="routerRink">
            회원가입
          </router-link>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { useUserStore } from '~/store/user'

export default {
  data() {
    return {
      routerView: true
    }
  },
  computed: {
    ...mapState(useUserStore, ['userInfo'])
  },
  methods: {
    routerRink() {
      this.routerView = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .background-img {
    position: relative;
    height: 100%;
    background-position-y: 80%;
    background-repeat : no-repeat;
    background-size : cover;
    background-image: url('../assets/Main.png');
    .welcome {
      padding-top: 30px;
      font-size: 24px;
      font-weight: 700;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      h2 {
        margin-bottom: 10px;
      }
    }
    .select_container {
      padding-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .user_in, .search {
        width: 320px;
        height: 320px;
        background-color: white;
        border-radius: 20px;
        cursor: pointer;
        font-size: 24px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0.8;
      }
      .user_in {
        margin-right: 5%;
      }
      .search {
        margin-left: 5%;
      .move-btn{
          text-decoration: none;
          color: #000;
          &:hover{
            color:rgba(0,0,0,.5)
          }
        }
      }
      .material-icons {
        font-size: 30px;
        margin-top: 5px;
      }
    }
  }
  .a {
    color: #000;
    text-decoration: none;
  }
</style>
