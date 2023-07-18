import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { txResultSuccess, txResultError } from '../../../assets/images';
import { styles } from './styles';
import { Icon } from 'react-native-eva-icons';

const SwapComplete = (props) => {
  const { navigation } = props;
  const { quotes } = useSelector((state) => state.CurrencyReducer);
  const { swapQuote, tokenTo, error } = props.route.params;

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
          >
            <Icon name="close" fill="#011B21" width={25} height={25} />
          </TouchableOpacity>
          {error ? (
            <Image source={txResultError} style={styles.logoImage} />
          ) : (
            <Image source={txResultSuccess} style={styles.logoImage} />
          )}
          <Text style={styles.title}>
            Transaction {error ? 'Failed' : 'Complete'}
          </Text>
          {error ? (
            <Text style={styles.content}>
              Sorry your transaction has failed please try adjusting the
              slippage or make sure you have enough to cover the gas fee’s.
            </Text>
          ) : (
            <Text style={styles.content}>
              Great job! Your transaction has been processed. Your purchase of{' '}
              {quotes[tokenTo.symbol].name} for $
              {quotes[tokenTo.symbol].quote.USD.price * swapQuote.toTokenAmount}{' '}
              has been successfully completed.
            </Text>
          )}
        </View>

        {error ? (
          <TouchableOpacity
            onPress={() => navigation.navigate('Swap')}
            style={styles.completeButton}
          >
            <Text style={styles.buttonText}>Try Again</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.completeButton}
          >
            <Text style={styles.buttonText}>Complete</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SwapComplete;
