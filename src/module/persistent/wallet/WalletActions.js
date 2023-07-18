import { WalletService } from './WalletService';
import {
  addWalletSuccess,
  getTransactionsSuccess,
  getWalletsSuccess,
  setActiveWalletSuccess,
  setRawActiveWalletSuccess,
  updateWallets,
} from './WalletReducer';
import WalletModule from '../../etherjs/WalletModule';
import { LMStorageConstant } from '../storage/LMStorageConstant';
import { LMStorageService } from '../storage/LMStorageService';
import { TokenAction } from '../token/TokenAction';

function validateAssete(asset, wallet) {
  return async (dispatch) => {
    const tokenBalance = await WalletModule.tokenBalance(wallet.address, asset.address);
    if (tokenBalance !== null) {
      return { success: true, data: tokenBalance };
    } else {
      return { success: false };
    }
  };
}

function addAsset(asset, wallet) {
  return async (dispatch) => {
    let newwallet = wallet;
    if (wallet.assets) {
      const index = wallet.assets.findIndex((x) => x.contractAddress === asset.contractAddress);
      if (index === -1)
        newwallet = {
          ...wallet,
          assets: [...wallet.assets, asset],
        };
    }

    dispatch(updateWallets(newwallet));
    dispatch(TokenAction.addCustomTokens(asset));
    await LMStorageService.setItem(LMStorageConstant.ACTIVE_WALLET_STORAGE_KEY, newwallet);
    dispatch(setActiveWalletSuccess(newwallet));
    return { success: true, data: newwallet };
  };
}

function removeAsset(asset, wallet) {
  return async (dispatch) => {
    if (wallet.assets) {
      let assets = [...wallet.assets];

      const index = assets.findIndex((x) => x.contractAddress === asset.address);
      console.log("finded index", index);
      if (index > -1) {
        assets.splice(index, 1);
      }
      console.log("old assets", assets);
      const newwallet = {
        ...wallet,
        assets: assets,
      };
      console.log("new assets", newwallet);

      dispatch(updateWallets(newwallet));
      dispatch(TokenAction.removeCustomTokens(asset));
      await LMStorageService.setItem(LMStorageConstant.ACTIVE_WALLET_STORAGE_KEY, newwallet);
      dispatch(setActiveWalletSuccess(newwallet));
    }
    return { success: true };
  };
}

function getAssets(wallet) {
  return async (dispatch) => {
    const assets = [...wallet.assets];
    for (let i = 0; i < assets.length; i++) {
      const tokenbalance = await WalletModule.assetBalance(
        wallet.address,
        assets[i].contractAddress
      );
      assets[i] = {
        ...assets[i],
        balance: tokenbalance ? tokenbalance.balance : 0,
      };
    }
    const newWallet = {
      ...wallet,
      assets,
    };
    dispatch(setActiveWalletSuccess(newWallet));
    await LMStorageService.setItem(LMStorageConstant.ACTIVE_WALLET_STORAGE_KEY, newWallet);
    return { success: true, data: assets };
  };
}

function addFromMnemonic({ mnemonics }) {
  return async (dispatch) => {
    const { success, data } = await WalletService.fromMnemonic(mnemonics);
    if (success) {
      const wallets = (await LMStorageService.getItem(LMStorageConstant.WALLETS_STORAGE_KEY)) || [];
      const index = wallets.findIndex((x) => x.privateKey === data.privateKey);
      if (index > -1) {
        return {
          success: false,
          data: 'Wallet exist',
        };
      } else {
        const wallet = {
          name: '',
          privateKey: data.privateKey,
          address: data.address,
          balance: await WalletModule.getBalance(data),
          mainassets: await WalletModule.getDefaultAssets(data),
          assets: [
            {
              balance: 0,
              contractAddress: '0xF8fC63200e181439823251020d691312FDcF5090',
              decimals: 9,
              symbol: 'EXZO',
              platform: 'Binance Smart Chain',
            },
          ],
        };
        dispatch(getAssets(wallet));
        dispatch(addWalletSuccess(wallet));
        dispatch(getTransactions(data.address));
        await LMStorageService.setItem(LMStorageConstant.ACTIVE_WALLET_STORAGE_KEY, wallet);
        await setWallets(wallet);
        return { success, data };
      }
    } else {
      return {
        success,
        data: 'Invalid Seed Phrase.',
      };
    }
  };
}

