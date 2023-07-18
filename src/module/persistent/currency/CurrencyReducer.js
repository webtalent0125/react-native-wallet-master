import { ApplicationProperties } from '../../../ApplicationProperties';
import { createSlice } from '@reduxjs/toolkit';

const CurrencyReducer = createSlice({
  name: 'currency',
  initialState: {
    currency: ApplicationProperties.DEFAULT_CURRENCY,
    quotes: null,
    trending: [],
    toptrending: [],
  },
  reducers: {
    getCurrencySuccess(state, { payload }) {
      let currency = {};
      for (const [key, value] of Object.entries(payload)) {
        currency = {
          key: key,
          value: value,
        };
      }
      state.currency = { ...state.currency, ...currency };
    },
    getQuotesSuccess(state, { payload }) {
      state.quotes = payload;
    },
    getTrendingSuccess(state, { payload }) {
      state.trending = payload;
    },
    getTopTrendingSuccess(state, { payload }) {
      state.toptrending = payload;
    },
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = CurrencyReducer;
// Extract and export each action creator by name
export const { getCurrencySuccess, getQuotesSuccess, getTrendingSuccess, getTopTrendingSuccess } = actions;
// Export the reducer, either as a default or named export
export default reducer;
