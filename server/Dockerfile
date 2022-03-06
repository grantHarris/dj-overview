FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
CMD node app.js
EXPOSE 8080
