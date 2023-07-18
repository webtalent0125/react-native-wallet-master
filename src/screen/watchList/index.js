import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import {
  brightness,
  ColorMatrix,
  concatColorMatrices,
  contrast,
  hueRotate,
} from 'react-native-color-matrix-image-filters';
import { SwipeListView } from 'react-native-swipe-list-view';
import { TokenAction } from '../../module/persistent/token/TokenAction';
import TredingSlider from '../../components/trendingSlider';
import BannerSlider from '../../components/bannerSlider';
import TrendingLatest from '../../components/trendingLatest';
import CryptoNews from '../../components/cryptoNews';
import { styles } from './styles';
import NavigationHeader from '../../components/navigation';

const WatchList = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const { currency, quotes } = useSelector((state) => state.CurrencyReducer);
  const { watchLists } = useSelector((state) => state.TokenReducer);
  const openRowRef = useRef(null);

  const listwrapper_width = Dimensions.get('window').width - 140;

  const headerComp = () => {
    return <Text style={{ fontSize: 18, fontWeight: '500' }}>Watchlist</Text>;
  };

  const removeFromList = (rowData, rowMap) => {
    rowMap[rowData.index].closeRow();
    dispatch(TokenAction.removeFromWatchList(rowData.item.slug));
  };

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRef.current = rowMap[rowKey];
  };

  const RenderSwipeElement = (props) => {
    const item = props.item.symbol;
    if (!quotes[item]) return <></>;
    else
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('TokenInformation', { tokenData: quotes[item] })
          }
        >
          <View style={styles.watchListItem}>
            <Image
              style={styles.assetLogo}
              source={{
                uri: `https://s2.coinmarketcap.com/static/img/coins/64x64/${quotes[item].id}.png`,
              }}
              width={30}
              height={30}
            />

            <View style={{ width: listwrapper_width * 0.45 }}>
              <Text style={styles.TokenSymbol}>{item}</Text>
              <Text style={styles.TokenName}>{quotes[item].name}</Text>
            </View>

            <ColorMatrix
              matrix={
                quotes[item].quote.USD.percent_change_24h < 0
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
                style={styles.priceGraph}
                source={{
                  uri: `https://s3.coinmarketcap.com/generated/sparklines/web/1d/2781/${quotes[item].id}.png`,
                }}
                width={50}
                height={16}
              />
            </ColorMatrix>

            <View style={{ width: listwrapper_width * 0.55 }}>
              <Text style={[styles.TokenSymbol, { textAlign: 'right' }]}>
                ${Intl.NumberFormat().format(quotes[item].quote.USD.price)}
              </Text>
              <Text
                style={[
                  styles.changes,
                  quotes[item].quote.USD.percent_change_24h > 0
                    ? styles.priceup
                    : styles.pricedown,
                ]}
              >
                {quotes[item].quote.USD.percent_change_24h > 0 ? '+' : '-'}$
                {Intl.NumberFormat().format(
                  (Math.abs(quotes[item].quote.USD.percent_change_24h) *
                    quotes[item].quote.USD.price) /
                    100
                )}{' '}
                ({quotes[item].quote.USD.percent_change_24h.toFixed(2)}%)
              </Text>
            </View>
          </View>
        </Pressable>
      );
  };

  const renderHiddenItem = (rowData, rowMap) => {
    return (
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeFromList(rowData, rowMap)}
        >
          <Icon name="trash-2-outline" fill="white" width={18} height={18} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationHeader
        {...props}
        title="Watch List"
        navigation={navigation}
        drawer
        search
        bell
      />
      <SwipeListView
        data={quotes ? watchLists : []}
        renderItem={(data, rowMap) => <RenderSwipeElement {...data} />}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-35}
        contentContainerStyle={styles.mainContent}
        onRowDidOpen={onRowDidOpen}
        keyExtractor={(data, index) => index}
        ListHeaderComponent={
          <>
            <BannerSlider />

            <TrendingLatest {...props} />
            <Text style={styles.watchListTitle}>Watchlist</Text>
          </>
        }
        ListFooterComponent={
          <>
            <TouchableOpacity
              style={styles.addTokenButton}
              onPress={() => navigation.navigate('AddWatchList')}
            >
              <Icon
                name="plus-square-outline"
                width={24}
                height={24}
                fill="white"
              />
              <Text style={styles.addTokenButtonText}>Add Token</Text>
            </TouchableOpacity>

            <View>
              <TredingSlider {...props} />
            </View>

            <View>
              <CryptoNews {...props} />
            </View>
          </>
        }
      />
    </View>
  );
};

export default WatchList;
