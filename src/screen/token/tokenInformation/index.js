import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Pressable,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-eva-icons';
import axios from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
import NavigationHeader from '../../../components/navigation';
import { ApplicationProperties } from '../../../ApplicationProperties';
import { WalletActions } from '../../../module/persistent/wallet/WalletActions';
import { TokenAction } from '../../../module/persistent/token/TokenAction';
import LMLoading from '../../../components/common/LMLoading';
import {
  marketcap,
  marketvolumn,
  circulatingSupply,
  totalsupply,
  socialFacebook,
  socialTwitter,
} from '../../../assets/images';
import { styles } from './styles';

const TokenInformation = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { tokenData, tokenAddress } = props.route.params;
  const { activeWallet } = useSelector((state) => state.WalletReducer);
  const { watchLists } = useSelector((state) => state.TokenReducer);
  const [metaData, setMetaData] = useState();
  const [isAsset, setIsAsset] = useState(false);
  const [watchlist, setWatchlist] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const nonAssets = ['EXZO', 'BNB', 'ETH'];
  const isFocused = useIsFocused();

  const axiosInstance = axios.create({
    baseURL: ApplicationProperties.COINMARKETCAP_API_URL,
    headers: {
      'X-CMC_PRO_API_KEY': ApplicationProperties.COINMARKETCAP_API_KEY,
    },
  });

  const removeAsset = () => {
    if (tokenAddress)
      dispatch(WalletActions.removeAsset(tokenAddress, activeWallet)).then((response) => {
        setIsAsset(false);
      });
  };

  const addWatchLists = (key) => {
    if (key) {
      dispatch(TokenAction.addToWatchList(tokenData.symbol, tokenData.slug));
    } else {
      dispatch(TokenAction.removeFromWatchList(tokenData.slug));
    }
  };

  const copyToClipboard = (address) => {
    Clipboard.setString(address);
    Toast.show({
      type: 'info',
      text2: 'Address copied to clipboard',
    });
  };

  const collapseAddress = (address) => {
    if (address.length > 10) {
      return address.slice(0, 6) + '...' + address.slice(-7);
    } else {
      return address;
    }
  };

  useEffect(async () => {
    setMetaData(null);
    setIsAsset(false);
    if (tokenAddress) {
      const index = activeWallet.assets.findIndex((x) => x.contractAddress === tokenAddress);
      if (index > -1 && tokenData.symbol !== 'EXZO') {
        setIsAsset(true);
      }
    }

    const { data } = await axiosInstance.get('cryptocurrency/info?slug=' + tokenData.slug);

    if (data.status.error_code === 0) {
      setMetaData(data.data[Object.keys(data.data)[0]]);
    }
  }, [tokenData, tokenAddress]);

  useEffect(() => {
    if (!isFocused) setModalVisible(false);
    setWatchlist(false);
    const index = watchLists.findIndex((x) => x.slug === tokenData.slug);
    if (index > -1) setWatchlist(true);
  }, [isFocused, watchLists]);

  return (
    <View style={styles.container}>
      <NavigationHeader {...props} title='' />

      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.mainContent}>
          <View style={styles.tokenBalance}>
            <Image
              style={styles.assetLogo}
              source={{
                uri: 'https://s2.coinmarketcap.com/static/img/coins/64x64/' + tokenData.id + '.png',
              }}
              width={40}
              height={40}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: '900', lineHeight: 19, color: '#2C3E50' }}>
                {tokenData.name} ({tokenData.symbol})
              </Text>

              {watchlist ? (
                <Pressable onPress={() => addWatchLists(false)}>
                  <Icon name='star' width={20} height={20} fill='#f6b87e' />
                </Pressable>
              ) : (
                <Pressable onPress={() => addWatchLists(true)}>
                  <Icon name='star-outline' width={20} height={20} fill='#f6b87e' />
                </Pressable>
              )}
            </View>
          </View>

          {!nonAssets.includes(tokenData.symbol) && isAsset && (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
              <TouchableOpacity style={styles.removeAsset} onPress={removeAsset}>
                <Text style={styles.removeAssetText}>Remove from asset</Text>
              </TouchableOpacity>
            </View>
          )}

          {metaData && metaData.contract_address && metaData.contract_address.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ fontWeight: '500' }}>Contracts:</Text>
              </View>
              <View style={styles.contracts}>
                <View style={styles.contractAddress}>
                  <Image
                    style={styles.assetLogo}
                    source={{
                      uri:
                        'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                        metaData.contract_address[0].platform.coin.id +
                        '.png',
                    }}
                    width={25}
                    height={25}
                  />
                  <View>
                    <Text style={styles.contractName}>
                      {metaData.contract_address[0].platform.name}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.contractName}>
                        {collapseAddress(metaData.contract_address[0].contract_address)}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          copyToClipboard(metaData.contract_address[0].contract_address)
                        }
                      >
                        <Icon name='copy-outline' width={20} height={20} fill='black' />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {metaData.contract_address.length > 1 && (
                    <TouchableOpacity
                      style={styles.moreButton}
                      onPress={() => setModalVisible(true)}
                    >
                      <Text style={{ fontWeight: '500' }}>More</Text>
                      <Icon name='chevron-down-outline' width={20} height={20} fill='black' />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.showTransaction}
            onPress={() => navigation.navigate('TransactionHistory')}
          >
            <Text style={{ fontSize: 16, fontWeight: '900', lineHeight: 19, color: '#485068' }}>
              Transactions
            </Text>

            <Icon name='chevron-right-outline' width={30} height={30} fill='#6C757D' />
          </TouchableOpacity>

          <View style={styles.marketData}>
            <View style={styles.marketItem}>
              <Image source={marketcap} style={styles.marketIcon} />

              <View>
                <Text style={{ fontSize: 12, lineHeight: 16, fontWeight: '500', color: '#808191' }}>
                  Market cap
                </Text>
                <Text style={{ color: '#2C3E50', fontSize: 18, fontWeight: '500' }}>
                  ${tokenData.quote.USD.market_cap.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.marketItem}>
              <Image source={marketvolumn} style={styles.marketIcon} />

              <View>
                <Text style={{ fontSize: 12, lineHeight: 16, fontWeight: '500', color: '#808191' }}>
                  Volume (24h)
                </Text>
                <Text style={{ color: '#2C3E50', fontSize: 18, fontWeight: '500' }}>
                  ${tokenData.quote.USD.volume_24h.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.marketItem}>
              <Image source={circulatingSupply} style={styles.marketIcon} />

              <View>
                <Text style={{ fontSize: 12, lineHeight: 16, fontWeight: '500', color: '#808191' }}>
                  Circulating Supply
                </Text>
                <Text style={{ color: '#2C3E50', fontSize: 18, fontWeight: '500' }}>
                  ${tokenData.circulating_supply.toFixed(2)}
                </Text>
              </View>
            </View>

            <View style={styles.marketItem}>
              <Image source={totalsupply} style={styles.marketIcon} />

              <View>
                <Text style={{ fontSize: 12, lineHeight: 16, fontWeight: '500', color: '#808191' }}>
                  Total Supply
                </Text>
                <Text style={{ color: '#2C3E50', fontSize: 18, fontWeight: '500' }}>
                  ${tokenData.total_supply.toFixed(2)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.metaData}>
            <Text style={styles.metaTitle}>About {tokenData.name}</Text>

            {metaData ? (
              <>
                <Text style={styles.metaDescription}>{metaData.description}</Text>

                <View style={styles.tokenUrls}>
                  {metaData.urls.website.length > 0 && (
                    <Pressable
                      style={styles.tokenLink}
                      onPress={() => Linking.openURL(metaData.urls.website[0])}
                    >
                      <Icon name='external-link-outline' width={20} height={20} fill='black' />
                      <Text
                        style={{ marginLeft: 5, fontWeight: '700', fontSize: 13, lineHeight: 20 }}
                      >
                        Official Website
                      </Text>
                    </Pressable>
                  )}

                  {metaData.urls.technical_doc.length > 0 && (
                    <Pressable
                      style={styles.tokenLink}
                      onPress={() => Linking.openURL(metaData.urls.technical_doc[0])}
                    >
                      <Icon name='external-link-outline' width={20} height={20} fill='black' />
                      <Text
                        style={{ marginLeft: 5, fontWeight: '700', fontSize: 13, lineHeight: 20 }}
                      >
                        Whitepaper
                      </Text>
                    </Pressable>
                  )}

                  {metaData.urls.source_code.length > 0 && (
                    <Pressable
                      style={styles.tokenLink}
                      onPress={() => Linking.openURL(metaData.urls.source_code[0])}
                    >
                      <Icon name='external-link-outline' width={20} height={20} fill='black' />
                      <Text
                        style={{ marginLeft: 5, fontWeight: '700', fontSize: 13, lineHeight: 20 }}
                      >
                        Source Code
                      </Text>
                    </Pressable>
                  )}
                </View>

                <View style={styles.socialLinks}>
                  {metaData.urls.facebook.length > 0 && (
                    <Pressable onPress={() => Linking.openURL(metaData.urls.facebook[0])}>
                      <Image source={socialFacebook} style={styles.socialIcon} />
                    </Pressable>
                  )}
                  {metaData.urls.twitter.length > 0 && (
                    <Pressable onPress={() => Linking.openURL(metaData.urls.twitter[0])}>
                      <Image source={socialTwitter} style={styles.socialIcon} />
                    </Pressable>
                  )}
                </View>
              </>
            ) : (
              <ActivityIndicator size='large' />
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Icon name='close-outline' width={20} height={20} fill='black' />
              </Pressable>
            </View>
            <View style={styles.modalContent}>
              {metaData && (
                <ScrollView style={{ paddingHorizontal: 20 }}>
                  {metaData.contract_address.map((contract, index) => {
                    return (
                      <View key={index} style={styles.contractAddress}>
                        <Image
                          style={styles.assetLogo}
                          source={{
                            uri:
                              'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                              contract.platform.coin.id +
                              '.png',
                          }}
                          width={30}
                          height={30}
                        />
                        <View>
                          <Text style={styles.contractName}>{contract.platform.name}</Text>
                          <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.contractName}>
                              {collapseAddress(contract.contract_address)}
                            </Text>
                            <TouchableOpacity
                              onPress={() => copyToClipboard(contract.contract_address)}
                            >
                              <Icon name='copy-outline' width={20} height={20} fill='black' />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TokenInformation;
