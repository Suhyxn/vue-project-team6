
## 인증 (백송이)

'인증' API를 통해 로그인한 사용자만 `/loginHome`으로 이동할 수 있습니다.<br> 
#### `/home`과 `/loginHome`의 차이점

- 헤더의 Guest > 사용자 닉네임
- MapleStory Market에 오신 것을 환영합니다! > 사용자 닉넴임 + MapleStory Market에 오신 것을 환영합니다!
- 로그인/회원가입 > 마이페이지/제품검색

![게스트 화면](https://user-images.githubusercontent.com/102528180/179904663-baf96551-6744-4fb9-b34f-1c9ce29567b9.PNG)

![로그인한 메인화면](https://user-images.githubusercontent.com/102528180/179905131-a25c2e1c-cf5c-4b98-9ace-d91d1604a15d.PNG)

### 회원가입 (백송이)
사용자가 `username`에 종속되어 회원가입합니다.

- 사용자 비밀번호는 암호화해 저장합니다.(관리자는 확인할 수 없습니다!)
- 프로필 이미지는 1MB 이하여야 합니다.
#### `/sign/signup` 화면
![회원가입 화면](https://user-images.githubusercontent.com/102528180/179911610-0ac23070-e8d3-4951-8efb-64eb70934355.PNG)

#### 회원가입 요구사항
- 필수 입력 사항은 아이디, 비밀번호, 닉네임 총 세가지 입니다.
- 아이디는 '이메일 주소 형식'이여야 합니다.
- 다른 사용자와 같은 아이디는 사용할 수 없습니다.
- 비밀번호는 '8자 이상'이여야 합니다.
- 닉네임은 '20자 이하'여야 합니다.
- 요구사항에 맞지 않는 형식일때는 '에러 메세지'를 띄웁니다.
- 회원가입 성공시, 가입 성공 모달창이 띄워지며<br>확인 버튼을 클릭하면 '로그인 화면'인 `/sign/signin`화면으로 이동하고<br>취소 버튼을 클릭하면 '회원가입 화면'인 `/sign/signup`에 있습니다.

##### 필수항목 입력 오류
![필수항목 입력 오류](https://user-images.githubusercontent.com/102528180/179911640-f92ae979-b20c-420f-9b42-5561c51141f1.PNG)

##### 아이디 입력 오류
![아이디 입력 오류](https://user-images.githubusercontent.com/102528180/179912140-6ea7fd77-2b54-47cd-9905-8b320a4146e7.PNG)

##### 비밀번호 입력 오류
![비밀번호 입력 오류](https://user-images.githubusercontent.com/102528180/179912154-516d5896-3e02-4c96-a997-277bd887172c.PNG)

##### 닉네임 입력 오류
![닉네임 입력 오류](https://user-images.githubusercontent.com/102528180/179912159-6b570f94-d8f2-4f94-a34c-6bf8c5e042af.PNG)

#### 회원가입 성공 모달

![회원가입 성공 모달](https://user-images.githubusercontent.com/102528180/179927087-2c052f71-9329-4790-8bf9-c0fd5f2a8759.PNG)

### 로그인 (백송이)

- 발급된 `accessToken`은 24시간 후 만료됩니다.(만료 후 다시 로그인 필요)
- 유효하지 않은 이메일, 비밀번호일 경우 '에러 메세지'를 띄웁니다.
- 로그인 성공 시, `/loginHome` 화면으로 이동됩니다.

#### `/sign/signin` 화면
![로그인 화면](https://user-images.githubusercontent.com/102528180/179915780-f5758574-661c-455a-950d-b3c4c7936a50.PNG)

#### 로그인 오류 화면
![로그인 오류 화면](https://user-images.githubusercontent.com/102528180/179915801-3fd9fdc7-59d5-4374-8aa4-05a42127fb85.PNG)

### 인증 확인 (백송이)

인증 확인 API는 `core` 폴더의 `index.js`에 따로 작성했습니다.
```js
export async function validateTokenUser() {
  const accessToken = window.sessionStorage.getItem('token')
  const res = await fetch('https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'apikey': 'FcKdtJs202204',
      'username': 'KDT2_team6',
      'Authorization': `Bearer ${accessToken}`
    },
  })
  return await res.json()
}
```

인증 확인이 `true`인 사용자는 `'/'`으로 이동되고 닉네임이 `admin`인 경우 `'/admin'`으로 이동되도록<br>
`routes` 폴더의 `guards.js`에 인증 확인 API를 활용했습니다.
```js
import router from './index'
import { useUserStore } from '~/store/user'
import { validateTokenUser } from '~/core'


router.beforeEach(async to => {
  const userStore = useUserStore()

  if(to.meta.auth) {
    const user = await validateTokenUser()
    if (user.displayName === 'admin') {
      userStore.userInfo = user
      userStore.isSignin = true
      return '/admin'
    }
    if (user && user.email) {
      userStore.userInfo = user
      userStore.isSignin = true
      return true
    }
    return '/'
  }
  return true
})
```

### 로그아웃 (백송이)
로그인 성공시 로그아웃 아이콘이 생기며, 로그아웃 아이콘을 클릭하면 로그아웃이 되고 홈 화면으로 다시 돌아갑니다.
#### 로그아웃 전 화면
![로그아웃 화면](https://user-images.githubusercontent.com/102528180/179920478-c691faa8-0381-4425-b75b-c3ac8e419964.PNG)

#### 로그아웃 후 화면
![로그아웃된 화면](https://user-images.githubusercontent.com/102528180/179921435-89d6c96d-469b-48fe-93cf-e1d36499d090.PNG)

### 사용자 정보 수정 (백송이)

- 프로필을 지정하지 않은 사용자인 경우 주황버섯 이미지로 '기본 프로필'이 나타나도록 설정했습니다.
- 내정보 수정 요구사항은 회원가입 요구사항과 동일합니다.
- 요구사항에 맞지 않는 형식일때는 '에러 메세지'를 띄웁니다.
- 사용자 정보 수정 성공시, 수정 성공 모달창이 띄워지며<br>확인 버튼을 클릭하면 `/mypage/userinfo`화면으로 이동합니다.

#### `/mypage/userinfo` 화면
![사용자 정보 수정 화면](https://user-images.githubusercontent.com/102528180/179923936-4c64234c-93e7-4061-b34f-8eab85bffde8.PNG)

#### `/mypage/edituserinfo` 화면
![사용자 정보 수정 (Edit) 화면](https://user-images.githubusercontent.com/102528180/179924643-5c3f230a-0025-4b86-8545-e3b7905cf740.PNG)

#### 사용자 정보 수정 실패 화면
![수정 실패 화면](https://user-images.githubusercontent.com/102528180/179928961-e4c222c4-9fbb-4a95-8a3f-c0528ee2ab0d.PNG)

#### 사용자 정보 수정 성공 모달
![수정 성공 모달](https://user-images.githubusercontent.com/102528180/179929874-0cf6ad11-23ad-4825-9ef3-ad2d85923dfb.PNG)

