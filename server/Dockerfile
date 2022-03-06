FROM node:alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
WORKDIR /app/www
RUN npm install
RUN npm run build
WORKDIR /app
CMD node app.js
EXPOSE 8080
