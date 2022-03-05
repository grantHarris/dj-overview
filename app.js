const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require('body-parser');
const routes = require("./routes");
const path = require('path');

const port = process.env.PORT || 8081;

const app = express();

app.use(express.static(path.join(__dirname, 'www/build')));

app.use(bodyParser.json());
app.use(routes);

const server = http.createServer(app);

const io = socketIo(server, {
	cors: {
    	origin: '*',
 }});

app.set('socketIo', io);

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
