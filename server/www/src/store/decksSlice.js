import { createSlice } from '@reduxjs/toolkit'

const initDeckstate = {
  album: null,
  artist: null,
  bpm: 0,
  comment: null,
  comment2: null,
  elapsedTime: 0,
  filePath: null,
  genre: null,
  gridOffset: null,
  isKeyLockOn: null,
  isPlaying: false,
  isSynced: false,
  key: null,
  keyText: null,
  label: null,
  mix: null,
  nextCuePos: null,
  remixer: null,
  resultingKey: null,
  tempo: 0,
  title: null,
  trackLength: 0
};

export const decksSlice = createSlice({
  name: 'decks',
  initialState: {
  },
  reducers: {
    setElapsedTime: (state, action) => {
      if(state[action.payload.client] && state[action.payload.client][action.payload.deck]){
        state[action.payload.client][action.payload.deck].elapsedTime = action.payload.elapsedTime
      }
    },
    setNextCuePos: (state, action) => {
      if(state[action.payload.client] && state[action.payload.client][action.payload.deck]){
        state[action.payload.client][action.payload.deck].nextCuePos = action.payload.nextCuePos
      }
    },
    loadDeck: (state, action) => {
      state[action.payload.client] = state[action.payload.client] || {};

      state[action.payload.client][action.payload.deck] = {
        ...initDeckstate,
        ...action.payload.body
      }
    },
  },
})

export const { setElapsedTime, setNextCuePos, loadDeck } = decksSlice.actions
export default decksSlice.reducer
