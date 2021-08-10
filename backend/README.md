# backend+frontend 실행 방법

```
모든 과정은 intelliJ 기준으로 설명되어있습니다.
```

- 작성자: 서영은

## build 없이 실행시키기

![image](/uploads/195eedfb85eae5f2b6441a2adcb6062a/image.png)

오른쪽에 Gradle 탭을 누르고 Tasks → application 탭의 bootRun을 누른 후, frontend 및 backend 프로그램에 이상이 없으면, frontend 파일의 빌드가 먼저 이루어진 후 서버가 실행됩니다.

## build 결과물 얻기

backend root 경로에서

```bash
gradle clean build
```

를 입력하면, build/libs 경로에 homedong-1.0-SNAPSHOT.jar 라는 빌드 결과물이 생깁니다. 이 결과물로 배포가 가능합니다.

build/libs 경로로 이동하여 아래의 실행시키면 됩니다.

```bash
java -jar homedong-1.0-SNAPSHOT.jar
```


## Redis 실행시키기
로컬 개발 환경에서 이 과정이 생략되면 Spring Boot 서버가 실행되지 않습니다.

```bash
docker run -p 6379:6379 --name redis_db -d redis

docker exec -i -t redis_db redis-cli
```
위 두가지 명령어를 차례로 실행시키면, 도커로 redis를 실행시켜서 Spring Boot 서버가 정상 작동 됩니다.