import { defineStore } from 'pinia'
import router from '../routes'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {
        displayName: '',
      },
      signinError: false,
      isSignin: false,
      isSignup: false,
      signUpError: '',
      signUpMsg: '',
      signModal: false,
      userModal: false,
      editErrorMsg: ''
    }
  },
  getters: {},
  actions: {
    async signIn(signObj) {
      const res = await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'KDT2_team6',
          },
          body: JSON.stringify({
            email: signObj.email.trim(),
            password: signObj.password.trim(),
          }),
        }
      )
      const { user, accessToken } = await res.json()
      window.localStorage.setItem('userName', user.displayName)
      window.localStorage.setItem('token', accessToken)
      if (!user) {
        this.signinError = true
        this.isSignin = false
      } else {
        this.userInfo = user
        this.isSignin = true
        this.signinError = false
        router.push('/loginHome')
      }
    },
    async signOut() {
      const accessToken = window.localStorage.getItem('token')
      await fetch(
        'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            apikey: 'FcKdtJs202204',
            username: 'KDT2_team6',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      window.localStorage.removeItem('token', accessToken)
      window.localStorage.removeItem('userName')
      this.isSignin = false
      this.userInfo.displayName = 'Guest'
    },
    async signUp(signObj) {
      try {
        const res = await fetch(
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup',
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
              apikey: 'FcKdtJs202204',
              username: 'KDT2_team6',
            },
            body: JSON.stringify({
              email: signObj.email.trim(),
              password: signObj.password.trim(),
              displayName: signObj.displayName.trim(),
              profileImgBase64: signObj.profileImgBase64,
            }),
          }
        )
        const user = await res.json()
        if (!res.ok) throw new Error(user)
        this.isSignup = true
        this.signUpMsg =
          '가입 성공! 아이디와 비밀번호를 확인하고 로그인 해주세요.'
        this.signModal = true
      } catch {
        this.isSignup = false
        if (
          signObj.email.trim() === '' ||
          !signObj.password.trim() ||
          !signObj.displayName.trim()
        ) {
          this.signUpError = '가입 실패! 필수 항목을 모두 입력해주세요.'
        } else if (signObj.password.trim().length < 8) {
          this.signUpError = '가입 실패! 비밀번호는 8자 이상으로 입력해주세요.'
        } else if (signObj.displayName.trim().length > 20) {
          this.signUpError = '가입 실패! 닉네임은 20자 이하로 입력해주세요.'
        } else {
          this.signUpError =
            '가입 실패! 이미 존재하는 아이디 입니다. 혹은 아이디 형식이 잘못되었습니다.'
        }
      }
    },
    errorReset() {
      this.signUpMsg = ''
      this.signUpError = ''
    },
    async editUserInfo(userObj) {
      const accessToken = window.localStorage.getItem('token')
      try {
        const res = await fetch(
          'https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user',
          {
            method: 'PUT',
            headers: {
              'content-type': 'application/json',
              apikey: 'FcKdtJs202204',
              username: 'KDT2_team6',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              oldPassword: userObj.oldPassword.trim(),
              newPassword: userObj.newPassword.trim(),
              displayName: userObj.displayName.trim(),
              profileImgBase64: userObj.profileImgBase64,
            }),
          }
        )
        const user = await res.json()
        if (!res.ok) throw new Error(user)
        this.userInfo.displayName = user.displayName
        if (userObj.displayName.trim().length > 20) {
          this.editErrorMsg = '수정 실패! 닉네임은 20자 이하로 입력해주세요.'
        } else if (userObj.newPassword.trim().length < 8) {
          this.editErrorMsg = '수정 실패! 비밀번호는 8자 이상으로 입력해주세요.'
        } else {
          this.userModal = true
        }
      } catch {
        this.editErrorMsg = '수정 실패! 비밀번호가 잘못되었습니다.'
        console.log('수정 실패')
      }
    },
    editErrorReset() {
      this.editErrorMsg = ''
    },
    changeUserName() {
      if(window.localStorage.getItem('userName')) {
        this.userInfo.displayName = window.localStorage.getItem('userName')
        this.isSignin = true
      } else {
        this.userInfo.displayName = 'Guest'
        this.isSignin = false
      }
    }
  },
})
