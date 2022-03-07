const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'www/build', 'index.html'));
});

const cacheDeck = async (req, client) => {
  const key = JSON.stringify({
    'client': req.ip,
    'deck': req.params.deck
  });

  const value = {
    'body': req.body
  };

  await client.hSet('deckLoaded', key,  JSON.stringify(value));
};

const cacheUpdateDeck = async (req, client) => {
  console.log(req.params);
  const key = JSON.stringify({
    'client': req.ip,
    'deck': req.params.deck
  });

  const existingData = client.hGet('deckLoaded', key);

  if (existingData){
    console.log('existingData');
    await client.hSet('deckLoaded', key, JSON.stringify({
      'body': {
        ...existingData.body,
        ...req.body
      }
    })); 
  }else{
    console.log('not existingData');
    await client.hSet('deckLoaded', key, JSON.stringify({
      'body': req.body
    }));
  }


};

router.post('/deckLoaded/:deck', async (req, res) => {
  const socket = req.app.get('socketIo');
  const redis = req.app.get('redis');

  socket.emit('deckLoaded', {
    'client': req.ip,
    'deck': req.params.deck,
    'body': req.body
  });

  cacheDeck(req, redis);
  res.send().status(200);
});

router.post('/updateDeck/:deck', (req, res) => {
  const socket = req.app.get('socketIo');
  const redis = req.app.get('redis');

  socket.emit('updateDeck', {
    'client': req.ip,
    'deck': req.params.deck,
    'body': req.body
  });

  //cacheUpdateDeck(req, redis);

  res.send().status(200);
});

router.post('/updateMasterClock', (req, res) => {
  const socket = req.app.get('socketIo');
  socket.emit('updateMasterClock', {
    'client': req.ip,
    'body': req.body
  });

  res.send().status(200);
});

router.post('/updateChannel/:channel', (req, res) => {
  const socket = req.app.get('socketIo');
  socket.emit('updateChannel', {
    'client': req.ip,
    'channel': req.params.channel,
    'body': req.body
  });

  res.send().status(200);
});

module.exports = router;
