# backend+frontend 실행 방법

```
모든 과정은 intelliJ 기준으로 설명되어있습니다.
```

- 작성자: 서영은

## build 없이 실행시키기

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d3f1fa5e-4937-4689-85ce-0341a0160e0e/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210723%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210723T065044Z&X-Amz-Expires=86400&X-Amz-Signature=b84564b2704f22fc3c477cb641b67a7e9930a647667f89c0560f0969db2e5b3b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

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