import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { styles } from './styles';
import { Icon } from 'react-native-eva-icons';

const TrendingLatest = ({ navigation }) => {
  const { toptrending } = useSelector((state) => state.CurrencyReducer);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trending</Text>
      <ScrollView horizontal={true}>
        {toptrending.map((item, index) => {
          return (
            <Pressable
              key={index}
              style={styles.trendingItem}
              onPress={() => navigation.navigate('TokenInformation', { tokenData: item })}
            >
              <Image
                style={styles.assetLogo}
                source={{
                  uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/' + item.id + '.png',
                }}
                width={20}
                height={20}
              />
              <Text style={styles.symbolName}>{item.symbol}</Text>
              {item.quote.USD.volume_change_24h > 0 ? (
                <Icon name='trending-up-outline' width={24} height={24} fill='#0DC471' />
              ) : (
                <Icon name='trending-down-outline' width={24} height={24} fill='#FF6393' />
              )}
              <Text
                style={[
                  styles.percent,
                  item.quote.USD.volume_change_24h > 0 ? styles.up : styles.down,
                ]}
              >
                {item.quote.USD.volume_change_24h > 0 && '+'}
                {item.quote.USD.volume_change_24h}%
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TrendingLatest;
