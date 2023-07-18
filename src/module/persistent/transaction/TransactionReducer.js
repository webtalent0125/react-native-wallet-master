import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const TransactionReducer = createSlice({
  name: 'transaction',
  initialState: {
    gasPrice: 0,
  },
  reducers: {
    getGasPrice(state, { payload }) {
      state.gasPrice = payload;
    },
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = TransactionReducer;
// Extract and export each action creator by name
export const { getGasPrice } = actions;
// Export the reducer, either as a default or named export
export default reducer;
