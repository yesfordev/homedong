# 💪 HomeDong ( 모두가 건강하게 집에서 즐길 수 있는 운동 게임 )

## 👇홈동 소개 및 시연 영상👇
[<img src="https://user-images.githubusercontent.com/31542907/131515083-458cac93-16d0-463e-a18e-ec26156a15f3.png" width="250">](https://www.youtube.com/watch?v=_U6xNSv4kFM)

홈동 시나리오는 👉[여기](https://github.com/yesfordev/homedong/blob/develop/%EC%8B%9C%EC%97%B0%20%EC%8B%9C%EB%82%98%EB%A6%AC%EC%98%A4.md)👈에서 더 자세히 보실 수 있습니다.

## ✨Overview
1일 1커밋의 열풍이 불고 있는 여러분들의 건강은 괜찮으신가요? 모두의 건강을 책임지기 위해 저희 **HomeDong**이 왔습니다 ✌1일 1홈동(홈 트레이닝 운동)의 시작을 홈동과 함께하고 건강을 지켜보세요!

## ✨홈동의 모토
`언제 어디서나 건강을 챙기며 함께 즐긴다!`

## 👀홈동 서비스 화면
### 게임 - 스쿼트
![스쿼트](https://user-images.githubusercontent.com/31542907/131517102-ae6bd948-53df-4ce5-8b0f-0423dbbbcf35.gif)

### 게임 - 버피
![버피](https://user-images.githubusercontent.com/31542907/131517100-3e06b5da-48e3-4d47-9125-be4ad158f0fd.gif)

### 게임 - 팔굽혀펴기
![푸시업](https://user-images.githubusercontent.com/31542907/131513675-9307c62b-c428-485a-8652-655b3a2ec19e.gif)

### 게임 - 채팅
![채팅](https://user-images.githubusercontent.com/31542907/131517069-e6cfc4e2-6318-4674-b477-66b841fb2e3d.gif)

### 게임이 끝났을 때 - 획득 뱃지 및 랭킹
![게임끝](https://user-images.githubusercontent.com/31542907/131517089-dc21ee81-e95c-46e0-89ea-918cd067e7b7.gif)

### 마이페이지 - 뱃지 리워드, 운동 일일 기록, 운동일 수
![마이페이지리워드](https://user-images.githubusercontent.com/31542907/131517098-070dce29-685c-40f8-9bd0-3942d3ebcc2e.gif)

### 마이페이지 - 프로필 변경
![프로필 변경](https://user-images.githubusercontent.com/31542907/131517082-7c64a8d2-4a93-43fb-a767-ad5edab487ed.gif)

### 랭킹
![랭킹](https://user-images.githubusercontent.com/31542907/131517092-19a5d112-ba2d-47a4-b332-9dade3eaf42c.gif)

### 튜토리얼
![튜토리얼](https://user-images.githubusercontent.com/31542907/131517079-bfb5af03-3c12-4fde-883f-743865bdac0d.gif)

### 회원가입 - 이메일 인증
![회원가입](https://user-images.githubusercontent.com/31542907/131517086-37ce4e8c-73cb-4a8f-9841-38e0ca1dfd6a.gif)


## ✨ 주요 기능
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

![서비스 아키텍처](https://user-images.githubusercontent.com/31542907/131509639-2707daab-08ce-4725-93f7-3da5ecc088b1.png)

### ✨Jenkins를 이용한 CI/CD 구축 및 SSL 인증서 적용

---

제가 담당하여 서비스 아키텍처와 같이, Jenkins의 pipeline을 이용하여 자동 무중단 배포를 구축하였습니다. Gitlab webhook을 설정하여 Jenkins에 빌드 트리거를 설정했고, 이에 따라 Gitlab에서 master 브랜치에 push하면 자동으로 배포될 수 있도록 구축하여 개발하는 과정에서 배포로 인한 시간 낭비를 줄였습니다.
또한 프론트엔드인 React.js는 Nginx와 함께 docker image로 빌드하여 배포하였고, 백엔드 및 redis, openvidu 또한 docker container로 배포하였습니다. 그리고 Nginx와 letsencrypt를 이용하여 ssl 인증서를 적용하였고, 프론트엔드는 443(https)로 프록시로 분기시켰고 백엔드는 /api 경로로 프록시를 걸어줬습니다.

- 프로그램 배포 방법은 [여기](https://github.com/yesfordev/homedong/blob/develop/git%20%EC%86%8C%EC%8A%A4%20%ED%81%B4%EB%A1%A0%20%EC%9D%B4%ED%9B%84%20%EB%B9%8C%EB%93%9C%20%EB%B0%8F%20%EB%B0%B0%ED%8F%AC%20%EA%B0%80%EC%9D%B4%EB%93%9C.md)에서 볼 수 있습니다. 해당 배포 방법은 CI/CD를 구축할 수 있는 내용은 아닙니다.(단순 배포 방법)

### ✨기술 특이점

---

- Teachable Machine

자세를 학습시켜 pose detection을 통한 모션 인식으로 자세 인식을 통해 유저가 각 운동 종목을 잘 수행하는지 체크했고, 운동 개수를 카운팅할 수 있도록 하였습니다. 

![티처블머신](https://user-images.githubusercontent.com/31542907/131527504-6a51078f-bc58-4ae7-8b5b-c36c6f81f600.png)

이런 식으로 Teachable Machine으로 학습을 시키면 자세별로 도출된 값을 이용할 수 있게 됩니다. 여기서 추출된 코드와 값으로 홈동 서비스에 맞게 가공하여 구현하였습니다.

- WebRTC (Openvidu)

Openvidu로만 할 수 있는 기능 뿐만이 아니라 백엔드를 함께 이용한 개발로 여러 기능을 구현했습니다. 각 방마다 인원수가 6명까지만 들어갈 수 있게 구현하였고, 방장만 게임을 시작할 수 있기에 방을 만들거나 방에서 인원이 나가면 자동으로 다른 사람에게 방장 권한이 부여되게 하였습니다. 그리고 private 방을 만들 수 있게 하여 방 번호와 비밀번호를 아는 사용자 외에는 들어오지 못하게 구현하였고, 빠른 시작 기능을 구현하여 현재 존재하는 방에 빠르게 입장할 수 있게 하였고, 방이 없으면 자동으로 방 생성까지 할 수 있도록 구현하였습니다.

- Redis

랭킹 기능에 들어가는 랭킹 정보는 자정마다 업데이트 되는 정보여서 단순한 구조의 정보이고, 반복적으로 동일하게 제공되고, 최신화가 실시간으로 필요하지 않은 정보였습니다. 이러한  데이터의 특성으로 캐싱을 적용하기에 적절하다고 생각을 했고, Redis에 랭킹 정보를 저장하여 DB를 거치지 않고 정보를 가져와 트래픽이 많아질 때 백엔드 부하를 줄이고, 정보 조회 속도를 높였습니다. 또한 저희는 Spring Scurity와 JWT를 이용하여 인증을 구현하였는데, Redis를 이용해 로그아웃시킨 토큰들을 만료처리하여 해당 토큰으로는 다시 인증할 수 없도록 구현하였습니다.

- redux-toolkit

프론트엔드 구현시에는 React와 redux-toolkit을 이용하여 Ducks Pattern 기반 상태 관리를 하였습니다.

- 배포

도커, Nginx, Jenkins를 이용한 자동 무중단 배포를 구현하였습니다. 백엔드를 도커 컨테이너로 배포하였고, 프론트로 Nginx와 함께 도커 컨테이너로 배포하였습니다.



### 👨‍👩‍👧 협업 툴

---

- Git
- Jira
- Notion
- Mattermost
- Webex

### 💭요구사항 정의서

---
![요구사항 정의서](https://user-images.githubusercontent.com/31542907/131509739-fb2a0c08-6a06-4f88-8643-93494f7c0150.png)

### 🎨 화면 설계서

---

<img width="574" alt="화면설계서1" src="https://user-images.githubusercontent.com/31542907/131509888-18a9e572-0521-492d-b36b-f990f39eea0a.png">

<img width="1098" alt="화면설계서2" src="https://user-images.githubusercontent.com/31542907/131509897-ad78d45f-bf43-4b59-82e2-38b536ee9d75.png">


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

### 👨‍👩‍👧 Jira

---

협업 및 일정, 업무 관리를 위해 Jira를 이용하였습니다. 매주 월요일 오전 회의에서 한 주동안 진행되어야 할 주 단위 계획을 짜고, 진행할 이슈들을 스프린트를 만들어 등록했습니다. 스프린트는 일주일 단위로 진행하였습니다.
- Epic : backend, frontend, webrtc로 나누어 구성하였습니다.
- story : `마이페이지에서 프로필 변경 버튼을 통해 프로필을 변경 한다`와 같이 자세하게 작성하였습니다.
- subtask : 부작업을 나누어 세세하게 업무 관리를 진행하였습니다.

이 외에, subtask에 예상 시간을 기록해 더 세세하게 일정 관리를 했고 협업 메신저(Mattermost)에 알람을 등록하여 작업 상황을 실시간으로 확인할 수 있도록 했습니다.

### 👨‍👩‍👧 Notion

---

모두가 봐야할 공지, 함께 공부해야 할 링크 등을 모아 관리했습니다. 그리고 항상 모든 회의 및 피드백은 기록으로 남겨두어서 잘 반영할 수 있도록 하였습니다. 컨벤션 규칙, 브랜치 전략 등도 노션에 기록하여 모두가 항시 확인할 수 있도록 관리했습니다.

### ✨ ER Diagram

---

![erd](https://user-images.githubusercontent.com/31542907/131509971-463c22d8-6266-4c94-b75c-59a205ec17f9.png)

- 정규화를 거친 Diagram 입니다.

### ✨ EC2 포트 정리
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

## 💞캘리스떼닉스(Calisthenics) 팀원을 소개합니다!

---
|**서영은**|**김예슬**|**김성민**|**송상민**|**망고**|
|:---:|:---:|:---:|:---:|:-----------:|
|<img src="https://user-images.githubusercontent.com/31542907/131508704-c02a2f49-f426-47f4-903a-815044306b85.png" width="800">|<img src="https://user-images.githubusercontent.com/31542907/131508707-7c491a78-a31f-4551-847e-05ae13ade67f.png" width="800">|<img src="https://user-images.githubusercontent.com/31542907/131508699-dfb94282-92ec-4f50-8d77-ae328c2a71af.png" width="800">|<img src="https://user-images.githubusercontent.com/31542907/131508696-a8946565-9b88-47e5-afc5-376bc8b0e76f.png" width="800">|<img src="https://user-images.githubusercontent.com/31542907/131509605-96a20a25-cbc7-4722-9e0d-2e830ece54cb.png" width="800">|
|Leader & Backend|Backend|Backend|Frontend|Cute|

### 😃 팀원 역할
---
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
- **서영은(본인)**
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

### ⁉HomeDong의 개발 과정이 궁금하다면?!

---

👉[HomeDong 기술 블로그](https://calisthenics-homedong.tistory.com/) 보러가기 👈

### 🐣Homedong을 개발하고 난 후의 회고

---

- 안되는 것은 함께 해결하면 해결할 수 있다.
- 코드 리뷰 꼼꼼히 하자
- 긍정적인 말로 팀 분위기를 만들어가자
- 문서화를 잘 하자!

자세한 회고는 [블로그](https://yesforlog.tistory.com/24)에서 자세히 보실 수 있습니다.
