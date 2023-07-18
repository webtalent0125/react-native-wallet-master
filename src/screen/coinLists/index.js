import React from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { CoinType } from '@trustwallet/wallet-core';
import NavigationHeader from '../../components/navigation';
import { ApplicationProperties } from '../../ApplicationProperties';
import { styles } from './styles';

const CoinLists = (props) => {
  const { navigation } = props;
  const { WALLET_COIN_TYPES } = ApplicationProperties;

  return (
    <View style={styles.cointainer}>
      <NavigationHeader {...props} title='Select Coin'></NavigationHeader>
      <ScrollView style={styles.mainContent}>
        {WALLET_COIN_TYPES.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.coinList}
              onPress={() => navigation.navigate('ReceiveToken', { coin: item })}
            >
              <Image
                style={styles.coinLogo}
                source={{
                  uri: `https://assets.trustwalletapp.com/blockchains/${item}/info/logo.png`,
                }}
                width={40}
                height={40}
              />
              <Text style={styles.coinName}>{CoinType.name(CoinType[item])} </Text>
              <Text style={styles.coinSymbol}>({CoinType.symbol(CoinType[item])})</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CoinLists;
