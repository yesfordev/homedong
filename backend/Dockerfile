FROM java:8
VOLUME /tmp
EXPOSE 8082
ARG JAR_FILE=build/libs/homedong-1.0-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
