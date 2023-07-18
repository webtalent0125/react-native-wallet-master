import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Icon } from 'react-native-eva-icons';
import WatchList from '../../screen/watchList';
import Portfoio from '../../screen/portfolio';
import Swap from '../../screen/swap';
import CrossSwap from '../../screen/dApps/crossSwap';
import VoteExzo from '../../screen/voteExzo';
import Market from '../../screen/market';

import Homesvg from '../../assets/images/svg/home.svg';
import Portfoliosvg from '../../assets/images/svg/portfolio.svg';
import PortfolioBluesvg from '../../assets/images/svg/portfolio_blue.svg';
import Walletsvg from '../../assets/images/svg/wallet.svg';
import Swapsvg from '../../assets/images/svg/swap.svg';
import DAppsvg from '../../assets/images/svg/dAppsvg.svg';
import DAppBluesvg from '../../assets/images/svg/dAppsvg_blue.svg';
import Marketsvg from '../../assets/images/svg/market.svg';
import Votesvg from '../../assets/images/svg/vote.svg';
import VoteBluesvg from '../../assets/images/svg/vote_blue.svg';
import Projectssvg from '../../assets/images/svg/projects.svg';

const Tab = createBottomTabNavigator();

const BottomTabBarNavigator = ({ navigation }) => {
  const animatedValue = new Animated.Value(0);

  const buttonScale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1.2],
  });

  const onPressIn = (focused) => {
    if (!focused)
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
  };

  const onPressOut = (focused) => {
    if (!focused)
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 50,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: buttonScale }],
  };

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={{ marginLeft: 15, marginRight: 15 }}
        onPress={() => navigation.toggleDrawer()}
      >
        <Icon name="menu-outline" fill={'black'} width={26} height={26} />
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        // headerStyle: {
        //   backgroundColor: 'white',
        //   shadowColor: 'white',
        // },
        // headerTitleContainerStyle: {
        //   width: '100%',
        //   alignItems: 'center',
        // },
        // headerLeft: HeaderLeft,
        // headerRight: () => (
        //   <View
        //     style={{
        //       flexDirection: 'row',
        //       alignItems: 'center',
        //       marginRight: 10,
        //     }}
        //   >
        //     <Icon
        //       name="search-outline"
        //       fill={'black'}
        //       width={24}
        //       height={24}
        //       style={{ marginRight: 5 }}
        //     />
        //     <Icon
        //       name="bell-outline"
        //       fill={'black'}
        //       width={22}
        //       height={22}
        //       style={{ marginRight: 5 }}
        //     />
        //   </View>
        // ),
        headerShown: false,
        tabBarStyle: {
          paddingTop: 15,
          paddingBottom: Platform.OS === 'ios' ? 35 : 15,
          height: Platform.OS === 'ios' ? 100 : 80,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        tabBarActiveTintColor: '#CDD1E1',
        tabBarInactiveTintColor: '#CDD1E1',
        tabBarShowLabel: false,
        // tabBarActiveBackgroundColor: '#3755F0',
      }}
    >
      <Tab.Screen
        name="Home"
        component={WatchList}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: focused ? '#3755F0' : 'transparent',
                  },
                ]}
              >
                {focused ? (
                  <Homesvg width={18} height={19} color="white" />
                ) : (
                  <Homesvg width={18} height={19} color="#CDD1E1" />
                )}
                {!focused && (
                  <Text style={[styles.tablabel, { color }]}>Home</Text>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={Portfoio}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: focused ? '#3755F0' : 'transparent',
                  },
                ]}
              >
                {focused ? (
                  <Walletsvg width={20} height={16} color="white" />
                ) : (
                  <Walletsvg width={20} height={16} color="#CDD1E1" />
                )}
                {!focused && (
                  <Text style={[styles.tablabel, { color }]}>Wallet</Text>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Swap"
        component={Swap}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: focused ? '#3755F0' : 'transparent',
                  },
                ]}
              >
                {/* <TouchableWithoutFeedback
                  style={{ alignItems: 'center' }}
                  onPressIn={() => onPressIn(focused)}
                  onPressOut={() => onPressOut(focused)}
                > */}
                {focused ? (
                  <Swapsvg width={15} height={15} color="white" />
                ) : (
                  <Swapsvg width={15} height={15} color="#CDD1E1" />
                )}
                {!focused && (
                  <Text style={[styles.tablabel, { color }]}>Swap</Text>
                )}
                {/* </TouchableWithoutFeedback> */}
              </View>
            );
          },
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: focused ? '#3755F0' : 'transparent',
                  },
                ]}
              >
                {focused ? (
                  <Marketsvg width={21} height={17} color="white" />
                ) : (
                  <Marketsvg width={21} height={17} color="#CDD1E1" />
                )}
                {!focused && (
                  <Text style={[styles.tablabel, { color }]}>Market</Text>
                )}
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Vote"
        component={VoteExzo}
        options={{
          tabBarIcon: ({ focused, color }) => {
            return (
              <View
                style={[
                  styles.tabItem,
                  {
                    backgroundColor: focused ? '#3755F0' : 'transparent',
                  },
                ]}
              >
                {focused ? (
                  <Projectssvg width={16} height={17} color="white" />
                ) : (
                  <Projectssvg width={16} height={17} color="#CDD1E1" />
                )}
                {!focused && (
                  <Text style={[styles.tablabel, { color }]}>Projects</Text>
                )}
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tablabel: {
    fontSize: 10,
    fontWeight: '600',
    paddingTop: 8,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 46,
    borderRadius: 200,
  },
  swapButton: {
    // backgroundColor: 'white',
    // position: 'absolute',
    // top: -25,
    // padding: 3,
    // borderRadius: 100,
    // shadowOffset: {
    //   width: 5,
    //   height: 5,
    // },
    // shadowOpacity: 50,
    // shadowRadius: 50,
    // shadowColor: 'gray',
    // elevation: 5,
  },
});

export default BottomTabBarNavigator;
