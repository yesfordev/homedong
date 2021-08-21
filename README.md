# 💪 HomeDong ( 운동 게이미피케이션 플랫폼 )

### ✨Overview

1일 1커밋의 열풍이 불고 있는 SSAFY인들의 건강은 괜찮으신가요? SSAFY인들의 건강을 책임지기 위해 저희 **HomeDong**이 왔습니다 ✌1일 1동(홈 트레이닝 운동)의 시작을 홈동과 함께하고 건강을 지켜보세요!

👉[Homedong](https://i5a608.p.ssafy.io) 서비스! 구경하기 👈

### ⁉HomeDong의 개발 방식이 궁금하다면?!

---
👉[HomeDong 기술 블로그](https://calisthenics-homedong.tistory.com/) 보러가기 👈

### 💞캘리스떼닉스(Calisthenics) 팀원을 소개합니다!

---
|**서영은**|**김예슬**|**김성민**|**송상민**|**망고**|
|:---:|:---:|:---:|:---:|:-----------:|
|<img src="/uploads/f64f84c30fb5d172c8a0a606c6a3d72a/Untitled.png" width="800">|<img src="/uploads/b772ba4ff5c261d8d0cd39e55ee65333/Untitled_1.png" width="800">|<img src="/uploads/5e7238824a318175b658579b897630e1/Untitled_2.png" width="800">|<img src="/uploads/a6eea0e5ec39fabd05bbfb9be399a0ba/Untitled_3.png" width="800">|<img src="/uploads/be2ba567dca8bb01ab6e2509f16dadcc/Untitled_4.png" width="930">|
|Leader & Backend|Backend|Backend|Frontend|Cute|

👉맨 밑으로 가면 역할을 자세히 보실 수 있습니다.


### ✨ 주요 기능
---
- 서비스 설명 : 모두가 건강하게 집에서 즐길 수 있는 운동 게임
- 주요 기능 :
    - webRTC를 통한 실시간 화상 운동 게임
    - Pose Detection을 통한 자동 자세 인식
    - 게임 log를 통한 사용자 운동기록 추적
    - 기록에 따른 보상을 통한 운동 동기 부여

### 🖥️ 개발 환경

---

🖱**Backend**
- IntelliJ
- spring boot 2.4.5
- spring-boot-jpa
- Spring Security
- Java 8
- AWS EC2
- mysql
- redis

🖱**Frontend**

- Visual Studio Code
- React.js 17.0.2
- styled-components 5.3.0
- Material-UI
- redux-toolkit 1.6.1
- redux 4.1.0

🖱**Web RTC**

- openvidu 2.19.0

🖱**Pose Detection**

- Teachable Machine

🖱**CI/CD**
- aws ec2
- docker
- nginx
- jenkins

### 💫 서비스 아키텍처

---
![image](/uploads/4caa5b741349026bb80d993a41551549/image.png)


### 👨‍👩‍👧 협업 툴

---

- Gitlab
- Jira
- Notion
- Mattermost
- Webex

### 💭요구사항 정의서

---

![Untitled_21](/uploads/437b8b4b4287bf91db84b519aac43bbc/Untitled_21.png)

### 🎨 화면 설계서

---

![ss12](/uploads/f5f1a8f0e2e5b4d42e9e1d92457f8769/ss12.png)

![ss34](/uploads/81d1ea48230b28aea9bf08b7c020f432/ss34.png)

### ✨코드 컨벤션

---

```
- 의미 없는 변수명 X
	⇒ 유지보수 힘들고, 알아보기 힘드니 반드시 지양! ex) text1, test2

- 메서드 이름은 소문자로 시작하고, 동사로 지으면 좋다! ex) getName()

- 변수명, 메서드 이름은 카멜케이스로 지어주세요

- 클래스 이름은 대문자로 시작합니다
```

해당 [Code Convention 가이드](https://udacity.github.io/git-styleguide/), [네이밍 규칙](https://tyboss.tistory.com/entry/Java-자바-네이밍-관습-java-naming-convention)를 참고하여 정했습니다.

### ✨Git 컨벤션

---

```
FEAT:    새로운 기능을 추가할 경우
FIX:     버그를 고친 경우
STYLE:   코드 포맷 변경, 간단한 수정, 코드 변경이 없는 경우
REFATOR: 프로덕션 코드 리팩토링
DOCS:    문서를 수정한 경우(ex> Swagger)
Rename:  파일 혹은 폴더명 수정 및 이동
Remove:  파일 삭제
```

```bash
커밋 타입: 내용 자세히 적어주기 [#지라이슈넘버]
ex) FEAT: 로그인 rest api 추가 [#지라이슈넘버]
```

해당 [Git 스타일 가이드](https://udacity.github.io/git-styleguide/)를 참고하여서 정했습니다

### 💡Git Flow 브랜치 전략

---

- Git Flow model을 사용하고, Git 기본 명령어 사용한다.

- Git Flow 사용 브랜치
    - feature - 기능
    - develop - 개발
    - master - 배포
    - hotfix - 급한 에러 수정

- Git Flow 진행 방식
    1. feature 브랜치가 완성되면 develop 브랜치로 pull request를 통해 merge한다.

        ⇒ pull request가 요청되면, 모든 팀원들이 코드 리뷰를 하여 안전하게 merge한다.

    2. 매 주마다 develop 브랜치를 master 브랜치로 병합하여 배포를 진행한다.

- feature 브랜치 이름 명명 규칙
    - feature/[front or back]/[기능 이름]

        ex) feature/front/login

        ex) feature/webrtc

### ✨ ER Diagram

---

![erd](/uploads/f88002818d8e2b35da31a6dce25df6d2/erd.png)


### ✨ 포트 정리
---
|**PORT**|**이름**|
|:---:|:---:|
|443|HTTPS|
|80|HTTP - HTTPS로 리다이렉트(프론트 페이지지로 리다이렉트)|
|8443|Openvidu|
|8379|Redis|
|3306|MySQL|
|8081|Jenkins|
|8080|Spring boot Docker Container|
|3000|React, NginX Docker Container|  

### 😃 팀원 역할
- **김예슬**
    - openvidu를 통한 WebRTC 기능 구현
    - 백엔드 방 관리 API 구현(방 만들기/빠른 시작/방 찾기/방 나가기/방장 부여)
    - 백엔드 관리자 API 구현
    - 오픈비두 서버 배포
    - styled-component와 material-ui를 통한 css 스타일링
- **송상민**
    - react와 redux-toolkit을 활용하여 SPA 구현
    - 프론트 개발(회원가입, 로그인, 회원정보 수정, 메인 화면, 랭킹, 튜토리얼, 마이페이지, 방만들기, 방찾기등, 관리자 페이지 구현)
    - styled-components와 material-ui를 통한 컴포넌트 레이아웃 구현 및 css 스타일링
- **김성민**
    - Teachable Machine을 통한 운동 인식 구현
    - 운동별 로직을 통한 운동 카운트 기능 및 튜토리얼 구현
    - Openvidu를 통한 게임 내부 정보 실시간 통신
    - 게임 시작, 종료 이벤트 처리 및 실시간 랭킹, 채팅 기능 구현
    - styled-component와 material-ui를 통한 css 스타일링
- **서영은**
    - Spring security, JWT, JPA를 이용한 이메일 인증(폼 구현)회원가입, 로그인 기능 구현 (인증, 인가)
    - JWT, Redis 캐싱을 이용한 랭킹 조회 정보 캐싱 처리 구현
    - JWT, Redis를 이용해 로그아웃된 토큰 재사용 불가 처리 구현
    - 비밀번호 변경, 닉네임 변경, 회원 정보 CRUD 구현
    - 연속 운동일 수 조회, 1일 1홈동 조회, 방장 게임 시작 기능, 게임 끝 기능, 렝킹 페이지 기능, 최고 기록 조회, 뱃지 조회 등의 Spring Boot 백엔드 기능 구현
    - Jenkins, Docker를 이용한 CI/CD 구현 - Docker로 nginx+react container, spring boot container 생성하여 배포
    - Nginx 리다이렉트 설정 및 백엔드 및 프론트엔드 url 분기 처리 (/, /api/**)
    - react를 이용한 프론트엔드 프로필 설정 및 프로필 변경 기능, 프로필 변경 및 1일 1홈동 호버 툴팁 구현
    - 게임 및 채팅 기능 javascript → react로 migration
    - styled-component를 통한 css 스타일링
