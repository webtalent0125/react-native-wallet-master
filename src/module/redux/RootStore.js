import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import WalletReducer from '../persistent/wallet/WalletReducer';
import UserReducer from '../persistent/user/UserReducer';
import NetworkReducer from '../persistent/network/NetworkReducer';
import CurrencyReducer from '../persistent/currency/CurrencyReducer';
import TransactionReducer from '../persistent/transaction/TransactionReducer';
import TokenReducer from '../persistent/token/TokenReducer';

const applicationStore = configureStore({
  reducer: {
    WalletReducer,
    UserReducer,
    NetworkReducer,
    CurrencyReducer,
    TransactionReducer,
    TokenReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export default applicationStore;
