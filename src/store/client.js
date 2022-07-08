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
      isShow: false,
      selected: "everyItem",
      searchValue: "",
      searchItem: [],
      singleProductId: "",
      singlePageData: {
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

    //전체 제품 조회 기능 수현님이 만드신거 복붙함
    async AllReadProduct() {
      const res = await fetch(END_POINT, {
        method: "GET",
        headers: {
          ...headers,
          //전개연산자를 이용해 headers내용 넣어주는거 가능한지 test해본것 잘됨
          masterKey: "true",
          //headers에 필요한 추가정보
        },
      });
      const master = await res.json();
      console.log(master);
      this.getAllProduct = master;
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
    async productPurchase() {
      // if(보유금액보다 제품금액이 크다면){
      //   alert('잔액이 부족합니다!')
      //   return ;
      // }

      try {
        // const { accountId } = payload; -> error출력을 방지하기 위해 일단 주석처리 해놓음
        const res = await axios({
          url: `${END_POINT}/buy`,
          method: "POST",
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            productId: this.singleProductId,
            accountId: "Ga2tRwm1HrJRPXtSDuLS",
            // accountId 아직 합치기 전이라 하드코딩해놓음
          },
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    //제품 구매 취소 기능
    async purchaseCancel(payload) {
      try {
        const { detailId } = payload;
        const res = await axios({
          url: `${END_POINT}/cancel`,
          method: "POST",
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            detailId,
          },
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    },

    //제품 구매 확정 기능
    async purchaseDecision(payload) {
      try {
        const { detailId } = payload;
        const res = await axios({
          url: `${END_POINT}/ok`,
          method: "POST",
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            detailId,
          },
        });
        console.log(res);
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
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.purchasedList = data;
        console.log(this.purchasedList);
      } catch (err) {
        console.log(err);
      }
    },

    //제품 구매 내역 (단일)
    async singlePurchasedList(payload) {
      const { detailId } = payload;
      try {
        const res = await axios({
          url: `${END_POINT}/transactions/detail`,
          method: "POST",
          headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          data: {
            detailId,
          },
        });
        console.log(res);
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
        console.log(data);
        this.singlePageData = data;
      } catch (err) {
        console.log(err);
      }
    },
  },
});
