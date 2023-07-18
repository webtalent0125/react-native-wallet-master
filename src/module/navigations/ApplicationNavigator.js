import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Animated from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NetworkAction } from '../persistent/network/NetworkAction';
import { TokenAction } from '../persistent/token/TokenAction';
import { CurrencyAction } from '../persistent/currency/CurrencyAction';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import WelcomeScreen from '../../screen/welcome/';
import PasswordLockScreen from '../../screen/lockScreen/passwordLock';
import LoginScreen from '../../screen/lockScreen/login';

const Stack = createNativeStackNavigator();

const ApplicationNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(NetworkAction.getActiveNetwork());
    dispatch(NetworkAction.list());
    dispatch(TokenAction.getTokens());
    dispatch(CurrencyAction.getLatestTrending());
    dispatch(TokenAction.getWatchLists());
  }, []);

  return (
    <NavigationContainer>
      <Animated.View style={{ flex: 1 }}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'WelcomeScreen'}
        >
          <Stack.Screen name='WelcomeScreen' component={WelcomeScreen} />
          <Stack.Screen name='PasswordLockScreen' component={PasswordLockScreen} />
          <Stack.Screen name='AuthStactNavigator' component={AuthStackNavigator} />
          <Stack.Screen name='MainStackNavigator' component={MainStackNavigator} />
          <Stack.Screen name='LoginScreen' component={LoginScreen} />
        </Stack.Navigator>
      </Animated.View>
    </NavigationContainer>
  );
};

export default ApplicationNavigator;
