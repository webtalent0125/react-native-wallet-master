import React, {
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useState,
} from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { RNCamera } from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-eva-icons';
import { utils } from 'ethers';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import NavigationHeader from '../../../components/navigation';
import QrcodescanIcon from '../../../assets/images/svg/qrcodescan.svg';
import { TransactionAction } from '../../../module/persistent/transaction/TransactionAction';
import LMLoading from '../../../components/common/LMLoading';
import { styles } from './styles';

const SendTransaction = (props) => {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { activeWallet } = useSelector((state) => state.WalletReducer);
  const { activeNetwork, networks } = useSelector(
    (state) => state.NetworkReducer
  );
  const { gasPrice } = useSelector((state) => state.TransactionReducer);
  const { currency, quotes } = useSelector((state) => state.CurrencyReducer);

  const snapPoints = useMemo(() => ['100%'], []);
  const WalletScanModal = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [ToAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [balanceError, setBalanceError] = useState(false);
  const [invalidAddress, setInvalidAddress] = useState(false);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [transactionAvailable, setTransactionAvailable] = useState(true);
  const [selectedBalance, setSelectedBalance] = useState({
    symbol: 'EXZO',
    balance: 0,
    contractAddress: '0xF8fC63200e181439823251020d691312FDcF5090',
    decimals: 9,
    platform: 'Binance Smart Chain',
  });

  useEffect(() => {
    setInvalidAddress(false);
    setTransactionAvailable(false);
    if (ToAddress.length > 0 && !utils.isAddress(ToAddress)) {
      setInvalidAddress(true);
      setTransactionAvailable(false);
    } else {
    }
  }, [ToAddress]);

  useEffect(() => {
    if (!amount) {
      setTransactionAvailable(false);
      setBalanceError(false);
      setInvalidAmount(false);
    } else {
      if (!Number(amount)) {
        setTransactionAvailable(false);
        setBalanceError(false);
        setInvalidAmount(true);
      } else {
        setInvalidAmount(false);
        if (
          parseFloat(amount) > parseFloat(selectedBalance.balance) ||
          parseFloat(amount) === 0
        ) {
          setBalanceError(true);
          setTransactionAvailable(false);
        } else {
          setBalanceError(false);
          setTransactionAvailable(true);
        }
      }
    }
  }, [amount]);

  // useEffect(() => {
  //   dispatch(TransactionAction.getGasprice());
  // }, []);

  const onChangeAmount = (text) => {
    const reg = /^\d*\.?\d*$/;
    if (reg.test(text)) {
      setAmount(text);
    }
  };

  const ScanWallet = useCallback(() => {
    setToAddress('');
    WalletScanModal.current?.present();
  }, []);

  const onSuccess = (e) => {
    setToAddress(e.data);
    WalletScanModal.current?.close();
  };

  const sendTransaction = () => {
    if (!balanceError) {
      LMLoading.show();
      dispatch(
        TransactionAction.sendTransaction({
          ToAddress,
          amount,
          note,
          gasPrice: 0,
          activeWallet,
          contractAddress: selectedBalance.contractAddress,
          decimals: selectedBalance.decimals,
          platform: selectedBalance.platform,
          symbol: selectedBalance.symbol,
        })
      ).then((response) => {
        if (response.success) {
          setToAddress('');
          setAmount('');
          setNote('');
          Toast.show({
            type: 'success',
            text2: 'Transaction is sent.',
          });
          navigation.goBack();
        } else {
          Toast.show({
            type: 'error',
            text2: response.data,
          });
        }
      });
    } else return false;
  };

  const selectBalance = (
    symbol,
    balance,
    contractAddress = null,
    decimals = null,
    platform = null
  ) => {
    setSelectedBalance({
      symbol,
      balance,
      contractAddress,
      decimals,
      platform,
    });
    setAmount('');
    setModalVisible(false);
  };

  useEffect(() => {
    if (activeWallet.assets) {
      const index = activeWallet.assets.findIndex((x) => x.symbol === 'EXZO');
      setSelectedBalance({
        symbol: 'EXZO',
        contractAddress: '0xF8fC63200e181439823251020d691312FDcF5090',
        decimals: 9,
        balance: activeWallet.assets[index].balance,
        platform: 'Binance Smart Chain',
      });
    }
  }, [activeWallet]);

  const amountRef = useRef(null);

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationHeader {...props} title='Send Bitcoin' />
      <View style={styles.background}>
        <KeyboardAwareScrollView
          style={{
            borderTopRightRadius: 32,
            borderTopLeftRadius: 32,
          }}
        >
          <View style={styles.mainContent}>
            <Pressable onPress={() => setModalVisible(true)}>
              <View style={styles.balanceCoin}>
                <View style={styles.tokenHead}>
                  <Image
                    style={styles.tokenLogo}
                    source={{
                      uri:
                        'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                        quotes[selectedBalance.symbol].id +
                        '.png',
                    }}
                    width={20}
                    height={20}
                  />
                  <Text style={styles.tokenIconName}>
                    {quotes[selectedBalance.symbol].name}
                  </Text>
                </View>

                <View style={styles.tokenIconBalance}>
                  <Text style={styles.tokenIconBalanceText}>
                    Available{' '}
                    {Intl.NumberFormat().format(
                      parseFloat(selectedBalance.balance)
                    )}
                  </Text>
                </View>
              </View>
            </Pressable>

            <View style={styles.sendForm}>
              <View style={styles.formAmount}>
                <Pressable
                  style={styles.amountInputContainer}
                  onPress={() => amountRef.current.focus()}
                >
                  <TextInput
                    ref={amountRef}
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={(text) => onChangeAmount(text)}
                    keyboardType='numeric'
                    maxLength={100}
                    placeholder={`0.0`}
                  />
                  <Text
                    style={[
                      styles.amountInputText,
                      { opacity: !amount ? 0.2 : 1 },
                    ]}
                  >
                    {' '}
                    {selectedBalance.symbol}
                  </Text>
                </Pressable>
                <Text style={styles.amountMoney}>$244,000</Text>
                <Text style={styles.amountText}>Enter amount</Text>
              </View>
              <View style={styles.formElement}>
                <Text style={styles.formLabel}>Enter Address</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      flex: 1,
                      paddingRight: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#F0F3FF',
                      borderRadius: 4,
                    }}
                  >
                    <TextInput
                      style={styles.textInput}
                      value={ToAddress}
                      onChangeText={(text) => setToAddress(text)}
                      maxLength={50}
                    />
                    <TouchableOpacity onPress={ScanWallet}>
                      <QrcodescanIcon width={24} height={24} fill='blue' />
                    </TouchableOpacity>
                  </View>
                </View>
                {invalidAddress && (
                  <Text style={styles.formError}>Invalid address detected</Text>
                )}
              </View>

              <View style={styles.formElement}>
                <Text style={styles.formLabel}>Note</Text>
                <TextInput
                  style={styles.textInput}
                  value={note}
                  onChangeText={(text) => setNote(text)}
                  multiline={true}
                  maxLength={100}
                />
              </View>

              <Text style={styles.formText}>
                Transaction fees: {gasPrice} GWEI
              </Text>
              <Text style={styles.formText}>
                Min: 0.00061 BTC - Max: 2.0006 BTC
              </Text>
            </View>

            <View>
              <Text style={styles.contentText}>
                * Block/Time will be calculated after the transaction is
                generated and broadcasted. Exzo LLC is not responsible for lost,
                stolen, or funds sent to the wrong wallet address/person.
              </Text>
            </View>

            <TouchableOpacity
              style={[
                styles.sendButton,
                !transactionAvailable && styles.buttonDisable,
              ]}
              onPress={sendTransaction}
              disabled={!transactionAvailable}
            >
              <Text style={styles.buttonText}>
                {transactionAvailable ? 'Next' : 'Send Payment'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={WalletScanModal}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: 'black',
          }}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
        >
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            fadeIn={false}
            reactivate={false}
            showMarker={true}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <Pressable onPress={() => setModalVisible(false)}>
            <Icon
              name='arrow-back-outline'
              width={24}
              height={24}
              fill='black'
            />
          </Pressable>

          {networks.map((network, netindex) => {
            return (
              <View style={{ marginTop: 20 }} key={netindex}>
                <Text style={styles.networkTitle}>{network.displayName}</Text>

                {activeWallet?.mainassets && (
                  <View style={styles.balanceWrapper}>
                    {activeWallet.mainassets.map((asset, index) => {
                      if (asset.platform === network.displayName)
                        return (
                          <React.Fragment key={index}>
                            {quotes[asset.symbol] && (
                              <Pressable
                                onPress={() =>
                                  selectBalance(
                                    asset.symbol,
                                    asset.balance,
                                    asset.contractAddress ?? null,
                                    asset.decimals ?? null,
                                    asset.platform
                                  )
                                }
                              >
                                <View style={styles.balanceItem}>
                                  <Image
                                    style={styles.tokenLogo}
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
                                    <Text style={styles.tokenName}>
                                      {quotes[asset.symbol].name}
                                    </Text>
                                    <Text style={styles.tokenSymbol}>
                                      {asset.symbol}
                                    </Text>
                                  </View>

                                  <View>
                                    <Text style={styles.tokenBalanceTitle}>
                                      Available Balance
                                    </Text>
                                    <Text style={styles.tokenBalance}>
                                      {Intl.NumberFormat().format(
                                        parseFloat(asset.balance)
                                      )}{' '}
                                      {asset.symbol}
                                    </Text>
                                  </View>
                                </View>
                              </Pressable>
                            )}
                          </React.Fragment>
                        );
                    })}

                    {activeWallet.assets.map((asset, index) => {
                      if (asset.platform === network.displayName)
                        return (
                          <React.Fragment key={index}>
                            {quotes[asset.symbol] && (
                              <Pressable
                                onPress={() =>
                                  selectBalance(
                                    asset.symbol,
                                    asset.balance,
                                    asset.contractAddress ?? null,
                                    asset.decimals ?? null,
                                    asset.platform
                                  )
                                }
                              >
                                <View style={styles.balanceItem}>
                                  <Image
                                    style={styles.tokenLogo}
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
                                    <Text style={styles.tokenName}>
                                      {quotes[asset.symbol].name}
                                    </Text>
                                    <Text style={styles.tokenSymbol}>
                                      {asset.symbol}
                                    </Text>
                                  </View>

                                  <View>
                                    <Text style={styles.tokenBalanceTitle}>
                                      Available Balance
                                    </Text>
                                    <Text style={styles.tokenBalance}>
                                      {Intl.NumberFormat().format(
                                        parseFloat(asset.balance)
                                      )}{' '}
                                      {asset.symbol}
                                    </Text>
                                  </View>
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
      </Modal>
    </GestureHandlerRootView>
  );
};

export default SendTransaction;
