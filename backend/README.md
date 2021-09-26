# backend 실행 방법

```
모든 과정은 intelliJ 기준으로 설명되어있습니다.
```



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



## Openvidu 배포

---

- 오픈비두를 배포하기 root 권한을 얻어야 함

```bash
sudo su
```

- 오픈비두를 설치하기 위해 권장되는 경로인 `/opt`로 이동

```bash
cd /opt
```

- 오픈비두 설치

```bash
curl <https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh> | bash
```

- 설치 후 오픈비두가 설치된 경로로 이동

```bash
$ cd openvidu
```

- 도메인 또는 퍼블릭IP와 오픈비두와 통신을 위한 환경설정

```bash
$ nano .env

# OpenVidu configuration
# ----------------------
# 도메인 또는 퍼블릭IP 주소
DOMAIN_OR_PUBLIC_IP=i5a608.p.ssafy.io

# 오픈비두 서버와 통신을 위한 시크릿
OPENVIDU_SECRET=HOMEDONG

# Certificate type
CERTIFICATE_TYPE=letsencrypt

# 인증서 타입이 letsencrypt일 경우 이메일 설정
LETSENCRYPT_EMAIL=user@example.com

# HTTP port
HTTP_PORT=8442

# HTTPS port(해당 포트를 통해 오픈비두 서버와 연결)
HTTPS_PORT=8443

```

- 설정 후 오픈비두 서버 실행(`ctrl + c`를 누르면 백그라운드로 실행됨)

```bash
$ ./openvidu start

Creating openvidu-docker-compose_coturn_1          ... done
Creating openvidu-docker-compose_app_1             ... done
Creating openvidu-docker-compose_kms_1             ... done
Creating openvidu-docker-compose_nginx_1           ... done
Creating openvidu-docker-compose_redis_1           ... done
Creating openvidu-docker-compose_openvidu-server_1 ... done

----------------------------------------------------

   OpenVidu Platform is ready!
   ---------------------------

   * OpenVidu Server: https://DOMAIN_OR_PUBLIC_IP/

   * OpenVidu Dashboard: https://DOMAIN_OR_PUBLIC_IP/dashboard/

----------------------------------------------------

```

## 버전

IDE 버전

- Intellij 2021.1.3 / Intellij 2020.1.1

JVM, jdk (java) 버전

- openjdk version "1.8.0_192"
  OpenJDK Runtime Environment (Zulu 8.33.0.1-win64) (build 1.8.0_192-b01)
  OpenJDK 64-Bit Server VM (Zulu 8.33.0.1-win64) (build 25.192-b01, mixed mode)

배포 라이브러리 버전

- Gradle 6.4.1

## git clone 및 배포 과정

### 1. git clone

```bash
git clonehttps://lab.ssafy.com/s05-webmobile1-sub3/S05P13A608.git
```

### 2. redis_db 배포

해당 프로젝트에서는 redis를 사용하였습니다.  도커를 이용하여 redis를 다음과 같이 실행합니다. 백엔드 배포 전에 이 과정이 반드시 선행되어야 합니다.

```bash
docker run -p 8379:6379 --name redis_db -d redis
```


### 4. 백엔드 빌드 및 배포 과정

- 프로젝트 폴더 내에 있는 backend 디렉토리의 루트 경로에서 다음의 명령어를 실행합니다.
- backend 경로에 다음과 같은 Dockerfile이 있습니다. 이를 이용하여 Docker Container를 이용하여 프론트엔드를 배포할 준비를 합니다.

```bash
# Dockerfile

FROM java:8
VOLUME /tmp
EXPOSE 8080
ARG JAR_FILE=build/libs/homedong-1.0-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
ARG DEBIAN_FRONTEND=noninteractive
ENV TZ=Asia/Seoul
RUN apt-get install -y tzdata
```

이후에는 다음의 명령어를 차례로 입력하여 module 설치 및 빌드, docker 이미지를 만드는 과정을 거칩니다. 그 이후에 배포를 완료합니다.

```bash
gradle clean build

docker build -t homedong_backend:0.1 .

docker run --name homedong -d -p 8080:8080 homedong_backend:0.1
```

### 5. backend gradle 의존성

