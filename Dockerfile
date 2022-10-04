FROM node:latest

RUN apt update && apt install -y nodejs && apt install -y npm
CMD node -v
