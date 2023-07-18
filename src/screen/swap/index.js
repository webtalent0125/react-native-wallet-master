import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Image,
  Pressable,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
import { SwapActions } from '../../module/persistent/swap/SwapActions';
import LMNetworkSelectorModal from '../../components/common/LMNetworkSelectorModal';
import { logo } from '../../assets/images';
import { styles } from './styles';
import { WalletActions } from '../../module/persistent/wallet/WalletActions';
import ConfirmSwap from '../../components/swap/confirmSwap';
import NavigationHeader from '../../components/navigation';
import CloseSvg from '../../assets/images/svg/close.svg';
import { Slider } from '@miblanchard/react-native-slider';
import LMExchangesSelector from '../../components/common/LMExchangesSelector';
import LMSelectModal from '../../components/common/LMSelectModal';

const Swap = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { activeWallet } = useSelector((state) => state.WalletReducer);
  const { quotes } = useSelector((state) => state.CurrencyReducer);
  const { activeNetwork } = useSelector((state) => state.NetworkReducer);
  const { commonTokens, customTokens } = useSelector(
    (state) => state.TokenReducer
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [optionModalVisible, setoptionModalVisible] = useState(false);
  const [confirmModal, setconfirmModal] = useState(false);
  const [mainToken, setMainToken] = useState();
  const [tokenFrom, setTokenFrom] = useState();
  const [tokenTo, setTokenTo] = useState();
  const [isFrom, setIsFrom] = useState(false);
  const [swapQuote, setswapQuote] = useState();
  const [calculating, setCalculating] = useState(false);
  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(false);
  const [insufficient, setInsufficient] = useState(false);
  const [sending, setSending] = useState(false);
  const [slippage, setSlippage] = useState(Number.parseFloat(0.5));
  const [gas, setGas] = useState(1);
  const [availableTokens, setavailableTokens] = useState([]);
  const [showApprove, setShowApprove] = useState(false);
  const [activeTab, setActiveTab] = useState('market');
  const [activeGas, setActiveGas] = useState('');
  const isFocused = useIsFocused();
  const [error, setError] = useState('');

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const headerComp = () => {
    return <Text style={{ fontSize: 18, fontWeight: '500' }}>Swap</Text>;
  };

  const openModal = (isFrom) => {
    if (isFrom) setIsFrom(true);
    else setIsFrom(false);
    setModalVisible(true);
  };

  const selectToken = (asset) => {
    let selectedToken;
    let index = commonTokens.findIndex((x) => x.symbol === asset.symbol);
    if (index > -1)
      selectedToken = {
        symbol: asset.symbol,
        tokenaddress: commonTokens[index].address,
        decimals: commonTokens[index].decimals,
      };
    else {
      index = customTokens.findIndex((x) => x.symbol === asset.symbol);
      if (index > -1)
        selectedToken = {
          symbol: asset.symbol,
          tokenaddress: customTokens[index].address,
          decimals: customTokens[index].decimals,
        };
    }

    if (isFrom) {
      if (tokenTo && tokenTo.tokenaddress === selectedToken.tokenaddress) {
        setTokenTo('');
      }
      setTokenFrom(selectedToken);
    } else {
      if (tokenFrom.tokenaddress === selectedToken.tokenaddress) {
        setTokenFrom('');
      }
      setTokenTo(selectedToken);
    }
    setModalVisible(false);
  };

  const setTokenAmount = (amount) => {
    const reg = /^\d*\.?\d*$/;
    if (reg.test(amount)) {
      setTokenFrom({
        ...tokenFrom,
        amount,
      });
      if (parseFloat(amount) > parseFloat(balance(tokenFrom.symbol))) {
        setError('Your entered amount is greater then balance.');
      } else {
        setError('');
      }
    }
  };

  const changeToken = () => {
    const tokenfrom = { ...tokenFrom };
    if (tokenTo) {
      setTokenFrom({ ...tokenTo, amount: '' });
    } else {
      setTokenFrom(null);
    }

    if (tokenFrom) {
      setTokenTo({ ...tokenfrom, amount: '' });
    } else {
      setTokenTo(null);
    }
  };

  const balance = (symbol) => {
    const index = availableTokens.findIndex((x) => x.symbol === symbol);
    if (index > -1) return availableTokens[index].balance;
    else return 0;
  };

  const resetPage = () => {
    const index = commonTokens.findIndex(
      (x) => x.symbol === activeNetwork.symbol
    );
    const tokenDetail = {
      symbol: activeNetwork.symbol,
      tokenaddress: commonTokens[index].address,
      decimals: commonTokens[index].decimals,
      amount: '',
    };
    setTokenFrom(tokenDetail);
    setTokenTo();
    setswapQuote();
    setMainToken(tokenDetail);
    setError('');
  };

  const approveToken = () => {
    setSending(true);
    dispatch(
      SwapActions.approveToken(
        tokenFrom,
        tokenTo,
        activeNetwork.chainId,
        slippage,
        activeWallet
      )
    ).then((response) => {
      if (response.success) {
        setSending(false);
        setShowApprove(false);
        getSwapQuotes();
      } else {
        setSending(false);
        Toast.show({
          type: 'error',
          text2: response.message,
        });
      }
    });
  };

  const getSwapQuotes = () => {
    dispatch(
      SwapActions.getQuotes(
        tokenFrom,
        tokenTo,
        activeNetwork.chainId,
        slippage,
        activeWallet
      )
    ).then((response) => {
      if (response.success) {
        setAvailable(true);
        setswapQuote(response.data);
        setCalculating(false);
        setInsufficient(false);
      } else {
        if (response.message && response.message.indexOf('allowance') > -1) {
          setShowApprove(true);
        }
        setInsufficient(true);
        setswapQuote(null);
        setCalculating(false);
      }
    });
  };

  const swapToken = () => {
    setconfirmModal(false);
    setSending(true);
    dispatch(
      SwapActions.swapToken(activeNetwork.chainId, activeWallet, swapQuote)
    ).then((response) => {
      if (response.success) {
        resetPage();
        dispatch(WalletActions.getActiveWallet());
        navigation.navigate('SwapTxComplete', {
          swapQuote,
          tokenTo,
          error: false,
        });
        setSending(false);
      } else {
        navigation.navigate('SwapTxComplete', {
          swapQuote,
          tokenTo,
          error: true,
        });
        setSending(false);
      }
    });
  };

  useEffect(() => {
    setswapQuote();
    let assetTokens = [];
    if (activeWallet.mainassets)
      activeWallet.mainassets.forEach((asset) => {
        if (asset.platform === activeNetwork.displayName) {
          assetTokens.push(asset);
        }
      });
    if (activeWallet.assets)
      activeWallet.assets.forEach((asset) => {
        if (asset.platform === activeNetwork.displayName) {
          assetTokens.push(asset);
        }
      });
    setavailableTokens(assetTokens);
    const index = commonTokens.findIndex(
      (x) => x.symbol === activeNetwork.symbol
    );
    if (index > -1) {
      resetPage();
    } else return 0;
  }, [activeNetwork, activeWallet]);

  useEffect(async () => {
    if (!optionModalVisible) {
      setSending(false);
      setAvailable(false);
      setShowApprove(false);
      if (tokenTo && tokenFrom && tokenFrom.amount > 0) {
        await sleep(500);
        setCalculating(true);
        getSwapQuotes();
      } else {
        setswapQuote(null);
      }
    }
  }, [tokenTo, tokenFrom, optionModalVisible]);

  useEffect(() => {
    resetPage();
  }, [isFocused]);

  const changeSlippage = (value) => {
    if (isNaN(value))
      setSlippage((prevState) => {
        return prevState;
      });
    else if (Number.parseFloat(value) > 100) {
      setSlippage(20);
    } else setSlippage(value);
  };

  const changeGas = (text) => {
    if (text === '') setGas(1);
    else if (isNaN(text))
      setGas((prevState) => {
        return prevState;
      });
    else setGas(text);
  };

  return (
    <View style={styles.container}>
      <NavigationHeader
        title='Swap'
        navigation={navigation}
        drawer
        search
        bell
      />
      <View style={styles.background}>
        <KeyboardAwareScrollView
          style={{ flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        >
          <View style={styles.mainContent}>
            {loading ? (
              <View style={styles.loadingComponent}>
                <Image source={logo} style={styles.exzoLogo} />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    marginVertical: 30,
                  }}
                >
                  Loading components...
                </Text>
                <ActivityIndicator size='large' />
              </View>
            ) : (
              <>
                <View style={styles.swapCard}>
                  <View style={styles.swapHeader}>
                    <View style={styles.swapHeaderButtons}>
                      <TouchableOpacity onPress={() => setActiveTab('market')}>
                        <Text
                          style={[
                            styles.swapHeaderButtonText,
                            activeTab === 'market'
                              ? styles.swapHeaderButtonTextActive
                              : '',
                          ]}
                        >
                          Market
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setActiveTab('limit')}>
                        <Text
                          style={[
                            styles.swapHeaderButtonText,
                            activeTab === 'limit'
                              ? styles.swapHeaderButtonTextActive
                              : '',
                          ]}
                        >
                          Limit
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Pressable onPress={() => setoptionModalVisible(true)}>
                      <Icon
                        name='more-horizontal'
                        width={35}
                        height={35}
                        fill='#8FA2B7'
                      />
                    </Pressable>
                  </View>

                  <View style={styles.swapForm}>
                    <View>
                      <View style={styles.swapTokenWrapper}>
                        <Text style={styles.swapText}>From</Text>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <View style={styles.amount}>
                            <TextInput
                              placeholder='0'
                              keyboardType='numeric'
                              style={styles.amountInput}
                              editable={tokenFrom ? true : false}
                              onChangeText={(text) => setTokenAmount(text)}
                              value={tokenFrom ? tokenFrom.amount : ''}
                            />
                            <Pressable
                              disabled={tokenFrom ? false : true}
                              onPress={() => {
                                setTokenAmount(
                                  balance(tokenFrom ? tokenFrom.symbol : '')
                                );
                              }}
                            >
                              <Text style={styles.tokenMax}>Max</Text>
                            </Pressable>
                          </View>
                          <Pressable
                            style={styles.swapToken}
                            onPress={() => openModal(true)}
                          >
                            {!!tokenFrom?.symbol && (
                              <Image
                                style={styles.tokenLogo}
                                source={{
                                  uri:
                                    'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                                    quotes[tokenFrom.symbol].id +
                                    '.png',
                                }}
                              />
                            )}
                            {tokenFrom?.symbol ? (
                              <Text style={styles.tokenSymbol}>
                                {quotes[tokenFrom.symbol].symbol}
                              </Text>
                            ) : (
                              <Text style={styles.tokenSymbol}>
                                Select a token
                              </Text>
                            )}
                            <Icon
                              name='chevron-down-outline'
                              width={24}
                              height={24}
                              fill='black'
                            />
                          </Pressable>
                        </View>
                        <View style={{ marginTop: 10 }}>
                          <Text style={styles.tokenBalance}>
                            Balance{' '}
                            {Intl.NumberFormat().format(
                              parseFloat(
                                balance(tokenFrom ? tokenFrom.symbol : '')
                              )
                            )}
                          </Text>
                        </View>
                        <View style={styles.tokenError}>
                          {!!error && (
                            <Text style={styles.tokenErrorText}>{error}</Text>
                          )}
                        </View>
                      </View>

                      <View
                        style={[styles.swapTokenWrapper, { marginTop: 10 }]}
                      >
                        <Text style={styles.swapText}>To</Text>
                        <View
                          style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                          <View style={styles.amount}>
                            <Text style={styles.amountText}>
                              {swapQuote ? swapQuote.toTokenAmount : ''}
                            </Text>
                            <Pressable disabled={tokenTo ? false : true}>
                              <Text style={styles.tokenMax}>Max</Text>
                            </Pressable>
                          </View>
                          <Pressable
                            style={styles.swapToken}
                            onPress={() => openModal(false)}
                          >
                            {!!tokenTo?.symbol && (
                              <Image
                                style={styles.tokenLogo}
                                source={{
                                  uri:
                                    'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                                    quotes[tokenTo.symbol].id +
                                    '.png',
                                }}
                              />
                            )}
                            {tokenTo?.symbol ? (
                              <Text style={styles.tokenSymbol}>
                                {quotes[tokenTo.symbol].symbol}
                              </Text>
                            ) : (
                              <Text style={styles.tokenSymbol}>
                                Select a token
                              </Text>
                            )}
                            <Icon
                              name='chevron-down-outline'
                              width={24}
                              height={24}
                              fill='black'
                            />
                          </Pressable>
                        </View>
                        <View style={{ marginTop: 10 }}>
                          <Text style={styles.tokenBalance}>
                            Balance{' '}
                            {Intl.NumberFormat().format(
                              parseFloat(balance(tokenTo ? tokenTo.symbol : ''))
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <Text style={styles.slippageValue}>
                      Slippage: {slippage}%
                    </Text>

                    {showApprove ? (
                      <TouchableOpacity
                        style={[
                          styles.swapButton,
                          sending ? { backgroundColor: 'gray' } : '',
                        ]}
                        onPress={approveToken}
                        disabled={sending}
                      >
                        <Text style={styles.buttonText}>
                          {sending ? 'Approving' : 'Approve'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.swapButton,
                          !tokenTo ||
                          calculating ||
                          sending ||
                          insufficient ||
                          !available
                            ? { backgroundColor: 'gray' }
                            : '',
                        ]}
                        disabled={calculating || !tokenTo || !available}
                        onPress={() => setconfirmModal(true)}
                      >
                        {calculating ? (
                          <Text style={styles.buttonText}>Calculating</Text>
                        ) : (
                          <>
                            {sending ? (
                              <Text style={styles.buttonText}>
                                Please wait...
                              </Text>
                            ) : (
                              <Text style={styles.buttonText}>
                                {insufficient ? 'Insufficient balance' : 'Swap'}
                              </Text>
                            )}
                          </>
                        )}
                      </TouchableOpacity>
                    )}
                  </View>
                </View>

                {swapQuote && (
                  <View style={styles.transactionDetails}>
                    <View style={styles.textWrapper}>
                      <Text style={styles.detailText}>
                        1 {tokenFrom.symbol} ={' '}
                      </Text>
                      <Text style={styles.detailText}>
                        {Intl.NumberFormat().format(
                          swapQuote.toTokenAmount / swapQuote.fromTokenAmount
                        )}{' '}
                        {tokenTo.symbol}
                      </Text>
                    </View>

                    <View style={styles.textWrapper}>
                      <Text style={styles.detailText}>
                        1 {tokenTo.symbol} ={' '}
                      </Text>
                      <Text style={styles.detailText}>
                        {Intl.NumberFormat().format(
                          parseFloat(
                            swapQuote.fromTokenAmount / swapQuote.toTokenAmount
                          )
                        )}{' '}
                        {tokenFrom.symbol}
                      </Text>
                    </View>

                    <View style={styles.textWrapper}>
                      <Text style={styles.detailText}>Transaction cost =</Text>
                      <Text style={styles.detailText}>
                        ~ $
                        {Intl.NumberFormat().format(
                          quotes[activeNetwork.symbol].quote.USD.price *
                            swapQuote.gasPrice *
                            swapQuote.estimatedGas
                        )}{' '}
                        or{' '}
                        {Intl.NumberFormat().format(
                          swapQuote.gasPrice * swapQuote.estimatedGas
                        )}{' '}
                        {activeNetwork.symbol}
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>

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
              <Text style={styles.modalTitle}>Select a Token</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Icon
                  name='close-outline'
                  width={20}
                  height={20}
                  fill='black'
                />
              </Pressable>
            </View>

            {availableTokens.map((asset, index) => {
              if (quotes[asset.symbol])
                return (
                  <Pressable
                    style={styles.modalTokenItem}
                    key={index}
                    onPress={() =>
                      selectToken({
                        symbol: asset.symbol,
                      })
                    }
                  >
                    <Image
                      style={styles.tokenLogo}
                      source={{
                        uri:
                          'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                          quotes[asset.symbol].id +
                          '.png',
                      }}
                    />
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <Text style={styles.tokenSymbol}>
                        {quotes[asset.symbol].symbol}{' '}
                      </Text>
                      <Text style={{ fontSize: 12 }}>
                        ({quotes[asset.symbol].name})
                      </Text>
                    </View>
                  </Pressable>
                );
            })}
          </View>
        </View>
      </Modal>

      <Modal
        animationType='fade'
        transparent={true}
        visible={optionModalVisible}
        onRequestClose={() => {
          if (!slippage) setSlippage(0.5);
          setoptionModalVisible(!optionModalVisible);
        }}
      >
        <ScrollView>
          <View style={styles.settingsModalContainer}>
            <View style={styles.settingsModalHeader}>
              <Pressable
                style={styles.closeButton}
                onPress={() => {
                  if (!slippage) setSlippage(0.5);
                  setoptionModalVisible(false);
                }}
              >
                <CloseSvg />
              </Pressable>
              <Text style={styles.settingsModalTitle}>Advance Settings</Text>
            </View>
            <View style={styles.settingsModalBody}>
              <View>
                <LMSelectModal ref={(ref) => LMSelectModal.setRef(ref)} />
                <Text style={styles.settingsModalText}>
                  Select Main Network
                </Text>
                <LMNetworkSelectorModal />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 30,
                  }}
                >
                  <Text style={styles.settingsModalTextBold}>Slippage:</Text>
                  <TextInput
                    style={styles.SlippageInput}
                    value={slippage.toString()}
                    onChangeText={changeSlippage}
                    keyboardType='numeric'
                    maxLength={4}
                  ></TextInput>
                </View>
                <View style={styles.slippageWrapper}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'stretch',
                      justifyContent: 'center',
                    }}
                  >
                    <Slider
                      value={slippage ? slippage : 0.5}
                      onValueChange={(value) => {
                        changeSlippage(Number.parseFloat(value).toFixed(1));
                      }}
                      minimumValue={0.1}
                      maximumValue={100}
                      trackStyle={{ borderRadius: 5, height: 9 }}
                      thumbStyle={{
                        width: 21,
                        height: 21,
                        backgroundColor: 'white',
                        shadowColor: '#000000',
                        shadowOffset: {
                          width: 0,
                          height: 4,
                        },
                        shadowOpacity: 0.7,
                        shadowRadius: 30,
                        elevation: 3,
                      }}
                      minimumTrackTintColor='#3755F0'
                      maximumTrackTintColor='#F0F3FF'
                      step={0.1}
                    />
                  </View>
                </View>
                <Text style={styles.settingsModalText}>Exchanges</Text>
                <LMExchangesSelector />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <Text style={styles.settingsModalTextBold}>Gas Price</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#0D1F3C',
                      marginTop: 30,
                    }}
                  >
                    Medium (82.63 Gwei)
                  </Text>
                </View>
                <View style={styles.settingsGas}>
                  <TouchableOpacity
                    style={[
                      styles.settingsGasItem,
                      activeGas === '55' && styles.settingsGasItemActive,
                    ]}
                    onPress={() => setActiveGas('55')}
                  >
                    <View
                      style={[
                        styles.settingsGasItemRadio,
                        activeGas === '55' && styles.settingsGasItemRadioActive,
                      ]}
                    >
                      {activeGas === '55' && (
                        <View style={styles.settingsGasRadioInner}></View>
                      )}
                    </View>
                    <Text style={styles.settingsGasItemTilte}>55 Gwei</Text>
                    <Text style={styles.settingsGasItemText}>Fast</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.settingsGasItem,
                      activeGas === '90' && styles.settingsGasItemActive,
                    ]}
                    onPress={() => setActiveGas('90')}
                  >
                    <View
                      style={[
                        styles.settingsGasItemRadio,
                        activeGas === '90' && styles.settingsGasItemRadioActive,
                      ]}
                    >
                      {activeGas === '90' && (
                        <View style={styles.settingsGasRadioInner}></View>
                      )}
                    </View>
                    <Text style={styles.settingsGasItemTilte}>90 Gwei</Text>
                    <Text style={styles.settingsGasItemText}>Very Fast</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.settingsGasItem,
                      activeGas === 'custom' && styles.settingsGasItemActive,
                    ]}
                    onPress={() => setActiveGas('custom')}
                  >
                    <View
                      style={[
                        styles.settingsGasItemRadio,
                        activeGas === 'custom' &&
                          styles.settingsGasItemRadioActive,
                      ]}
                    >
                      {activeGas === 'custom' && (
                        <View style={styles.settingsGasRadioInner}></View>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15,
                      }}
                    >
                      <TextInput
                        style={styles.settingsGasInput}
                        keyboardType='numeric'
                        onChangeText={(text) => {
                          changeGas(text);
                          setActiveGas('custom');
                        }}
                        onPressIn={() => setActiveGas('custom')}
                        value={gas.toString()}
                        maxLength={1000}
                      />
                      <Text style={styles.settingsGasItemTilte}>Gwei</Text>
                    </View>
                    <Text style={styles.settingsGasItemText}>Custom</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>

      <ConfirmSwap
        confirmModal={confirmModal}
        tokenTo={tokenTo}
        swapQuote={swapQuote}
        closeModal={() => setconfirmModal(false)}
        swapToken={swapToken}
      />
    </View>
  );
};

export default Swap;
