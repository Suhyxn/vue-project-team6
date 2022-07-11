<template>
  <div class="bg">
    <div class="inner">
      <div>
        <img
          src="../BSE_imgs/login.png"
          alt="login" />
        <div class="id">
          <input
            v-model="email"
            placeholder="아이디 (이메일 주소) *필수"
            type="text" />
        </div>
        <div class="pw">
          <input
            v-model="password"
            placeholder="비밀번호 (8자 이상) *필수"
            type="text" />
        </div>
        <div class="name">
          <input
            v-model="displayName"
            placeholder="닉네임 (20자 이하) *필수"
            type="text" />
        </div>
        <div>
          <input
            placeholder="프로필(임시)"
            type="file" 
            @change="selectFile" />
        </div>
        <div class="checkID">
          <RouterLink
            to="/signin"
            class="login">
            로그인
          </RouterLink>
        </div>
        <div>
          <button
            class="check"
            @click="[signUp({
              email,
              password,
              displayName,
              profileImgBase64
            })]">
            가입하기
          </button>
        </div>
        <div class="msg">
          <span v-if="!isSignup">{{ signUpError }}</span>
          <p v-else>
            {{ signUpMsg }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '~/store/user'
import { baseImg } from '~/core'

export default {
  data() {
    return {
      email: '',
      password: '',
      displayName: '',
      profileImgBase64: baseImg
    }
  },
  computed: {
    ...mapState(useUserStore, ['isSignup', 'signUpMsg', 'signUpError'])
  }, 
  methods: {
    ...mapActions(useUserStore, ['signUp', 'reset']),
    selectFile(event) {
      const reader = new FileReader()
      for(const file of event.target.files) {
        console.log(file)
        reader.readAsDataURL(file)
        reader.addEventListener('load', e => {
          this.profileImgBase64 = e.target.result
        })
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.bg {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  background-position-y: 80%;
  background-repeat : no-repeat;
  background-size : cover;
  background-image: url('../backgroundImg/Main.png');
}
.inner {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 5%;
  width: 800px;
  height: 550px; 
  background-color: #fff;
  opacity: .9;
  border-radius: 10px;
}
img {
  cursor: pointer;
  display: block;
  width: 110px;
  height: 110px;
  margin: auto;
}
.id {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.pw {
  margin-bottom: 10px;
}
.name {
  margin-bottom: 10px;
}
input {
  padding: 10px;
  font-size: 20px;
  border: 3px solid #f5f5f5;
  border-radius: 10px;
  width: 600px;
  height: 30px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border: 3px solid rgba(131, 94, 166, .5);
  }
  &::placeholder {
    color: #cac7c7;
  }
}
.check {
  margin-top: 6px;
  border: none;
  background-color: #845FA7;
  border-radius: 50px;
  width: 620px;
  height: 70px;
  cursor: pointer;
  color: #fff;
  font-size: 28px;
  &:hover {
    opacity: .9;
  }
}
.checkID {
  display: flex;
  justify-content: right;
}
.login {
  width: 100px;
  font-size: 18px;
  padding-right: 10px;
  margin-bottom: 10px;
  color: #000;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #845FA7;
  }
}
.msg {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 5px;
  span {
    font-size: 18px;
    font-weight: bold;
    color: red;
  }
  p {
    font-size: 18px;
    font-weight: bold;
    color: green;
  }
}


</style>
