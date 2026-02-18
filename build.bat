@echo off
set IMAGE_NAME=shop
set TAG=latest

echo [1/4] Spring Clean...
call ./gradlew clean
:: 만약 Maven을 사용한다면: call mvn clean

echo [2/4] Spring Build...
call ./gradlew bootJar
:: 만약 Maven을 사용한다면: call mvn package

echo [3/4] Docker Image Delete...
docker rmi -f %IMAGE_NAME%:%TAG%

echo [4/4] Docker Image Build...
docker build -t %IMAGE_NAME%:%TAG% .

echo Docker Run...
docker run -d --name shop --network db -p 80:80-e SPRING_PROFILES_ACTIVE=prop  shop

echo 모든 작업이 완료되었습니다!
pause