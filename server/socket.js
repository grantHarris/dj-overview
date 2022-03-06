const socketIo = require("socket.io");

const populateCachedDeckData = async (client, socket) => {
  let cachedDeckLoaded = await client.hGetAll('deckLoaded');

  for (const [key, value] of Object.entries(cachedDeckLoaded)) {
    socket.emit('deckLoaded', {
      ...JSON.parse(key),
      ...JSON.parse(value)
    })
  }

}


const connection = async (client) => async (socket) => {
  console.log('New web client connected');
  populateCachedDeckData(client, socket);

  socket.on('disconnect', () => {
    console.log('Web client disconnected');
  });
}

const setupSocketIo = async (server, app) => {
  const io = socketIo(server, {
    cors: {
        origin: '*',
   }});

  app.set('socketIo', io);
  io.on('connection', await connection(app.get('redis')));
};


module.exports = setupSocketIo;
