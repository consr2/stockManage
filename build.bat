@echo off
set IMAGE_NAME=shop
set TAG=latest

echo [1/5] Stop and Remove Container...
docker stop shop >nul 2>&1
docker rm shop >nul 2>&1

echo [2/5] Spring Clean...
call ./gradlew clean

echo [3/5] Spring Build...
call ./gradlew bootJar

echo [4/5] Docker Image Delete...
docker rmi -f %IMAGE_NAME%:%TAG% 2>nul

echo [5/5] Docker Image Build...
docker build -t %IMAGE_NAME%:%TAG% .

echo [[[  Docker Run...  ]]]
docker run -d --name shop --network db -p 80:80 -e SPRING_PROFILES_ACTIVE=prop -e TZ=Asia/Seoul %IMAGE_NAME%:%TAG%

echo [[[  Docker upload Repository  ]]]
docker rmi consr4861/shop

docker tag shop consr4861/shop

docker push consr4861/shop

echo [End] Finshed Work!
pause


