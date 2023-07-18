import _ from 'lodash';
import BcryptReactNative from 'bcrypt-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LMStorageConstant } from '../storage/LMStorageConstant';
import { LMStorageService } from '../storage/LMStorageService';

async function signIn(params) {
  const { password } = params;
  const user = await LMStorageService.getItem(
    LMStorageConstant.PASSWORD_STORAGE_KEY
  );
  if (
    _.isNil(password) ||
    _.isNil(user) ||
    password == ''
    // || password != user.password
  ) {
    return {
      success: false,
      data: {},
    };
  } else {
    const result = await BcryptReactNative.compareSync(password, user.password);
    if (result) {
      return {
        success: true,
        data: user,
      };
    } else {
      return {
        success: false,
        data: {},
      };
    }
  }
}

async function signUp(params) {
  const { password, walletAddress, secretRecoveryPhrase } = params;
  const salt = await BcryptReactNative.getSalt(10);
  const hashPassword = await BcryptReactNative.hash(salt, password);

  LMStorageService.setItem(LMStorageConstant.PASSWORD_STORAGE_KEY, {
    ...params,
    password: hashPassword,
  });

  return {
    success: true,
    data: { password, walletAddress, secretRecoveryPhrase },
  };
}

async function changePassword(oldPassword, newPassword) {
  const user = await LMStorageService.getItem(
    LMStorageConstant.PASSWORD_STORAGE_KEY
  );
  const result = await BcryptReactNative.compareSync(
    oldPassword,
    user.password
  );

  if (!result) {
    return {
      success: false,
      message: 'Old password is wrong',
    };
  } else if (newPassword === oldPassword) {
    return {
      success: false,
      message: 'You cannot use the old password again.',
    };
  } else {
    const salt = await BcryptReactNative.getSalt(10);
    const hashNewPassword = await BcryptReactNative.hash(salt, newPassword);
    const newUser = {
      ...user,
      password: hashNewPassword,
    };
    await LMStorageService.setItem(
      LMStorageConstant.PASSWORD_STORAGE_KEY,
      newUser
    );
    return {
      success: true,
      message: 'Password changed!',
    };
  }
}

async function unlockScreen(key) {
  const user = await LMStorageService.getItem(
    LMStorageConstant.PASSWORD_STORAGE_KEY
  );
  const result = await BcryptReactNative.compareSync(key, user.password);
  return result;
}

export const UserService = {
  signIn,
  signUp,
  changePassword,
  unlockScreen,
};