```bash
import org.apache.tools.ant.filters.ReplaceTokens

buildscript{
    ext {
        springBootVer = '2.4.5'
        querydslVer = '4.4.0'
        querydslPluginVer = '1.0.10'
        springDependencyMgmtVer = '1.0.11'
        springLoadedVer = '1.2.8'
        nodePluginVer = '1.3.1'
    }
    repositories {
        mavenCentral()
        jcenter()
    }
    dependencies {
        classpath "org.springframework.boot:spring-boot-gradle-plugin:${springBootVer}"
        classpath "io.spring.gradle:dependency-management-plugin:${springDependencyMgmtVer}.RELEASE"
        classpath "org.springframework:springloaded:${springLoadedVer}.RELEASE"
        classpath "com.github.node-gradle:gradle-node-plugin:3.1.0"
    }
}

plugins {
    id 'java'
    id 'idea'
    id 'org.springframework.boot' version "${springBootVer}"
}

apply plugin: 'io.spring.dependency-management'
apply plugin: 'eclipse'
apply plugin: 'com.github.node-gradle.node'
apply plugin: 'idea'

repositories {
    mavenCentral()
    maven { url 'https://repo.spring.io/snapshot' }
    maven { url 'https://repo.spring.io/milestone' }
    maven { url "https://repo.spring.io/libs-release" }
    maven { url "https://repo.maven.apache.org/maven2" }
    maven { url "https://build.shibboleth.net/nexus/content/repositories/releases" }
}

group 'com.calisthenics'
version '1.0-SNAPSHOT'
sourceCompatibility = '1.8'

node {
    download = true
    version = '14.17.0'
    // Set the work directory where node_modules should be located
    nodeModulesDir = file("${project.projectDir}/../frontend")
}

configurations {
    providedRuntime
}

def buildTime() {
    def date = new Date()
    def formattedDate = date.format('yyyyMMdd_HHmm')
    return formattedDate
}

project.ext.set("build.date", buildTime())

processResources {
    with copySpec {
        from "src/main/resources"
        include "**/application*.yml"
        include "**/application*.yaml"
        include "**/application*.properties"
        project.properties.findAll().each {
            prop ->
                if (prop.value != null) {
                    filter(ReplaceTokens, tokens: [ (prop.key): String.valueOf(prop.value)])
                    filter(ReplaceTokens, tokens: [ ('project.' + prop.key): String.valueOf(prop.value)])
                    filter(ReplaceTokens, tokens: [ ('project.ext.' + prop.key): String.valueOf(prop.value)])
                }
        }
    }
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-websocket")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-actuator")
    implementation("org.springframework.plugin:spring-plugin-core:2.0.0.RELEASE")
    testImplementation("org.springframework.security:spring-security-test")
    annotationProcessor("org.springframework.boot:spring-boot-starter-data-jpa")
    runtimeOnly("mysql:mysql-connector-java")
    runtimeOnly("org.springframework.boot:spring-boot-devtools")
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")

    implementation('commons-io:commons-io:2.6')
    implementation("org.apache.commons:commons-collections4:4.4")
    implementation("org.apache.commons:commons-lang3:3.9")

    implementation("com.querydsl:querydsl-jpa:${querydslVer}")
    implementation("com.querydsl:querydsl-apt:${querydslVer}")

    //STOMP 웹소캣 서버 사이드 테스트를 위한 의존성 추가
    implementation("org.springframework.boot:spring-boot-starter-mustache")
    //STOMP 관련 프론트 라이브러리
    implementation('org.webjars.bower:jquery:3.3.1')
    implementation('org.webjars:sockjs-client:1.1.2')
    implementation('org.webjars:stomp-websocket:2.3.3-1')
    implementation('org.webjars:webjars-locator:0.30')
    //WebRTC 클라이언트 의존성 추가
    implementation('org.webjars.bower:webrtc-adapter:7.4.0')
    //Kurento (미디어서버) 관련 의존성 추가
    implementation('org.kurento:kurento-client:6.16.0')
    implementation('org.kurento:kurento-utils-js:6.15.0')

    //IntelliJ용
    //IntelliJ에서는 하기 annotationProcessor를 쓰면 별도의 querydsl 플러그인 및 플러그인 설정이 불필요.
    annotationProcessor("com.querydsl:querydsl-apt:${querydslVer}:jpa")

    implementation("com.squareup.retrofit2:retrofit:2.7.1")
    implementation("com.squareup.retrofit2:converter-jackson:2.7.1")
    implementation("com.squareup.okhttp3:logging-interceptor:3.9.0")

    implementation("com.google.guava:guava:29.0-jre")
    annotationProcessor("com.google.guava:guava:29.0-jre")

    testImplementation("com.jayway.jsonpath:json-path:2.4.0")

    implementation("com.auth0:java-jwt:3.10.3")

    implementation("io.springfox:springfox-swagger2:3.0.0")
    implementation("io.springfox:springfox-swagger-ui:3.0.0")
    implementation("io.springfox:springfox-data-rest:3.0.0")
    implementation("io.springfox:springfox-bean-validators:3.0.0")
    implementation("io.springfox:springfox-boot-starter:3.0.0")

    compile("javax.annotation:javax.annotation-api:1.2")

    implementation("org.projectlombok:lombok:1.18.20")
    annotationProcessor("org.projectlombok:lombok:1.18.20")

    implementation('org.springframework.boot:spring-boot-starter-test')

    // 추가
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    runtimeOnly 'com.h2database:h2'

    // jwt 관련 의존성
    compile group: 'io.jsonwebtoken', name: 'jjwt-api', version: '0.11.2'
    runtime group: 'io.jsonwebtoken', name: 'jjwt-impl', version: '0.11.2'
    runtime group: 'io.jsonwebtoken', name: 'jjwt-jackson', version: '0.11.2'

    // mariaDB
    runtimeOnly 'org.mariadb.jdbc:mariadb-java-client' // MariaDB
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-jdbc
    implementation group: 'org.springframework.boot', name: 'spring-boot-starter-jdbc', version: '2.5.2'

    implementation 'org.springframework.boot:spring-boot-starter-mail'
    
    // Openvidu 의존성
    implementation group: 'io.openvidu', name: 'openvidu-java-client', version: '2.18.0'

    // redis cache 의존성
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-data-redis
    implementation group: 'org.springframework.boot', name: 'spring-boot-starter-data-redis', version: '2.5.0'
    // https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-cache
    implementation group: 'org.springframework.boot', name: 'spring-boot-starter-cache', version: '2.4.3'

}

test {
    useJUnitPlatform()
}
```

