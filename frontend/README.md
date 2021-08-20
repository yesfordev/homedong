# Frontend

```
모든 과정은 Visual Stuido Code 기준으로 설명되어 있습니다.
```

<br>

### 로컬에서 실행 방법

```
git clone https://lab.ssafy.com/s05-webmobile1-sub3/S05P13A608.git
cd frontend
npm i
npm start
```

<br>

### 프론트엔드 빌드 및 배포

- 프로젝트 폴더 내에 있는 frontend 디렉토리의 루트 경로에서 다음의 명령어를 실행합니다.
- frontend 경로에 다음과 같은 Dockerfile이 있습니다. 이를 이용하여 Docker Container를 이용하여 프론트엔드를 배포할 준비를 합니다.
- Nginx와 react가 함께 배포됩니다.

```bash
# Dockerfile

# nginx 이미지를 사용합니다. 뒤에 tag가 없으면 latest 를 사용합니다.
FROM nginx

# root 에 app 폴더를 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# work dir 에 build 폴더 생성 /app/build
RUN mkdir ./build

# host pc의 현재경로의 build 폴더를 workdir 의 build 폴더로 복사
ADD ./build ./build

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d

# 80 포트 오픈
EXPOSE 80

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]
```

이후에는 다음의 명령어를 차례로 입력하여 module 설치 및 빌드, docker 이미지를 만드는 과정을 거칩니다. 그 이후에 배포를 완료합니다.

<br>

```bash
# module 설치
npm install

# 빌드 파일 생성
CI=false npm run build

# 도커 이미지 빌드
docker build -t nginx-react:0.1 .

# 도커 컨테이너를 이용한 프론트엔드 배포
docker run --name nginx_react -d -p 3000:80 nginx-react:0.1
```
