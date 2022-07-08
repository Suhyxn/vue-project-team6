<template>
  <div class="background-img">
    <div class="container">
      <div class="my_page">
        <p>My Page</p>
        <div class="menu">
          <MyPageLNB />
          <div class="menu_ui">
            <p>
              <img
                :src="profileImg"
                alt="profileImg" />
            </p>
            <p>{{ displayName }}</p>
            <p>{{ email }}</p>
            <p>
              <RouterLink to="/editUserInfo">
                <button>
                  내정보 수정하기
                </button>
              </RouterLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validateTokenUser } from '~/core'
import MyPageLNB from '~/components/MyPageLNB.vue'

export default {
  components: {
    MyPageLNB,
  },
  data() {
    return {
      email: '',
      displayName: '',
      profileImg: ''
    }
  },
  computed: {
    
  },
  mounted() {
    this.userRender()
  },
  methods: {
    async userRender() {
      const user = await validateTokenUser()
      console.log(user)
      this.email = user.email
      this.displayName = user.displayName
      this.profileImg = user.profileImg
    }
  }
}
</script>

<style lang="scss" scoped>
  .background-img {
    position: relative;
    height: 100%;
    background-position-y: 92%;
    background-repeat : no-repeat;
    background-size : cover;
    background-image: url('../backgroundImg/MyPage.png');
    .container {
      padding-top: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      .my_page {
        width: 60%;
        height: 75vh;
        background: white;
        border-radius: 20px;
        opacity: 0.8;
        p {
          padding: 20px 0;
          font-size: 24px;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .menu {
          display: flex;
          justify-content: center;
          align-items: center;
          .menu_list {
            width: 20%;
            height: 60vh;
            background-color: #F999B7;
            border-radius: 20px;
            margin-right: 5%;
            .account {
              padding-top: 20px;
              text-align: center;
              font-size: 18px;
              font-weight: 700;
            }
          }
          .menu_ui {
            width: 60%;
            height: 60vh;
            background-color: #F9C5D5;
            border-radius: 20px;
            img {
              width: 50px;
              height: 50px;
            }
            button {
              margin: auto;
              border: none;
              background-color: #845FA7;
              border-radius: 50px;
              width: 400px;
              height: 70px;
              cursor: pointer;
              color: #fff;
              font-size: 28px;
              &:hover {
                opacity: .9;
              }
            }
          }
        }
      }
    }
  }
</style>
