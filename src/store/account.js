import { defineStore } from 'pinia'
import axios from 'axios'

const accountURL = 'https://asia-northeast3-heropy-api.cloudfunctions.net/api/account'
const headers = {
  'content-type': 'application/json',
  'apikey': 'FcKdtJs202204',
  'username': 'KDT2_team6'
}

export const useAccouontStore = defineStore('account', {
  state() {
    return {
      accountList: {}
    }
  },
  getters: {

  },
  actions: {
    async readAccountList() {
      const res = await axios({
        url: accountURL,
        method: 'GET',
        headers,
        Authorization: `Bearer ${localStorage.getItem('token')}`
        })
      console.log(res)
    }
  }
})
