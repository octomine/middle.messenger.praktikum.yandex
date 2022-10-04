FROM node:latest

WORKDIR /var/www/
COPY . .
CMD echo $PWD && ls -la

EXPOSE 3000
RUN npm install
RUN npm run build

CMD npm start
