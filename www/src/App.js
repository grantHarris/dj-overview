import React, { useEffect } from "react";

import socketIOClient from "socket.io-client";

import Deck from './traktor/deck'

import store from './store/store'

import { useSelector } from 'react-redux'


import { setElapsedTime, loadDeck } from './store/decksSlice'
import { setMasterBpm } from './store/masterSlice'


const ENDPOINT = "http://127.0.0.1:8080";

function App() {


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

    socket.on("deckLoaded", data => {
      store.dispatch(loadDeck({
        deck: data.deck,
        body: data.body
      }));
    });

    socket.on("updateDeck", data => {
      console.log('updateDeck', data, 'ssss');
      store.dispatch(setElapsedTime({
        deck: data.deck,
        elapsedTime: data.body.elapsedTime
      }));
    });


    socket.on("updateMasterClock", data => {
      console.log('updateMasterClock', data);

      store.dispatch(setMasterBpm({
        bpm: data.body.bpm
      }));

    });


    socket.on("updateChannel", data => {
      console.log('updateChannel', data);
    });


  }, []);


  const deckA = useSelector(state => state.decks['A'])
  const deckB = useSelector(state => state.decks['B'])
  const deckC = useSelector(state => state.decks['C'])
  const deckD = useSelector(state => state.decks['D'])



  return (
    <div className="App">

      <header className="App-header">
        <Deck deck={deckA} name="A" />
        <Deck deck={deckB} name="B" />
        <Deck deck={deckC} name="C" />
        <Deck deck={deckD} name="D" />

      </header>
    </div>
  );
}

export default App;
