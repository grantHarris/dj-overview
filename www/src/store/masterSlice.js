import { createSlice } from '@reduxjs/toolkit'

export const masterSlice = createSlice({
  name: 'master',
  initialState: {
    bpm: 0
  },
  reducers: {
    setMasterBpm: (state, action) => {
      state.bpm = action.payload
    },
  },
})

export const { setMasterBpm } = masterSlice.actions
export default masterSlice.reducer