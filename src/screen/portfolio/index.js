import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import { TokenAction } from '../../module/persistent/token/TokenAction';
import { WalletActions } from '../../module/persistent/wallet/WalletActions';
import { styles } from './styles';
import PriceChart from '../../components/priceChart';
import WalletAssets from '../../components/walletAssets';
import NavigationHeader from '../../components/navigation';
import TredingSlider from '../../components/trendingSlider';
import CryptoNews from '../../components/cryptoNews';
import UploadSvg from '../../assets/images/svg/upload.svg';
import DownloadSvg from '../../assets/images/svg/download.svg';
import BagSvg from '../../assets/images/svg/bag.svg';

const Portfolio = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { activeWallet } = useSelector((state) => state.WalletReducer);
  const { currency, quotes } = useSelector((state) => state.CurrencyReducer);
  const [balance, setBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [height, setHeight] = useState('20%');
  const sheetRef = useRef(null);
  const snapPoints = [height, '85%'];

  const handleSheetChange = useCallback((index) => {
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(TokenAction.getTokens());
    dispatch(WalletActions.getActiveWallet()).then(() => {
      setRefreshing(false);
    });
  };

  useEffect(() => {
    if (activeWallet.assets) {
      const index = activeWallet.assets.findIndex((x) => x.symbol === 'EXZO');
      setBalance(activeWallet.assets[index].balance);
    }
  }, [activeWallet]);

  useEffect(() => {
    const windowHeight = Dimensions.get('window').height;
    const newHeight = windowHeight - 590;
    setHeight(newHeight);
  });

  return (
    <View style={styles.container}>
      <NavigationHeader
        title="Portfolio"
        navigation={navigation}
        bgColor="#1E2541"
        drawer
        search
        bell
      />
      <View style={styles.background}>
        <View>
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.mainContent}>
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.currencyPrice}>
                  {currency.symbol}
                  {(
                    Number.parseFloat(balance) *
                    (quotes && quotes['EXZO']
                      ? quotes['EXZO'].quote.USD.price
                      : 0)
                  ).toFixed(2)}
                </Text>

                {quotes && quotes['EXZO'] && (
                  <>
                    <PriceChart quotes={quotes} />
                  </>
                )}
              </View>

              <View style={styles.actionGroup}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('SendTransaction')}
                >
                  <UploadSvg width={18} height={19} />
                  <Text style={styles.actionButtonText}>Send</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('CoinLists')}
                >
                  <DownloadSvg width={18} height={19} />
                  <Text style={styles.actionButtonText}>Receive</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <BagSvg width={18} height={20} />
                  <Text style={styles.actionButtonText}>Buy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
          backgroundStyle={{
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          }}
          handleIndicatorStyle={styles.handleIndicatorStyle}
        >
          <BottomSheetScrollView>
            <View style={styles.mainContent}>
              <WalletAssets quotes={quotes} navigation={navigation} />

              <TouchableOpacity
                style={styles.addTokenButton}
                onPress={() => navigation.navigate('AddAsset')}
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
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </View>
  );
};

export default Portfolio;