### 6. Nginx 설정과 ssl 인증서 발급 및 적용

Openvidu 같은 경우, 카메라를 사용하기 위해서는 반드시 https로 이용해야 하기에 SSL 인증서를 발급받아야 합니다. 인증서 발급을 위해서는 도메인이 필요합니다.

먼저 nginx를 다운 받습니다.

```bash
# 설치
sudo apt-get install nginx

# 설치 확인 및 버전 확인
nginx -v
```

letsencrypt 설치를 위해 다음과 같은 순서로 명령어를 입력합니다.

```bash
sudo apt-get install letsencrypt

sudo systemctl stop nginx

sudo letsencrypt certonly --standalone -d www제외한 도메인 이름
```

이렇게 한 후, "Congratulations!"로 시작하는 문구가 보이면, 인증서 발급이 완료된 것입니다.

인증서 발급 후, /etc/nginx/sites-available로 이동한 후, 적절한 이름의 파일을 생성하여 다음과 같이 작성합니다.

```bash
server {

        location /{
                proxy_pass http://localhost:3000;
        }

        location /api {
                proxy_pass http://localhost:8080/api;
        }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/i5a608.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/i5a608.p.ssafy.io/privkey.pem; # managed by Certbot
    # include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    # ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
    if ($host = i5a608.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot

        listen 80;
        server_name i5a608.p.ssafy.io;
    return 404; # managed by Certbot
}
```

그 후에 차례로 명령을 실행한다. 

```bash
sudo ln -s /etc/nginx/sites-available/[파일명] /etc/nginx/sites-enabled/[파일명]

# 다음 명령어에서 successful이 뜨면 nginx를 실행할 수 있다.
sudo nginx -t

sudo systemctl restart nginx
```

이렇게 실행하면, http로 80포트 접근시, 443 포트(https)로 리다이렉트 된다. 그리고 백엔드 url을 /api/**로 분기처리할 수 있다. `https://도메인주소` 로 접근하면 배포한 웹 페이지에 접속할 수 있게된다. 이것으로 배포 과정을 마친다.

