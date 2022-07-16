import axios from "axios";
import { defineStore } from "pinia";

//export 안쪽에서 const사용이 안되서 위쪽에 API URL과 공통 header정보 명시해놓음
// headers에 추가적인 내용 필요시 ...(전개연산자) 사용하기
const headers = {
  "content-type": "application/json",
  apikey: "FcKdtJs202204",
  username: "KDT2_team6",
  //username은 test용으로 지어짐 향후 완성되면 구현되면 KDT2_team6으로 변경예정
};

const END_POINT =
  "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products";

export const useClientStore = defineStore("client", {
  state() {
    return {
      getAllProduct: [],
      getEquiment: [],
      getConsumption: [],
      getPat: [],
      isShow: false,
      selected: "everyItem",
      searchValue: "",
      searchItem: [],
      singleProductData: null,
      singleProductId: "",
      singlePageData: {
        data: {},
      },
      singlePurchasedItemPageData: {
        data: {},
      },
      purchasedList: null,
    };
  },
  actions: {
    //모달창 끄고 키는 기능
    modalHandler() {
      this.isShow = !this.isShow;
    },

    //제품 검색 기능
    async searchProduct(payload) {
      // 요청성공시 text를 payload로 만들어 구조분해하는 형태로 리펙토링 해보기(완료)
      const { text } = payload;
      try {
        const { data } = await axios({
          url: `${END_POINT}/search`,
          method: "POST",
          headers,
          data: {
            searchText: text,
          },
        });
        console.log(data);
        this.searchItem = data;
        //추가로직 = this.$router.push를 이용해 res의 id로 상세 페이지로 이동시키기
        //this.searchItem은 빈배열이다
      } catch (err) {
        console.log(err);
      }
    },

    //제품 구매 신청 기능
    async productPurchase(payload) {
      const { id, price } = payload;
      if (price < this.singleProductData.price) {
        alert("잔액이 부족합니다!");
        return;
      }

      try {
        const res = await axios({
          url: `${END_POINT}/buy`,
          method: "POST",
          headers: {
            ...headers,
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: {
            productId: this.singleProductData.id,
            accountId: id,
          },
        });
        console.log(res);
        this.allPurchasedList();
      } catch (err) {
        alert("로그인을 하지않았거나 등록된 계좌가 없습니다");
      }
    },

    //제품 구매 취소 기능
    async purchaseCancel(payload) {
      try {
        const { detailId } = payload;
        await axios({
          url: `${END_POINT}/cancel`,
          method: "POST",
          headers: {
            ...headers,
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: {
            detailId,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },

    //제품 구매 확정 기능
    async purchaseDecision(payload) {
      try {
        const { detailId } = payload;
        await axios({
          url: `${END_POINT}/ok`,
          method: "POST",
          headers: {
            ...headers,
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: {
            detailId,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },

    //제품 구매 내역 (전체)

    async allPurchasedList() {
      try {
        const { data } = await axios({
          url: `${END_POINT}/transactions/details`,
          method: "GET",
          headers: {
            ...headers,
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        this.purchasedList = data.filter((i) => {
          return i.isCanceled === false;
        });
        console.log(this.purchasedList);
      } catch (err) {
        this.purchasedList = null;
        console.log(err);
      }
    },

    //제품 구매 내역 (단일)
    async singlePurchasedList(payload) {
      const { detailId } = payload;
      try {
        const { data } = await axios({
          url: `${END_POINT}/transactions/detail`,
          method: "POST",
          headers: {
            ...headers,
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
          data: {
            detailId,
          },
        });
        this.singlePurchasedItemPageData = data;
      } catch (err) {
        console.log(err);
      }
    },
    //단일 제품 상세 조회 공통 api
    async readSingleProduct(id) {
      try {
        const { data } = await axios({
          //this.singlePageData는 axios의 응답결과를 사용하기위한 빈객체이다
          //{data}는 axios의 응답 결과안에 들어있는 data를 구조분해하여 data객체만 빼놓기 위한 의도이다
          url: `${END_POINT}/${id}`,
          method: "GET",
          headers: {
            ...headers,
          },
        });
        this.singlePageData = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
