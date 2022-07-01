<template>
  <div class="container_account_add">
    <div class="bank">
      <p>은행명</p>
      <select name="bank_type">
        <option value="">
          선택
        </option>
        <option value="1">
          국민은행
        </option>
        <option value="2">
          신한은행
        </option>
        <option value="3">
          우리은행
        </option>
        <option value="4">
          하나은행
        </option>
        <option value="5">
          케이뱅크
        </option>
        <option value="6">
          카카오뱅크
        </option>
        <option value="7">
          NH농협은행
        </option>
      </select>
    </div>
    <div class="account_number">
      <p>계좌번호</p>
      <input type="text" />
    </div>
    <div class="phone_number">
      <p>전화번호</p>
      <input type="text" />
    </div>
    <div class="sign">
      <p>서명란</p>
      <input type="text" />
    </div>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.container_account_add {
    width: 80%;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: antiquewhite;
  .bank, .account_number, 
  .phone_number, .sign {
    width: 85%;
    font-size: 16px;
    font-weight: 700;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 5%;
    margin-bottom: 5%;
    margin-left: 20px;
    input, select {
      height: 20px;
      border-radius: 4px;
      border: solid 1px #e1dfdf;
      width: 160px;
    }
  }
}
</style>