async function setWallets(wallet) {
  const wallets = (await LMStorageService.getItem(LMStorageConstant.WALLETS_STORAGE_KEY)) || [];
  wallets.push(wallet);
  await LMStorageService.setItem(LMStorageConstant.WALLETS_STORAGE_KEY, wallets);
}

function setActiveWallet(wallet) {
  return async (dispatch) => {
    const { privateKey, name } = wallet;
    const { success, data } = await WalletService.fromPrivateKey(privateKey);

    if (success) {
      const newwallet = {
        name,
        privateKey: data.privateKey,
        address: data.address,
        balance: await WalletModule.getBalance(data),
      };
      dispatch(setActiveWalletSuccess(newwallet));
      dispatch(getAssets(wallet));
      // dispatch(setRawActiveWalletSuccess(data));
      dispatch(getTransactions(data.address));
      await LMStorageService.setItem(LMStorageConstant.ACTIVE_WALLET_STORAGE_KEY, newwallet);
      // dispatch(AssetAction.list(data.address,chainId));
    }
    return { success, data };
  };
}

function getActiveWallet() {
  return async (dispatch) => {
    let successed;
    const activeWallet = await LMStorageService.getItem(
      LMStorageConstant.ACTIVE_WALLET_STORAGE_KEY
    );
    if (activeWallet) {
      const { privateKey, name } = activeWallet;
      const { success, data } = await WalletService.fromPrivateKey(privateKey);
      console.log(data)

      if (success) {
        const Activewallet = {
          name,
          privateKey: data.privateKey,
          address: data.address,
          balance: await WalletModule.getBalance(data),
          mainassets: await WalletModule.getDefaultAssets(data),
          assets: activeWallet.assets,
          // assets: [],
        };
        dispatch(getAssets(Activewallet));
        dispatch(getTransactions(data.address));
        return { success, data: Activewallet };
      }
    } else {
      successed = false;
    }
    return { success: successed };
  };
}

function getWallets() {
  return async (dispatch) => {
    const wallets = (await LMStorageService.getItem(LMStorageConstant.WALLETS_STORAGE_KEY)) || [];
    const activeWallets = [];
    for (let i = 0; i < wallets.length; i++) {
      const wallet = wallets[i];
      const { data } = await WalletService.fromPrivateKey(wallet.privateKey);
      const activeWallet = {
        ...wallet,
        balance: await WalletModule.getBalance(data),
      };
      activeWallets.push(activeWallet);
    }
    dispatch(getWalletsSuccess(activeWallets));
  };
}

function removeWallet(wallet) {
  return async (dispatch) => {
    let wallets = (await LMStorageService.getItem(LMStorageConstant.WALLETS_STORAGE_KEY)) || [];
    const index = wallets.findIndex((x) => x.address === wallet.address);

    wallets.splice(index, 1);
    dispatch(getWalletsSuccess(wallets));
    await LMStorageService.setItem(LMStorageConstant.WALLETS_STORAGE_KEY, wallets);
    return {
      success: true,
    };
  };
}

function updateWalletName(wallet, newName) {
  return async (dispatch) => {
    let wallets = (await LMStorageService.getItem(LMStorageConstant.WALLETS_STORAGE_KEY)) || [];
    const index = wallets.findIndex((x) => x.address === wallet.address);

    wallets[index].name = newName;

    dispatch(getWalletsSuccess(wallets));
    await LMStorageService.setItem(LMStorageConstant.WALLETS_STORAGE_KEY, wallets);
    return {
      success: true,
    };
  };
}

function getTransactions(address) {
  return async (dispatch) => {
    const transactions = await WalletService.getTransactions(address);
    dispatch(getTransactionsSuccess(transactions));
  };
}

export const WalletActions = {
  addFromMnemonic,
  setActiveWallet,
  getActiveWallet,
  getWallets,
  addAsset,
  getAssets,
  getTransactions,
  validateAssete,
  removeAsset,
  removeWallet,
  updateWalletName,
};
