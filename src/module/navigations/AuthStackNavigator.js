import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectLanguage from '../../screen/selectLanguage';
import StartPage from '../../screen/wallet/startPage';
import CreatePassword from '../../screen/wallet/createPassword';
import SecureWallet from '../../screen/wallet/secureWallet';
import WhatIsIt from '../../screen/wallet/secureWallet/whatIsIt';
import CreateMnemonicsScreen from '../../screen/wallet/createMnemonics';
import ConfirmMnemonics from '../../screen/wallet/confirmMnemonics';
import Conguratulations from '../../screen/wallet/conguratulations';
import ImportWallet from '../../screen/wallet/importWallet';
import TermsAndCondition from '../../screen/TermsAndCondition';
import LearnMore from '../../components/learnMore';
import WhyImportant from '../../components/whyImportant';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='SelectLanguage' component={SelectLanguage} />
      <Stack.Screen name='WalletStartPage' component={StartPage} />
      <Stack.Screen name='WalletCreatePassword' component={CreatePassword} />
      <Stack.Screen name='SecureWallet' component={SecureWallet} />
      <Stack.Screen name='WhatIsIt' component={WhatIsIt} />
      <Stack.Screen name='CreateMnemonicsScreen' component={CreateMnemonicsScreen} />
      <Stack.Screen name='ConfirmMnemonics' component={ConfirmMnemonics} />
      <Stack.Screen name='Conguratulations' component={Conguratulations} />
      <Stack.Screen name='ImportWallet' component={ImportWallet} />
      <Stack.Screen name='TermsAndCondition' component={TermsAndCondition} />
      <Stack.Screen name='LearnMore' component={LearnMore} />
      <Stack.Screen name='WhyImportant' component={WhyImportant} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
