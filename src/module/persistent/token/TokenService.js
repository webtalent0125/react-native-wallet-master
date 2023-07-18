import axios from 'axios';
import WalletModule from '../../etherjs/WalletModule';
import { ApplicationProperties } from '../../../ApplicationProperties';
import { LMStorageService } from '../storage/LMStorageService';
import { LMStorageConstant } from '../storage/LMStorageConstant';
import _ from 'lodash';

async function addCustomToken(token) {
  const customs =
    (await LMStorageService.getItem(LMStorageConstant.CUSTOM_TOKENS_STORAGE_KEY)) || [];
  const commonTokens =
    (await LMStorageService.getItem(LMStorageConstant.COMMON_TOKENS_STORAGE_KEY)) ||
    ApplicationProperties.COMMON_TOKENS;
  if (
    customs.findIndex((x) => x.address === token.address) === -1 &&
    commonTokens.findIndex((x) => x.address === token.address) === -1
  )
    await LMStorageService.setItem(LMStorageConstant.CUSTOM_TOKENS_STORAGE_KEY, [
      ...customs,
      {
        name: '',
        symbol: token.symbol,
        decimals: token.decimals,
        address: token.address,
        platform: token.platform,
        slug: token.slug,
      },
    ]);
}

async function removeCustomToken(token) {
  const customs =
    (await LMStorageService.getItem(LMStorageConstant.CUSTOM_TOKENS_STORAGE_KEY)) || [];
  const newCustoms = customs.filter(el => el.address !== token.address)
  await LMStorageService.setItem(LMStorageConstant.CUSTOM_TOKENS_STORAGE_KEY, newCustoms)
}

async function getTokens(name) {
  const { data } = await axios.get(ApplicationProperties.TOKEN_URLS[name]);
  return data;
}

async function getCommonBaseTokens() {
  return (
    (await LMStorageService.getItem(LMStorageConstant.COMMON_TOKENS_STORAGE_KEY)) ||
    ApplicationProperties.COMMON_TOKENS
  );
}

async function getCustomTokens() {
  return (await LMStorageService.getItem(LMStorageConstant.CUSTOM_TOKENS_STORAGE_KEY)) || [];
}

async function isExist(tokenContractAddress) {
  const tokens = (await LMStorageService.getItem(LMStorageConstant.TOKENS_STORAGE_KEY)) || [];
  const index = _.findIndex(tokens, function (token) {
    return (token.address = tokenContractAddress);
  });
  return index == -1 ? false : true;
}

async function validateToken(wallet, address) {
  const axiosInstance = axios.create({
    baseURL: ApplicationProperties.COINMARKETCAP_API_URL,
    headers: {
      'X-CMC_PRO_API_KEY': ApplicationProperties.COINMARKETCAP_API_KEY,
    },
  });
  try {
    const { data } = await axiosInstance.get('cryptocurrency/info?address=' + address);
    if (data.status.error_code === 0) {
      const tokenBalance = await WalletModule.assetBalance(wallet.address, address);
      return {
        success: true,
        data: tokenBalance,
        tokenDetail: data.data,
      };
    }
  } catch {
    return {
      success: false,
      data: null,
    };
  }
}

async function getWatchLists() {
  return (await LMStorageService.getItem(LMStorageConstant.WATCHLISTS_STORAGE_KEY)) || [];
}

async function addToWatchList(symbol, slug) {
  const watchLists =
    (await LMStorageService.getItem(LMStorageConstant.WATCHLISTS_STORAGE_KEY)) || [];
  const index = watchLists.findIndex((x) => x.slug === slug);
  if (index < 0) {
    const newWatchLists = [...watchLists, { symbol, slug }];
    await LMStorageService.setItem(LMStorageConstant.WATCHLISTS_STORAGE_KEY, newWatchLists);
    return newWatchLists;
  } else {
    return watchLists;
  }
}

async function removeFromWatchList(slug) {
  const watchLists =
    (await LMStorageService.getItem(LMStorageConstant.WATCHLISTS_STORAGE_KEY)) || [];
  const index = watchLists.findIndex((x) => x.slug === slug);
  if (index > -1) {
    watchLists.splice(index, 1);
    await LMStorageService.setItem(LMStorageConstant.WATCHLISTS_STORAGE_KEY, watchLists);
    return watchLists;
  } else {
    return watchLists;
  }
}

export const TokenService = {
  getTokens,
  getCommonBaseTokens,
  getCustomTokens,
  addCustomToken,
  removeCustomToken,
  isExist,
  validateToken,
  getWatchLists,
  addToWatchList,
  removeFromWatchList,
};
