@echo off
set IMAGE_NAME=shop
set TAG=latest

echo [1/5] Stop and Remove Container...
docker stop shop 2>nul
docker rm shop 2>nul

echo [2/5] Spring Clean...
call ./gradlew clean

echo [3/5] Spring Build...
call ./gradlew bootJar

echo [4/5] Docker Image Delete...
docker rmi -f %IMAGE_NAME%:%TAG% 2>nul

echo [5/5] Docker Image Build...
docker build -t %IMAGE_NAME%:%TAG% .

echo Docker Run...
docker run -d --name shop --network db -p 80:80 -e SPRING_PROFILES_ACTIVE=prop -e TZ=Asia/Seoul %IMAGE_NAME%

echo 모든 작업이 완료되었습니다!
pause


