const express = require("express");
const path = require('path');

const router = express.Router();

const cacheDeck = async (client, req) => {
  let key = {
    'client': req.ip,
    'deck': req.params.deck
  }

  let value = {
    'body': req.body
  };

  await client.hSet('deckLoaded', JSON.stringify(key), JSON.stringify(value));
};


router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'www/build', 'index.html'));
});

router.post("/deckLoaded/:deck", async (req, res) => {
  let socket = req.app.get('socketIo');
  let redis = req.app.get('redis');

  socket.emit("deckLoaded", {
    "client": req.ip,
    "deck": req.params.deck,
    "body": req.body
  });

  await cacheDeck(redis, req);
  res.send().status(200);
});

router.post("/updateDeck/:deck", (req, res) => {
  let socket = req.app.get('socketIo');
  socket.emit("updateDeck", {
    "client": req.ip,
    "deck": req.params.deck,
    "body": req.body
  });

  res.send().status(200);
});

router.post("/updateMasterClock", (req, res) => {
  let socket = req.app.get('socketIo');
  socket.emit("updateMasterClock", {
    "client": req.ip,
    "body": req.body
  });

  res.send().status(200);
});

router.post("/updateChannel/:channel", (req, res) => {
  let socket = req.app.get('socketIo');
  socket.emit("updateChannel", {
    "client": req.ip,
    "channel": req.params.channel,
    "body": req.body
  });

  res.send().status(200);
});

module.exports = router;
