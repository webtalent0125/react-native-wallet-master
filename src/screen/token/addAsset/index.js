import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { utils } from 'ethers';
import { useIsFocused } from '@react-navigation/native';
import { WalletActions } from '../../../module/persistent/wallet/WalletActions';
import { TokenAction } from '../../../module/persistent/token/TokenAction';
import LMLoading from '../../../components/common/LMLoading';
import { styles } from './styles';

const AddAsset = (props) => {
  const dispatch = useDispatch();
  const { activeWallet } = useSelector((state) => state.WalletReducer);
  const { customTokens, commonTokens } = useSelector((state) => state.TokenReducer);
  const { quotes } = useSelector((state) => state.CurrencyReducer);
  const { navigation } = props;
  const [address, setAddress] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [isExist, setIsExist] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);
  const [newAsset, setnewAsset] = useState({});
  const [loading, setLoading] = useState(false);
  const [tokenDetail, settokenDetail] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const assets = activeWallet ? activeWallet.assets : [];
  const disabled = !address || !symbol || !decimals;
  const isFocused = useIsFocused();

  const headerLeftComp = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name='arrow-back-outline' width={28} height={28} fill='black' />
      </TouchableOpacity>
    );
  };

  const resetForm = () => {
    setAddress('');
    setSymbol('');
    setDecimals('');
    setnewAsset({});
    settokenDetail(null);
  };

  const addNewToken = () => {
    LMLoading.show();
    dispatch(WalletActions.addAsset(newAsset, activeWallet)).then((response) => {
      LMLoading.hide();
      const { success, data } = response;
      if (success) {
        resetForm();
        navigation.navigate('TokenAdded');
      } else {
        Toast.show({
          type: 'error',
          text2: 'Invalid token address',
        });
      }
    });
  };

  const addNewAsset = (token) => {
    LMLoading.show();
    const newAssetData = {
      ...token,
      balance: 0,
      contractAddress: token.address,
    };
    dispatch(WalletActions.addAsset(newAssetData, activeWallet)).then((response) => {
      LMLoading.hide();
      const { success, data } = response;
      if (success) {
        dispatch(WalletActions.getAssets(data));
        resetForm();
        navigation.navigate('TokenAdded');
      }
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackgroundContainerStyle: {
        backgroundColor: '#F8FAFC',
      },
      headerStyle: {
        backgroundColor: '#F8FAFC',
        shadowColor: '#F8FAFC',
      },
      headerLeftContainerStyle: {
        paddingHorizontal: 15,
      },
      headerLeft: headerLeftComp,
      headerRight: '',
      headerTitle: '',
    });
  }, []);

  useEffect(() => {
    if (assets) {
      setLoading(true);
      const isExist = assets.findIndex((x) => x.address === address);
      setIsExist(isExist > -1);
      setInvalidToken(false);
      setInvalidAddress(address.length > 0 && !utils.isAddress(address));
      if (isExist === -1) {
        if (utils.isAddress(address)) {
          dispatch(TokenAction.validateToken(activeWallet, address)).then((response) => {
            if (response.success) {
              const { data, tokenDetail } = response;
              settokenDetail(tokenDetail[Object.keys(tokenDetail)[0]]);
              setLoading(false);
              if (data) {
                setnewAsset({
                  ...data,
                  slug: tokenDetail[Object.keys(tokenDetail)[0]].slug,
                });
                setSymbol(data.symbol);
                setDecimals(data.decimals.toString());
              }
            } else {
              settokenDetail(null);
              setLoading(false);
              setInvalidToken(true);
              setSymbol('');
              setDecimals('');
            }
          });
        } else {
          settokenDetail(null);
          setLoading(false);
          setSymbol('');
          setDecimals('');
        }
      } else {
        settokenDetail(null);
        setLoading(false);
        setSymbol('');
        setDecimals('');
      }
    }
  }, [address]);

  useEffect(() => {
    resetForm();
  }, [isFocused]);

  console.log(activeWallet)

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={styles.tabHeader}>
          <View style={{ width: '50%', alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.tabButton, tabIndex === 0 ? styles.tabFill : '']}
              onPress={() => setTabIndex(0)}
            >
              <Text style={[styles.tabIndicator, tabIndex === 0 ? { color: 'white' } : '']}>
                Select Token
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%', alignItems: 'center' }}>
            <TouchableOpacity
              style={[styles.tabButton, tabIndex === 1 ? styles.tabFill : '']}
              onPress={() => setTabIndex(1)}
            >
              <Text style={[styles.tabIndicator, tabIndex === 1 ? { color: 'white' } : '']}>
                Custom Token
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          {tabIndex ? (
            <View>
              <View style={styles.customToken}>
                <View style={styles.inputWrapper}>
                  <View style={styles.labelTextWrapper}>
                    <Text style={styles.labelText}>Token Address</Text>
                  </View>

                  <TextInput
                    style={styles.input}
                    value={address}
                    placeholder='Token Address'
                    onChangeText={(text) => setAddress(text)}
                    maxLength={50}
                  />
                  {isExist && (
                    <Text style={styles.errorMessage}>Token has already been added.</Text>
                  )}

                  {invalidAddress && <Text style={styles.errorMessage}>Invalid address</Text>}

                  {invalidToken && <Text style={styles.errorMessage}>Token does not exist.</Text>}
                </View>

                {loading && <ActivityIndicator size='large' />}

                {symbol !== '' ? (
                  <View>
                    <View style={styles.inputWrapper}>
                      <View style={styles.labelTextWrapper}>
                        <Text style={styles.labelText}>Token Symbol</Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        value={symbol}
                        placeholder='Token Symbol'
                        onChangeText={(text) => setSymbol(text)}
                        editable={false}
                      />
                    </View>

                    <View style={styles.inputWrapper}>
                      <View style={styles.labelTextWrapper}>
                        <Text style={styles.labelText}>Token Decimals</Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        value={decimals}
                        placeholder='Token Decimals'
                        onChangeText={(text) => setDecimals(text)}
                        editable={false}
                      />
                    </View>
                  </View>
                ) : (
                  <></>
                )}

                {tokenDetail && (
                  <View style={styles.tokenDetails}>
                    <Image source={{ uri: tokenDetail.logo }} style={styles.logoImage} />
                    <View>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '700', fontSize: 16 }}>{tokenDetail.name}</Text>
                        <Text style={{ fontWeight: '500' }}> ({tokenDetail.symbol})</Text>
                      </View>
                      <Text style={{ fontWeight: '500' }}>Balance: {newAsset.balance}</Text>
                    </View>
                  </View>
                )}
              </View>
              <View style={{ flexDirection: 'row', marginTop: 30 }}>
                <View style={{ flex: 1, paddingRight: 5 }}>
                  <TouchableOpacity
                    style={[styles.button, { borderWidth: 1, borderColor: '#013BFF' }]}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={[styles.buttonText, { color: '#013BFF' }]}>Cancel</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1, paddingLeft: 5 }}>
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: disabled ? 'gray' : '#013BFF' }]}
                    onPress={addNewToken}
                    disabled={disabled}
                  >
                    <Text style={[styles.buttonText, { color: 'white' }]}>Add Token</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.selectToken}>
              {commonTokens.map((token, index) => {
                if (quotes[token.symbol])
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.tokenItem}
                      onPress={() => addNewAsset(token)}
                    >
                      <Image
                        source={{
                          uri:
                            'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                            quotes[token.symbol].id +
                            '.png',
                        }}
                        style={styles.tokenLogo}
                      />
                      <View>
                        <Text style={styles.tokenSymbol}>{token.symbol}</Text>
                        <Text style={styles.tokenName}>{quotes[token.symbol].name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
              })}
              {customTokens.map((token, index) => {
                if (quotes[token.symbol])
                  return (
                    <TouchableOpacity
                      key={index}
                      style={styles.tokenItem}
                      onPress={() => addNewAsset(token)}
                    >
                      <Image
                        source={{
                          uri:
                            'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                            quotes[token.symbol].id +
                            '.png',
                        }}
                        style={styles.tokenLogo}
                      />
                      <View>
                        <Text style={styles.tokenSymbol}>{token.symbol}</Text>
                        <Text style={styles.tokenSymbol}>{token.platform}</Text>
                        <Text style={styles.tokenName}>{quotes[token.symbol].name}</Text>
                      </View>
                    </TouchableOpacity>
                  );
              })}
            </View>
          )}
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default AddAsset;
