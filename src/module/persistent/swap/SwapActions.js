import { SwapServices } from './SwapServices';

function getQuotes(tokenFrom, tokenTo, chainId, slippage, wallet) {
  return async (dispatch) => {
    const result = await SwapServices.getQuotes(tokenFrom, tokenTo, chainId, slippage, wallet);
    return result;
  };
}

function healthcheck(chainId) {
  return async (dispatch) => {
    const result = await SwapServices.healthcheck(chainId);
    return result;
  };
}

function swapToken(chainId, wallet, quote) {
  return async (dispatch) => {
    const result = await SwapServices.swapToken(chainId, wallet, quote);
    return result;
  };
}

function approveToken(tokenFrom, tokenTo, chainId, slippage, wallet) {
  return async (dispatch) => {
    const result = await SwapServices.approveToken(tokenFrom, tokenTo, chainId, slippage, wallet);
    return result;
  };
}

export const SwapActions = {
  getQuotes,
  healthcheck,
  swapToken,
  approveToken,
};
