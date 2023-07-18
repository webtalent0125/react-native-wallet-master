import axios from 'axios';
import { CurrencyService } from './CurrencyService';
import {
  getCurrencySuccess,
  getQuotesSuccess,
  getTrendingSuccess,
  getTopTrendingSuccess,
} from './CurrencyReducer';
import { ApplicationProperties } from '../../../ApplicationProperties';

const CMCAPI_instance = axios.create({
  baseURL: ApplicationProperties.COINMARKETCAP_API_URL,
  headers: {
    'X-CMC_PRO_API_KEY': ApplicationProperties.COINMARKETCAP_API_KEY,
  },
});

function getCurrency(token = 'ETH') {
  return async (dispatch) => {
    const currency = await CurrencyService.getCurrency(token);
    dispatch(getCurrencySuccess(currency));
  };
}

function getQuotes(tokenString) {
  return async (dispatch) => {
    const data = await CMCAPI_instance.get('cryptocurrency/quotes/latest?slug=' + tokenString);
    if (data.data.status.error_code === 0) {
      let quoteDataNew = {};
      const quotesData = data.data.data;
      Object.keys(quotesData).forEach((key) => {
        quoteDataNew[quotesData[key]['symbol']] = quotesData[key];
      });

      dispatch(getQuotesSuccess(quoteDataNew));
    }
    return data.data;
  };
}

function getTopTrending() {
  return async (dispatch) => {
    let trendingData = [];
    const gainers = await CMCAPI_instance.get('cryptocurrency/trending/gainers-losers?limit=3');
    if (gainers.data.status.error_code === 0) {
      trendingData = [...trendingData, ...gainers.data.data];
    }
    const losers = await CMCAPI_instance.get(
      'cryptocurrency/trending/gainers-losers?limit=3&sort_dir=asc'
    );
    if (losers.data.status.error_code === 0) {
      trendingData = [...trendingData, ...losers.data.data];
    }
    dispatch(getTrendingSuccess(trendingData));
  };
}

function getLatestTrending() {
  return async (dispatch) => {
    const latesttrending = await CMCAPI_instance.get('cryptocurrency/trending/latest?limit=10');
    if (latesttrending.data.status.error_code === 0)
      dispatch(getTopTrendingSuccess(latesttrending.data.data));
  };
}

export const CurrencyAction = {
  getCurrency,
  getQuotes,
  getTopTrending,
  getLatestTrending,
};
