import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import LMNetworkSelector from '../common/LMNetworkSelector';
import { styles } from './styles';

const tabs = [
  { title: 'All', value: 'all' },
  { title: 'Gainer', value: 'gainer' },
  { title: 'Losers', value: 'losers' },
  { title: 'NFTs', value: 'nfts' },
  { title: 'New projects', value: 'newprojects' },
];

const Coins = (props) => {
  const { navigation } = props;
  const [activeTab, setActiveTab] = useState('all');
  const { activeWallet } = useSelector((state) => state.WalletReducer);
  const { networks } = useSelector((state) => state.NetworkReducer);
  const { currency, quotes } = useSelector((state) => state.CurrencyReducer);

  const formatNumber = (number, limit) => {
    if (number < limit) return number.toFixed(6);
    else return number.toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>Coins</Text>
        <LMNetworkSelector />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        {tabs.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setActiveTab(item.value);
            }}
            style={[
              styles.tabItem,
              activeTab === item.value && styles.tabItemActive,
            ]}
          >
            <Text
              style={[
                styles.tabItemText,
                activeTab === item.value && styles.tabItemTextActive,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.watchListWrapper}>
        {networks.map((network, index) => {
          return (
            <View key={index}>
              {activeWallet.mainassets && (
                <View>
                  {activeWallet.mainassets.map((asset, index) => {
                    if (asset.platform === network.displayName)
                      return (
                        <React.Fragment key={index}>
                          {quotes && quotes[asset.symbol] && (
                            <Pressable
                              style={styles.watchListItem}
                              onPress={() =>
                                navigation.navigate('TokenInformation', {
                                  tokenData: quotes[asset.symbol],
                                })
                              }
                            >
                              <Image
                                style={styles.assetLogo}
                                source={{
                                  uri:
                                    'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                                    quotes[asset.symbol].id +
                                    '.png',
                                }}
                                width={30}
                                height={30}
                              />

                              <View style={{ flex: 1 }}>
                                <Text style={styles.aseetName}>
                                  {quotes[asset.symbol].name}
                                </Text>
                                {/* <Text style={styles.assetbalance}>
                                  {quotes[asset.symbol].name}
                                </Text> */}
                                <Text style={styles.assetbalance}>
                                  {Intl.NumberFormat().format(
                                    parseFloat(asset.balance)
                                  ) !== '0' ? (
                                    <React.Fragment>
                                      {Intl.NumberFormat().format(
                                        parseFloat(asset.balance)
                                      )}{' '}
                                      {quotes[asset.symbol].symbol} (
                                      {currency.symbol}
                                      {formatNumber(
                                        asset.balance *
                                          quotes[asset.symbol].quote.USD.price,
                                        0.0001
                                      )}
                                      )
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      {quotes[asset.symbol].symbol}
                                    </React.Fragment>
                                  )}
                                </Text>
                              </View>

                              <View>
                                <Text
                                  style={[
                                    styles.aseetName,
                                    { textAlign: 'right' },
                                  ]}
                                >
                                  $
                                  {formatNumber(
                                    quotes[asset.symbol].quote.USD.price,
                                    0.001
                                  )}
                                </Text>
                                <Text
                                  style={[
                                    styles.changes,
                                    quotes[asset.symbol].quote.USD
                                      .percent_change_24h > 0
                                      ? styles.priceup
                                      : styles.pricedown,
                                  ]}
                                >
                                  {quotes[asset.symbol].quote.USD
                                    .percent_change_24h > 0
                                    ? '+'
                                    : '-'}
                                  $
                                  {formatNumber(
                                    (Math.abs(
                                      quotes[asset.symbol].quote.USD
                                        .percent_change_24h
                                    ) *
                                      quotes[asset.symbol].quote.USD.price) /
                                      100,
                                    0.00001
                                  )}{' '}
                                  (
                                  {quotes[
                                    asset.symbol
                                  ].quote.USD.percent_change_24h.toFixed(2)}
                                  %)
                                </Text>
                              </View>
                            </Pressable>
                          )}
                        </React.Fragment>
                      );
                  })}
                </View>
              )}
              {activeWallet.assets && (
                <View>
                  {activeWallet.assets.map((asset, index) => {
                    if (asset.platform === network.displayName)
                      return (
                        <React.Fragment key={index}>
                          {quotes && quotes[asset.symbol] && (
                            <Pressable
                              style={styles.watchListItem}
                              onPress={() =>
                                navigation.navigate('TokenInformation', {
                                  tokenData: quotes[asset.symbol],
                                  tokenAddress: asset.contractAddress,
                                })
                              }
                            >
                              <Image
                                style={styles.assetLogo}
                                source={{
                                  uri:
                                    'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                                    quotes[asset.symbol].id +
                                    '.png',
                                }}
                                width={30}
                                height={30}
                              />

                              <View style={{ flex: 1 }}>
                                <Text style={styles.aseetName}>
                                  {quotes[asset.symbol].name}
                                </Text>
                                <Text style={styles.assetbalance}>
                                  {Intl.NumberFormat().format(
                                    parseFloat(asset.balance)
                                  ) !== '0' ? (
                                    <React.Fragment>
                                      {Intl.NumberFormat().format(
                                        parseFloat(asset.balance)
                                      )}{' '}
                                      {quotes[asset.symbol].symbol} (
                                      {currency.symbol}
                                      {formatNumber(
                                        asset.balance *
                                          quotes[asset.symbol].quote.USD.price,
                                        0.0001
                                      )}
                                      )
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      {quotes[asset.symbol].symbol}
                                    </React.Fragment>
                                  )}
                                </Text>
                              </View>

                              <View>
                                <Text
                                  style={[
                                    styles.aseetName,
                                    { textAlign: 'right' },
                                  ]}
                                >
                                  $
                                  {formatNumber(
                                    quotes[asset.symbol].quote.USD.price,
                                    0.001
                                  )}
                                </Text>
                                <Text
                                  style={[
                                    styles.changes,
                                    quotes[asset.symbol].quote.USD
                                      .percent_change_24h > 0
                                      ? styles.priceup
                                      : styles.pricedown,
                                  ]}
                                >
                                  {quotes[asset.symbol].quote.USD
                                    .percent_change_24h > 0
                                    ? '+'
                                    : '-'}
                                  $
                                  {formatNumber(
                                    (Math.abs(
                                      quotes[asset.symbol].quote.USD
                                        .percent_change_24h
                                    ) *
                                      quotes[asset.symbol].quote.USD.price) /
                                      100,
                                    0.00001
                                  )}{' '}
                                  (
                                  {quotes[
                                    asset.symbol
                                  ].quote.USD.percent_change_24h.toFixed(2)}
                                  %)
                                </Text>
                              </View>
                            </Pressable>
                          )}
                        </React.Fragment>
                      );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </View>
      <TouchableOpacity
        style={styles.addTokenButton}
        onPress={() => navigation.navigate('AddAsset')}
      >
        <Icon name="plus-square-outline" width={24} height={24} fill="white" />
        <Text style={styles.addTokenButtonText}>Add Token</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Coins;
