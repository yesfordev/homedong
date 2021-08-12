# 💪 HomeDong ( 운동 게이미피케이션 플랫폼 )

### ✨Overview

1일 1커밋의 열풍이 불고 있는 SSAFY인들의 건강은 괜찮으신가요? SSAFY인들의 건강을 책임지기 위해 저희 **HomeDong**이 왔습니다 ✌1일 1동(홈 트레이닝 운동)의 시작을 홈동과 함께하고 건강을 지켜보세요!

### ⁉HomeDong의 개발 방식이 궁금하다면?!

---

👉[HomeDong 기술 블로그](https://calisthenics-homedong.tistory.com/) 보러가기 👈

### 💞캘리스떼닉스(Calisthenics) 팀원을 소개합니다!

---
|**서영은**|**김예슬**|**김성민**|**송상민**|**망고**|
|:---:|:---:|:---:|:---:|:-----------:|
|<img src="/uploads/e8c8407735095c6a2fa2aab7469ce66a/image.png" width="800">|<img src="/uploads/a2e597d98b5de28f2b24533accbbe863/image.png" width="800">|<img src="/uploads/974046d4b51144ee19ca6cc7249a26d4/image.png" width="800">|<img src="/uploads/ada107ab245bb0cd74492f17f97b5e34/image.png" width="800">|<img src="/uploads/74b138f321d71eba2f421d5742fcd5f3/image.png" width="930">|
|Leader & Backend|Backend|Backend|Frontend|Cute|

### 🖥️ 개발 환경

---

🖱**Backend**

- IntelliJ
- Spring Boot 2.4.5
- Spring Security
- Spring Data Jpa
- MariaDB
- Java 8
- AWS EC2

🖱**Frontend**

- Visual Studio Code
- React.js 17.0.2
- styled-components 5.3.0
- Material-UI

🖱**Web RTC**

- Kurento

🖱**Pose Detection**

- Teachable Machine

### 👨‍👩‍👧 협업 툴

---

- Gitlab
- Jira
- Notion
- Mattermost
- Webex

### 💭요구사항 정의서

---

![image](/uploads/3b3223fb035430ae59745179ee804248/image.png)

### 🎨 화면 설계서

---

![image](/uploads/4f1ba620b64801948c63c8eae4857a76/image.png)

![image](/uploads/41288c947a5a015a7740514a6a5c31b0/image.png)

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

![image](/uploads/c60a94c89d3468a629d1b1ba7d8f2650/image.png)

### ✨Git 스터디

---

![image](/uploads/332740f983a32245a92db750586badbb/image.png)

### 💠Jira

---

![image](/uploads/0b2db4cb7f631f1340f9a72714730dfd/image.png)

- Jira를 통해 스프린트, 개발 주기 등을 관리하고 있습니다.
