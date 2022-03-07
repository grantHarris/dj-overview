import React, { useEffect } from "react";

import socketIOClient from "socket.io-client";

import Traktor from './traktor/traktor'

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
        client: data.client,
        deck: data.deck,
        body: data.body
      }));
    });

    socket.on("updateDeck", data => {
      console.log('updateDeck', data, 'ssss');
      store.dispatch(setElapsedTime({
        client: data.client,
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


  const decks = useSelector(state => state.decks)

  return (
    <div className="App">
      <header className="App-header">
        {Object.keys(decks)
        .map(xxx=>(
          <Traktor name={xxx} traktor={decks[xxx]} />
        ))
      }
      </header>
    </div>
  );
}

export default App;
