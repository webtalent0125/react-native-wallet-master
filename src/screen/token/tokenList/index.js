import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-eva-icons';
import { styles } from './styles';
import { WalletActions } from '../../../module/persistent/wallet/WalletActions';
import { TokenAction } from '../../../module/persistent/token/TokenAction';
import LMLoading from '../../../components/common/LMLoading';
import { SwipeListView } from 'react-native-swipe-list-view';

const TokenList = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const { activeWallet, wallets } = useSelector((state) => state.WalletReducer);
  const { commonTokens, customTokens } = useSelector(
    (state) => state.TokenReducer
  );
  const { quotes } = useSelector((state) => state.CurrencyReducer);
  const [tabIndex, setTabIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const headerLeftComp = () => {
    return (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" width={28} height={28} fill="black" />
      </TouchableOpacity>
    );
  };

  const headerRightComp = () => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('AddToken')}>
        <Icon name="plus-circle-outline" width={28} height={28} fill="black" />
      </TouchableOpacity>
    );
  };

  const deleteCustomToken = (asset) => {
    LMLoading.show();
    dispatch(WalletActions.removeAsset(asset, activeWallet)).then((resp) => {
      dispatch(TokenAction.getTokens());
      LMLoading.hide();
      setModalVisible(false);
    });
    console.log('asset', asset);
  };

  const RenderCustomToken = (props) => {
    console.log('props', props);
    const { item } = props;
    return (
      <View style={styles.tokenItem}>
        <Image
          source={{
            uri:
              'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
              quotes[item.symbol].id +
              '.png',
          }}
          style={styles.tokenLogo}
        />
        <View>
          <Text style={styles.tokenSymbol}>{item.symbol}</Text>
          <Text style={styles.tokenName}>{quotes[item.symbol].name}</Text>
        </View>
      </View>
    );
  };

  const renderHiddenItem = (rowData, rowMap) => {
    return (
      <View style={styles.deleteButtonWrapper}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            rowMap[rowData.index].closeRow();
            // deleteCustomToken(rowData.item);
            setModalVisible(true);
          }}
        >
          <Icon name="trash-2-outline" fill="white" width={24} height={24} />
        </TouchableOpacity>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.formLayout}>
              <Text style={styles.modalText}>
                Are you sure you want to delete this token?
              </Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity
                  style={styles.cancelButtonModal}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={[styles.buttonText, { color: 'black' }]}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.deleteButtonModal}
                  onPress={() => {
                    deleteCustomToken(rowData.item);
                  }}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
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
      headerRightContainerStyle: {
        paddingHorizontal: 15,
      },
      headerLeft: headerLeftComp,
      headerRight: headerRightComp,
      headerTitle: '',
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* <KeyboardAwareScrollView style={{ flex: 1 }}> */}
      <View style={styles.mainContent}>
        <View style={styles.tabBar}>
          <View style={styles.tabItem}>
            <Pressable
              style={[
                styles.tabButton,
                tabIndex === 0 ? { backgroundColor: '#013BFF' } : '',
              ]}
              onPress={() => setTabIndex(0)}
            >
              <Text
                style={[
                  styles.tabText,
                  tabIndex === 0 ? { color: 'white' } : '',
                ]}
              >
                Common
              </Text>
            </Pressable>
          </View>
          <View style={styles.tabItem}>
            <Pressable
              style={[
                styles.tabButton,
                tabIndex === 1 ? { backgroundColor: '#013BFF' } : '',
              ]}
              onPress={() => setTabIndex(1)}
            >
              <Text
                style={[
                  styles.tabText,
                  tabIndex === 1 ? { color: 'white' } : '',
                ]}
              >
                Custom
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.tokenLists}>
          {tabIndex === 0 ? (
            <View>
              {commonTokens.map((asset, index) => {
                if (quotes[asset.symbol])
                  return (
                    <View key={index} style={styles.tokenItem}>
                      <Image
                        source={{
                          uri:
                            'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                            quotes[asset.symbol].id +
                            '.png',
                        }}
                        style={styles.tokenLogo}
                      />
                      <View>
                        <Text style={styles.tokenSymbol}>{asset.symbol}</Text>
                        <Text style={styles.tokenName}>
                          {quotes[asset.symbol].name}
                        </Text>
                      </View>
                    </View>
                  );
              })}
            </View>
          ) : (
            <View>
              {customTokens && (
                <SwipeListView
                  data={customTokens}
                  renderItem={(data) => {
                    console.log('dataaa', data);
                    if (quotes[data.item.symbol]) {
                      return <RenderCustomToken {...data} />;
                    } else {
                      return <></>;
                    }
                  }}
                  renderHiddenItem={renderHiddenItem}
                  rightOpenValue={-50}
                  keyExtractor={(data, index) => index}
                />
              )}
            </View>
          )}
        </View>
      </View>
      {/* </KeyboardAwareScrollView> */}
    </View>
  );
};

export default TokenList;
