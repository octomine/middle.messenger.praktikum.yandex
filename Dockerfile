FROM node:latest

RUN apt update && apt install -y nodejs && apt install -y npm
WORKDIR /var/www/
COPY . ./
CMD echo $PWD && ls -la
