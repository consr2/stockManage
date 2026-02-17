# 1. 베이스 이미지 설정 (Java 버전 확인)
FROM amazoncorretto:17-alpine-jdk

# 2. 빌드된 jar 파일을 컨테이너로 복사
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar

# 3. 서버 실행 명령
ENTRYPOINT ["java", "-jar", "/app.jar"]