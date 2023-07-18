import React from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { styles } from './styles';

const WalletAssets = (props) => {
  const { navigation } = props;
  const { activeWallet } = useSelector((state) => state.WalletReducer);
  const { networks } = useSelector((state) => state.NetworkReducer);
  const { currency, quotes } = useSelector((state) => state.CurrencyReducer);

  const formatNumber = (number, limit) => {
    if (number < limit) return number.toFixed(6);
    else return number.toFixed(2);
  };

  return (
    <View>
      <Text style={styles.watchListTitle}>Assets</Text>

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
                                  {asset.symbol}
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
                                  {asset.symbol}
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
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default WalletAssets;
