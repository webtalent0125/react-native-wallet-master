import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';
import { LMStorageService } from '../storage/LMStorageService';
import { LMStorageConstant } from '../storage/LMStorageConstant';

const WalletReducer = createSlice({
  name: 'wallet',
  initialState: {
    wallets: [],
    activeWallet: {},
    rawActiveWallet: {},
    transactions: [],
  },
  reducers: {
    addWalletSuccess(state, { payload }) {
      state.wallets = [...state.wallets, payload];
    },
    updateWallets(state, { payload }) {
      const index = _.findIndex(state.wallets, function (wallet) {
        return wallet.address === payload.address;
      });

      state.wallets[index] = payload;

      LMStorageService.setItem(LMStorageConstant.WALLETS_STORAGE_KEY, state.wallets);
    },
    setActiveWalletSuccess(state, { payload }) {
      state.activeWallet = payload;
    },
    setRawActiveWalletSuccess(state, { payload }) {
      state.rawActiveWallet = payload;
    },
    getTransactionsSuccess(state, { payload }) {
      state.transactions = payload;
    },
    getWalletsSuccess(state, { payload }) {
      state.wallets = payload;
    },
  },
});
// Extract the action creators object and the reducer
const { actions, reducer } = WalletReducer;
// Extract and export each action creator by name
export const {
  addWalletSuccess,
  setActiveWalletSuccess,
  setRawActiveWalletSuccess,
  getTransactionsSuccess,
  getWalletsSuccess,
  updateWallets,
} = actions;
// Export the reducer, either as a default or named export
export default reducer;
