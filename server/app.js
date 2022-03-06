const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');

const routes = require("./routes");
const setupSocketIo = require("./socket");

const port = process.env.PORT || 8080;

const setupRedis = async (app) => {
  const client = redis.createClient({
    socket:{
      host: 'redis'
    }
  });

  console.log('Waiting for Redis...');
  await client.connect();
  console.log('Redis connected.');
  app.set('redis', client);
};

(async () => {
  const app = express();
  const server = http.createServer(app);

  await setupRedis(app);
  await setupSocketIo(server, app);

  app.use(express.static(path.join(__dirname, 'www/build')));
  app.use(bodyParser.json());
  app.use(routes);

  server.listen(port, () => console.log(`Listening on port ${port}`));

})();
