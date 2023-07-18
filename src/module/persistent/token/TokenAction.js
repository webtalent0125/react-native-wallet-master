import { TokenService } from './TokenService';
import { getTokensSuccess, getWatchListSuccess } from './TokenReducer';
import _, { set } from 'lodash';
import { CurrencyAction } from '../currency/CurrencyAction';

function getTokens() {
  return async (dispatch) => {
    const commonTokens = await TokenService.getCommonBaseTokens();
    const customTokens = await TokenService.getCustomTokens();
    const watchLists = await TokenService.getWatchLists();
    let tokenSymbols = [];
    for (let i = 0; i < commonTokens.length; i++) {
      tokenSymbols.push(commonTokens[i].slug);
    }
    for (let i = 0; i < customTokens.length; i++) {
      tokenSymbols.push(customTokens[i].slug);
    }
    for (let i = 0; i < watchLists.length; i++) {
      tokenSymbols.push(watchLists[i].slug);
    }
    tokenSymbols = [...new Set(tokenSymbols)];
    await dispatch(CurrencyAction.getQuotes(tokenSymbols.join(',')));
    await dispatch(getTokensSuccess({ commonTokens, customTokens }));
  };
}

function addCustomTokens(token) {
  return async (dispatch) => {
    await TokenService.addCustomToken(token);
    dispatch(getTokens());
  };
}

function removeCustomTokens(token) {
  return async (dispatch) => {
    await TokenService.removeCustomToken(token);
    dispatch(getTokens());
  };
}

function validateToken(wallet, address) {
  return async (dispatch) => {
    const TokenData = await TokenService.validateToken(wallet, address);
    return TokenData;
  };
}

function getWatchLists() {
  return async (dispatch) => {
    const watchLists = await TokenService.getWatchLists();
    dispatch(getWatchListSuccess(watchLists));
    return watchLists;
  };
}

function addToWatchList(symbol, slug) {
  return async (dispatch) => {
    const watchLists = await TokenService.addToWatchList(symbol, slug);
    await dispatch(getTokens()).then(async () => {
      await dispatch(getWatchListSuccess(watchLists));
    });
    return {
      success: true,
      data: watchLists,
    };
  };
}

function removeFromWatchList(slug) {
  return async (dispatch) => {
    const watchLists = await TokenService.removeFromWatchList(slug);
    dispatch(getWatchListSuccess(watchLists));
    dispatch(getTokens());
    return {
      success: true,
      data: watchLists,
    };
  };
}

export const TokenAction = {
  getTokens,
  addCustomTokens,
  removeCustomTokens,
  validateToken,
  getWatchLists,
  addToWatchList,
  removeFromWatchList,
};
