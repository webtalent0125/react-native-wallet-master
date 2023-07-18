import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  Alert,
  ScrollView,
  SectionList,
  FlatList,
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-toast-message';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { WalletActions } from '../../../module/persistent/wallet/WalletActions';
import { styles } from './styles';
import Walletsvg from '../../../assets/images/svg/wallet.svg';
import LMLoading from '../../../components/common/LMLoading';
import NavigationHeader from '../../../components/navigation';

const WalletList = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const { activeWallet, wallets } = useSelector((state) => state.WalletReducer);
  const { activeNetwork } = useSelector((state) => state.NetworkReducer);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingWallet, setEditingWallet] = useState({});
  const [walletName, setWalletName] = useState('');
  const openRowRef = useRef(null);

  const data = [{ id: 1, title: 'Multi-Coin Wallets', innerArray: wallets }];

  const setActiveWallet = (wallet) => {
    if (wallet.address === activeWallet.address) return false;
    LMLoading.show();
    dispatch(WalletActions.setActiveWallet(wallet)).then((response) => {
      const { success } = response;
      LMLoading.hide();
      if (!success) {
        Toast.show({
          type: 'error',
          text2: 'Error occurred',
        });
      }
    });
  };

  const removeWallet = (wallet) => {
    if (wallet.address === activeWallet.address) {
      Toast.show({
        type: 'error',
        text2: 'Cannot remove active wallet',
      });
    } else {
      return Alert.alert(
        'Are your sure?',
        'Are you sure you want to remove this wallet?',
        [
          {
            text: 'Yes',
            onPress: () => {
              LMLoading.show();
              dispatch(WalletActions.removeWallet(wallet)).then((response) => {
                LMLoading.hide();
                Toast.show({
                  type: 'info',
                  text2: 'Wallet removed',
                });
              });
            },
          },
          {
            text: 'No',
          },
        ]
      );
    }
  };

  const editWalletName = (wallet) => {
    setModalVisible(true);
    setEditingWallet(wallet);
    setWalletName(wallet.name);
  };

  const updateWalletName = async () => {
    LMLoading.show();
    dispatch(WalletActions.updateWalletName(editingWallet, walletName));
    LMLoading.hide();
    setModalVisible(false);
  };

  const StatusIcon = ({ selected }) => {
    return (
      <View style={styles.border}>
        <View style={selected ? styles.fill : ''}></View>
      </View>
    );
  };

  const onRowDidOpen = (rowKey, rowMap) => {
    openRowRef.current = rowMap[rowKey];
  };

  const RenderWalletItem = ({ item }) => {
    return (
      <View style={styles.wallet}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={styles.logo}>
            <Walletsvg width={17} height={14} color="white" />
          </View>
          <View>
            <Text style={styles.walletTitle}>
              {item.name ? item.name : 'No name'}
            </Text>
            <Text style={styles.walletBalance}>
              {item.balance} {activeNetwork.symbol}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setActiveWallet(item)}>
          <StatusIcon selected={activeWallet.address === item.address} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderHiddenItem = (rowData, rowMap) => {
    return (
      <View style={styles.deleteButtonWrapper}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => {
            rowMap[rowData.index].closeRow();
            editWalletName(rowData.item);
          }}
        >
          <Icon name="edit-2-outline" fill="white" width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            rowMap[rowData.index].closeRow();
            removeWallet(rowData.item);
          }}
        >
          <Icon name="trash-2-outline" fill="white" width={24} height={24} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationHeader title="Wallets" navigation={navigation} modal />
      <View style={styles.background}>
        <FlatList
          style={styles.mainContent}
          data={data}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.title}>{item.title}</Text>
              <View style={styles.wallets}>
                <SwipeListView
                  nestedScrollEnabled={false}
                  scrollEnabled={false}
                  style={styles.swipeList}
                  data={item.innerArray}
                  renderItem={(data, rowMap) => <RenderWalletItem {...data} />}
                  renderHiddenItem={renderHiddenItem}
                  rightOpenValue={-95}
                  onRowDidOpen={onRowDidOpen}
                  keyExtractor={(data, index) => index}
                />
              </View>
            </View>
          )}
        />
      </View>

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
            <TextInput
              value={walletName}
              style={styles.nameInput}
              maxLength={25}
              onChangeText={(text) => {
                setWalletName(text);
              }}
            />

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.buttonText, { color: 'black' }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.updateButton}
                onPress={updateWalletName}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default WalletList;
