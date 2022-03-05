const express = require("express");
const path = require('path');

const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'www/build', 'index.html'));
});

router.post("/deckLoaded/:deck", (req, res) => {
  let socket = req.app.get('socketIo');
  socket.emit("deckLoaded", {
    "client": req.ip,
    "deck": req.params.deck,
    "body": req.body
  });

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
