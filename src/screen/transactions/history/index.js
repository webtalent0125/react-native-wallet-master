import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { useSelector } from 'react-redux';
import NavigationHeader from '../../../components/navigation';
import { styles } from './styles';

const TransactionHistory = (props) => {
  const { transactions } = useSelector((state) => state.WalletReducer);
  const { activeNetwork } = useSelector((state) => state.NetworkReducer);
  const { currency } = useSelector((state) => state.CurrencyReducer);

  return (
    <View style={styles.container}>
      <NavigationHeader {...props} title="Transactions" />

      <View style={styles.mainContent}>
        <Text>adsdasd</Text>
        {transactions.map((transaction, index) => {
          return (
            <TouchableOpacity key={index}>
              <View style={styles.transaction}>
                <View style={styles.statusIcon}>
                  {transaction.sentOrReceived === 'Sent' ? (
                    <Icon
                      name="diagonal-arrow-right-up-outline"
                      width={24}
                      height={24}
                      fill="white"
                    />
                  ) : (
                    <Icon
                      name="arrow-downward-outline"
                      width={24}
                      height={24}
                      fill="white"
                    />
                  )}
                </View>
                <View style={styles.transactionDetails}>
                  <View style={{ flex: 1 }}>
                    {transaction.sentOrReceived === 'Sent' ? (
                      <Text style={styles.statusText}>Send</Text>
                    ) : (
                      <Text style={styles.statusText}>Receive</Text>
                    )}
                    <Text style={styles.address}>
                      From {transaction.from.slice(0, 7)}...
                      {transaction.from.slice(37)}
                    </Text>
                  </View>

                  <View style={styles.right}>
                    <Text style={styles.tokenAmount}>
                      {transaction.etherValue} {activeNetwork.symbol}
                    </Text>
                    <Text style={styles.currencyValue}>
                      {currency.symbol}{' '}
                      {transaction.etherValue * currency.value}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TransactionHistory;
