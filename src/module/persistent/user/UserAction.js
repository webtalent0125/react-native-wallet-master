import { UserService } from './UserService';
import {
  clearDataSuccess,
  rememberMeSuccess,
  signInSuccess,
  signOutSuccess,
  signUpSuccess,
} from './UserReducer';
import CommonAPI from '../../api/CommonAPI';
import { ProviderModule } from '../../etherjs/ProviderModule';
import { WalletActions } from '../wallet/WalletActions';
import { NetworkAction } from '../network/NetworkAction';
import { CurrencyAction } from '../currency/CurrencyAction';
import LMLoading from '../../../components/common/LMLoading';

function signIn(params) {
  return async (dispatch) => {
    const { success, data } = await UserService.signIn(params);
    if (success) {
      dispatch(NetworkAction.getActiveNetwork()).then(async (activeNetwork) => {
        await ProviderModule.setProvider(activeNetwork);
        CommonAPI.setBaseUrl(activeNetwork.apiUrl);
        // dispatch(CurrencyAction.getCurrency(activeNetwork.symbol));

        dispatch(WalletActions.getActiveWallet()).then(() => {
          dispatch(WalletActions.getWallets());
          dispatch(signInSuccess(data));
          LMLoading.hide();
        });
      });
    }
    return { success, data };
  };
}

function signUp(params) {
  return async (dispatch) => {
    const { success, data } = await UserService.signUp(params);
    if (success) {
      dispatch(signUpSuccess(data));
    }
    return { success, data };
  };
}

function changePassword(oldPassword, newPassword) {
  return async (dispatch) => {
    const result = await UserService.changePassword(oldPassword, newPassword);
    return result;
  };
}

function unlockScreen(key) {
  return async (dispatch) => {
    const result = await UserService.unlockScreen(key);
    return result;
  };
}

export const UserAction = {
  signIn,
  signUp,
  changePassword,
  unlockScreen,
};
