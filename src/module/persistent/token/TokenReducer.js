import { createSlice } from '@reduxjs/toolkit';

const TokenReducer = createSlice({
  name: 'token',
  initialState: {
    commonTokens: [],
    customTokens: [],
    watchLists: [],
  },
  reducers: {
    getTokensSuccess(state, { payload }) {
      state.commonTokens = payload.commonTokens;
      state.customTokens = payload.customTokens;
    },
    addCustomTokenSuccess(state, { payload }) {},
    getWatchListSuccess(state, { payload }) {
      state.watchLists = payload;
    },
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = TokenReducer;
// Extract and export each action creator by name
export const { getTokensSuccess, addCustomTokenSuccess, getWatchListSuccess } = actions;
// Export the reducer, either as a default or named export
export default reducer;
