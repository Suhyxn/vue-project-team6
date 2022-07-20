# 🤝 팀 프로젝트

- 과제 기한: 
  - 과제 수행 기간: 06월 09일(목) ~ 07월 22일(금)
  - 코드 리뷰 기간: 07월 22일(금) ~ 07월 29일(금)
- 내용: 
  - API 분석 후 어떤 프로젝트로 진행/완성할 것인지 팀 단위로 결정하세요.
- 결과 : 
  - 배포 사이트: https://maplestorymarket.netlify.app

<hr />

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




## 계좌 (변승훈)

사용자가 아이템을 구매 했을 때 사용 할 계좌 부분입니다.


### 계좌 목록 및 잔액 조회

1. 계좌가 없는 경우
  - '전체 보유 금액' 위에 빨간 경고문으로 '추가된 계좌가 없습니다. 계좌를 추가해 주세요!'을 출력하게 구현하였습니다.
  - 계좌가 하나도 등록되어 있지 않은 경우 '계좌 해지' 버튼을 disabled를 통해 비활성화 시켰습니다.  
  ![image](https://user-images.githubusercontent.com/65530775/179925202-d1c1f318-2599-4d0a-a883-6fee10eddaf7.png)
  
2. 계좌가 있는 경우
- 계좌번호는 일부만 노출됩니다. E.g. `"356-XXXX-XXXX-XX"`
- 잔액의 단위는 '원화(￦)'입니다.<br />
원화의 콤마( , )를 맞추기 위해 `.toLocaleString('ko-KR')`를 사용했습니다.
![image](https://user-images.githubusercontent.com/65530775/179928659-8e249635-fc54-4be3-bdce-de7ba834dcb1.png)


- 등록 가능한 계좌가 전부 다 찼을 경우(7개) '계좌 추가' 버튼을 disabled를 통해 비활성화 시켰습니다.
- 추가적으로 '전체 보유 금액' 위에 빨간 경고문으로 '추가 가능한 계좌가 없습니다!'을 출력하게 구현하였습니다.
![image](https://user-images.githubusercontent.com/65530775/179928433-eb1c6e97-7d19-4c24-b30d-566fb5ed6c21.png)

### 계좌 연결
- 계좌 등록 버튼을 누른 뒤 계좌 연결을 진행합니다.
- 빨간 글씨로 써져있는 경고문들의 조건과 `placeholder`의 조건들을 맞게 입력을 하면 계좌를 연결할 수 있습니다.
-  계좌번호 자리와 전화번호는 `placeholder`에 적혀 있는 조건에 맞게 작성해야 합니다. <br />
이 둘은 조건식을 설정했습니다.
- 해당 조건을 하나라도 지키지 못한 경우 계좌가 연결되지 않습니다.
- 해당 조건을 지켰는지에 대한 확인은 경고문이 전부 초록색으로 바뀌었는지 확인하면 됩니다.
![image](https://user-images.githubusercontent.com/65530775/179929952-14467d5f-a054-4ea9-9601-9cd075f86f7f.png)


- 연결된 계좌 잔액에는 자동으로 기본 '3백만원'이 추가됩니다.
![image](https://user-images.githubusercontent.com/65530775/179929819-8968fa43-3def-40e8-b0a3-6be2fb7a70dd.png)


### 선택 가능한 은행 목록 조회
- 위의 계좌 연결과 이어지는 부분입니다.
- 은행 당 하나의 계좌만 허용됩니다.
- 사용자가 계좌를 추가하면, 해당 은행 정보 `disabled` 속성이 `true`로 변경됩니다.<br />
 이를 이용하여 은행 선택 시 '사용 중', '사용 가능'을 표시하였습니다.
- 이미 연결한 은행이면 경고문과 함께 입력된 계좌번호가 초기화 되며 계좌번호를 입력할 수 없는 상태가 됩니다.
 ![image](https://user-images.githubusercontent.com/65530775/179934228-87e8bbb7-27ad-469c-a81d-502d2a3eae3d.png)

- 은행 정보 `digits` 속성의 숫자를 모두 더하면 각 은행의 유효한 계좌번호 길이가 됩니다. <br />
이를 이용하여 계좌 번호 입력 시 선택한 은행에 따라 해당 `input`의 `maxlength`를 조정했습니다. <br />
추가적으로 `placeholder`에도 해당 내용을 확인할 수 있게 표기해두었습니다.
![image](https://user-images.githubusercontent.com/65530775/179934576-33ae8f99-26a0-412b-85fc-0ae0df29ffeb.png)

![image](https://user-images.githubusercontent.com/65530775/179932979-138f71d3-0691-45ac-b5d0-5c3f63aecb99.png)



### 계좌 해지
- checkbox를 클릭하여 해당 계좌를 해지할 수 있습니다.
- 처음 계좌 해지 버튼 클릭 시 '정말 선택한 계좌를 해지 하시겠습니까?'의 문구와 함께 해지 유무를 한 번더 선택할 수 있습니다.
- 해지한 계좌는 다시 연결해도 잔액이 반영되지 않습니다.(기본 금액으로 추가됩니다)

![image](https://user-images.githubusercontent.com/65530775/179929128-aff64578-fc9b-41e1-9c7b-1fe2599f5a1d.png)




### 기타 작업 내용들

- Figma를 통한 전체 페이지 관련 스타일 초안 작성
![image](https://user-images.githubusercontent.com/65530775/179937712-e8f33541-25f3-4a83-ae27-d614fa5cc9da.png)

- 메인 페이지 
![image](https://user-images.githubusercontent.com/65530775/179937813-588c6720-d7e2-4e4d-ad21-5539b471bc34.png)

- 마이 페이지
![image](https://user-images.githubusercontent.com/65530775/179925108-dbbc97fe-4b18-4b1b-adc1-66edabd4a86c.png)

- 관리자 페이지
![image](https://user-images.githubusercontent.com/65530775/179937907-b9aa96f9-31f6-4eeb-8920-472591ef6b35.png)

- 제품 구매 페이지
![image](https://user-images.githubusercontent.com/65530775/179938285-bd0066c0-a151-4dd1-8009-7b965512b0aa.png)

- 위 페이지 들의 세부 내용들 (각 페이지 별 왼쪽의 메뉴(LeftNavBar) 클릭 시 나타나는 화면들)에 대한 스타일 및 색상 통일 작업

- 완성된 메인, 마이, 관리자, 제품 구매 페이지들을 router-view를 이용하여 처리, 아래는 마이 페이지를 router-view를 이용하여 처리 한 예시 코드

```js
{
      path: '/mypage',
      component: MyPage,
      children: [
        {
          path: '',
          component: MyPageMain,
        },
        {
          path: 'userinfo',
          component: UserInfo,
        },
        {
          path: 'edituserinfo',
          component: EditUserInfo,
        },
        {
          path: 'accountlist',
          component: AccountList,
        },
        {
          path: 'accountadd',
          component: AccountAdd,
        },
        {
          path: 'purchaselist',
          component: PurchaseList,
        }
      ],
    },
```
- 코드 리팩토링 조언, 구조적인 부분에 대한 조언 등