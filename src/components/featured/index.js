import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { styles } from './styles';
import { Icon } from 'react-native-eva-icons';

const Featured = ({ navigation }) => {
  const { currency, toptrending } = useSelector(
    (state) => state.CurrencyReducer
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Featured</Text>
      <ScrollView horizontal={true}>
        {toptrending.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={styles.trendingItem}
              onPress={() =>
                navigation.navigate('TokenInformation', { tokenData: item })
              }
            >
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
              <Text style={styles.symbolName}>{item.symbol}</Text>

              <Text style={styles.price}>
                {currency.symbol}
                {item.quote[currency.key].price.toFixed(2)}
              </Text>

              <View style={styles.percent}>
                <Icon
                  name={
                    item.quote[currency.key].percent_change_24h > 0
                      ? 'arrow-upward'
                      : 'arrow-downward'
                  }
                  width={15}
                  height={15}
                  fill={
                    item.quote[currency.key].percent_change_24h > 0
                      ? '#3DEC8D'
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
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Featured;
