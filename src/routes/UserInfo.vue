<template>
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
</template>

<script>
import { validateTokenUser } from '~/core'

export default { 
  data() {
    return {
      email: '',
      displayName: '',
      profileImg: ''
    }
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
p {
  padding: 20px 0;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
</style>
