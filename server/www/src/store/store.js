import { configureStore } from '@reduxjs/toolkit'
import decksReducer from './decksSlice'
import masterReducer from './masterSlice'

export default configureStore({
  reducer: {
    decks: decksReducer,
    master: masterReducer,
  },
})