import { defineStore } from "pinia";
import axios from "axios";

const accountURL =
  "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account";
const headers = {
  "content-type": "application/json",
  apikey: "FcKdtJs202204",
  username: "KDT2_team6",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
};

export const useAccountStore = defineStore("account", {
  state() {
    return {
      list: [],
      banks: [],
      selectedBankData: null,
      isShow: false,
    };
  },
  getters: {},

  actions: {
    async selectBankList() {
      const bankLsit = await axios({
        url: accountURL + "/banks",
        method: "GET",
        headers,
      });
      this.banks = bankLsit.data;
    },
    async readAccountList() {
      const accountList = await axios({
        url: accountURL,
        method: "GET",
        headers,
      });
      this.list = accountList.data;
      console.log(this.list);
    },
    async addAccountList(payload) {
      const { bankCode, accountNumber, phoneNumber, signature } = payload;

      const res = await axios({
        url: accountURL,
        method: "POST",
        headers,
        data: {
          bankCode,
          accountNumber,
          phoneNumber,
          signature,
        },
      });
      console.log(res.data);
    },
    async deleteAccount(accountIds, signature) {
      for (let i in accountIds) {
        await axios({
          url: accountURL,
          method: "DELETE",
          headers,
          data: {
            accountId: accountIds[i],
            signature,
          },
        });
      }
      this.readAccountList();
    },
  },
});
