import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { styles } from './styles';
import NavigationHeader from '../../navigation';

const ConfirmSwap = (props) => {
  const [modalVisible, setModalVisible] = useState(true);
  const { confirmModal, tokenTo, swapQuote } = props;
  const { quotes } = useSelector((state) => state.CurrencyReducer);
  const { activeNetwork } = useSelector((state) => state.NetworkReducer);

  const closeModal = () => {
    setModalVisible(false);
    props.closeModal();
  };

  const swapToken = () => {
    props.swapToken();
  };

  useEffect(() => {
    setModalVisible(confirmModal);
  }, [confirmModal]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.modalContainer}>
        <NavigationHeader title="Confirm Swap" close={closeModal} />

        <View style={styles.modalBackground}>
          {swapQuote && tokenTo && (
            <View style={styles.modalContent}>
              <View style={styles.txDetails}>
                <View style={styles.tokenDetail}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      style={styles.tokenLogo}
                      source={{
                        uri:
                          'https://s2.coinmarketcap.com/static/img/coins/64x64/' +
                          quotes[tokenTo.symbol].id +
                          '.png',
                      }}
                    />

                    <View>
                      <Text style={styles.tokenSymbol}>
                        {quotes[tokenTo.symbol].symbol}
                      </Text>
                      <Text style={styles.tokenName}>
                        {quotes[tokenTo.symbol].name}
                      </Text>
                    </View>
                  </View>

                  <Text>{swapQuote.toTokenAmount}</Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                  <Text style={styles.totalPrice}>
                    $
                    {Intl.NumberFormat().format(
                      quotes[tokenTo.symbol].quote.USD.price *
                        swapQuote.toTokenAmount
                    )}
                  </Text>
                  <Text style={styles.totalCost}>Total Cost</Text>
                </View>

                <View style={styles.divider}></View>

                <View style={styles.gasPrice}>
                  <Text style={styles.gasTitle}>Transaction Hash</Text>
                  <Text style={styles.gasAmount}>0x23e8e212999221</Text>
                </View>

                <View style={styles.gasPrice}>
                  <Text style={styles.gasTitle}>
                    Price Per {quotes[tokenTo.symbol].symbol}
                  </Text>
                  <Text style={styles.gasAmount}>
                    ${quotes[tokenTo.symbol].quote.USD.price}
                  </Text>
                </View>

                <View style={styles.gasPrice}>
                  <Text style={styles.gasTitle}>Gas fee</Text>
                  <Text style={styles.gasAmount}>
                    $
                    {swapQuote.gasPrice *
                      swapQuote.estimatedGas *
                      quotes[activeNetwork.symbol].quote.USD.price}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={swapToken}
              >
                <Text style={styles.confirmButtonText}>Confirm Swap</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmSwap;
