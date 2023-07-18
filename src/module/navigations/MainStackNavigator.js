import React, { useEffect } from 'react';
import { AppState } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContent } from './DrawerContent';
import BottomTabBarNavigator from './BottomTabBarNavigator';
import SeedPhrase from '../../screen/wallet/seedPhrase';
import ImportWallet from '../../screen/wallet/importWallet';
import MyProfile from '../../screen/myProfile';
import WalletList from '../../screen/wallet/walletList';
import AddToken from '../../screen/token/addToken';
import TokenList from '../../screen/token/tokenList';
import TransactionHistory from '../../screen/transactions/history';
import SendTransaction from '../../screen/transactions/send';
import TokenAdded from '../../screen/token/tokenAdded';
import TokenInformation from '../../screen/token/tokenInformation';
import AddAsset from '../../screen/token/addAsset';
import ReceiveToken from '../../screen/transactions/receive';
import Security from '../../screen/myProfile/security';
import ArticlePage from '../../screen/article';
import AddWatchList from '../../screen/token/addWatchList';
import SwapComplete from '../../screen/swap/complete';
import CoinLists from '../../screen/coinLists'

const Drawer = createDrawerNavigator();

const MainStackNavigator = (props) => {
  const { navigation } = props;

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        navigation.navigate('PasswordLockScreen');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <React.Fragment>
      <Drawer.Navigator
        initialRouteName="BottomTabBarNavigator"
        drawerType="slide"
        drawerContent={() => {
          return <DrawerContent {...props} />;
        }}
        screenOptions={{
          drawerStyle: {
            backgroundColor: 'white',
          },
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="BottomTabBarNavigator"
          component={BottomTabBarNavigator}
        />
        <Drawer.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="SeedPhrase"
          component={SeedPhrase}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="WalletList" component={WalletList} />
        <Drawer.Screen name="TokenInformation" component={TokenInformation} />
        <Drawer.Screen
          name="ImportWallet"
          component={ImportWallet}
          options={{ headerShown: false }}
        />
        <Drawer.Screen name="AddToken" component={AddToken} />
        <Drawer.Screen name="AddAsset" component={AddAsset} />
        <Drawer.Screen name="AddWatchList" component={AddWatchList} />
        <Drawer.Screen name="TokenList" component={TokenList} />
        <Drawer.Screen
          name="TokenAdded"
          component={TokenAdded}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="TransactionHistory"
          component={TransactionHistory}
        />
        <Drawer.Screen name="SendTransaction" component={SendTransaction} />
        <Drawer.Screen name="ReceiveToken" component={ReceiveToken} />
        <Drawer.Screen name="CoinLists" component={CoinLists} />
        <Drawer.Screen name="Security" component={Security} />
        <Drawer.Screen name="ArticlePage" component={ArticlePage} />
        <Drawer.Screen
          name="SwapTxComplete"
          component={SwapComplete}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
    </React.Fragment>
  );
};

export default MainStackNavigator;
