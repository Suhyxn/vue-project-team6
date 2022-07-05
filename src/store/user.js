import { defineStore } from 'pinia'
import router from '../routes'

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: {
        displayName: 'Guest'
      },
      signinError: false,
      isSignin: false
    }
  },
  getters: {

  },
  actions: {
    async signIn(signObj) {
      const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'KDT2_team6'
        },
        body: JSON.stringify({
          email: signObj.email.trim(),
          password: signObj.password.trim()
        })
      })
      const { user, accessToken } = await res.json()
      console.log(user)
      window.localStorage.setItem('token', accessToken)
      if(!user) {
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
      await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'apikey': 'FcKdtJs202204',
          'username': 'KDT2_team6',
          'Authorization': `Bearer ${accessToken}`
        }
      })
      window.localStorage.removeItem('token', accessToken)
      this.isSignin = false
      this.userInfo.displayName = 'Guest'
    }
  }
})
