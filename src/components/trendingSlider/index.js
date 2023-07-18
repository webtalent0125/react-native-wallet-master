import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, Image, ScrollView, Pressable } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-toast-message';
import LMLoading from '../common/LMLoading';
import { CurrencyAction } from '../../module/persistent/currency/CurrencyAction';
import { styles } from './styles';
import { TokenAction } from '../../module/persistent/token/TokenAction';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import {
  brightness,
  ColorMatrix,
  concatColorMatrices,
  contrast,
  hueRotate,
} from 'react-native-color-matrix-image-filters';

const TredingSlider = ({ navigation }) => {
  const dispatch = useDispatch();
  const { currency, trending } = useSelector((state) => state.CurrencyReducer);

  useEffect(() => {
    dispatch(CurrencyAction.getTopTrending());
  }, []);

  const addToWatchList = ({ symbol, slug }) => {
    LMLoading.show();
    dispatch(TokenAction.addToWatchList(symbol, slug)).then((response) => {
      LMLoading.hide();
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Gainers/Losers</Text>

      <ScrollView horizontal={true}>
        {trending.map((item, index) => {
          return (
            <View style={styles.GLSlider} key={index}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.GLTop}>Top gainer (24h)</Text>
                <TouchableOpacity
                  style={styles.GLDetails}
                  onPress={() =>
                    navigation.navigate('TokenInformation', { tokenData: item })
                  }
                >
                  <Text style={styles.GLDetailsText}>View Details</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                }}
              >
                <Icon
                  name={
                    item.quote[currency.key].percent_change_24h > 0
                      ? 'arrow-upward'
                      : 'arrow-downward'
                  }
                  width={19}
                  height={19}
                  fill={
                    item.quote[currency.key].percent_change_24h > 0
                      ? '#00CC96'
                      : '#FC5D68'
                  }
                />
                <Text
                  style={[
                    styles.percentChange,
                    item.quote[currency.key].percent_change_24h > 0
                      ? styles.percentUp
                      : styles.percentDown,
                  ]}
                >
                  {item.quote[currency.key].percent_change_24h.toFixed(2)}%
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  navigation.navigate('TokenInformation', { tokenData: item })
                }
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    style={styles.assetLogo}
                    source={{
                      uri:
                        'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                        item.id +
                        '.png',
                    }}
                    width={30}
                    height={30}
                  />
                  <View>
                    <Text style={styles.GLPrice}>
                      {currency.key} {item.quote[currency.key].price.toFixed(5)}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.GLName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={styles.GLSymbol}>{item.symbol}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.GLGraph}>
                  <ColorMatrix
                    matrix={
                      item.quote.USD.percent_change_24h < 0
                        ? concatColorMatrices([
                            hueRotate(5),
                            brightness(0.6),
                            contrast(150),
                          ])
                        : concatColorMatrices([
                            hueRotate(1),
                            brightness(1),
                            contrast(5),
                          ])
                    }
                  >
                    <Image
                      source={{
                        uri: `https://s3.coinmarketcap.com/generated/sparklines/web/1d/2781/${item.id}.png`,
                      }}
                      width={70}
                      height={28}
                    />
                  </ColorMatrix>
                </View>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TredingSlider;
