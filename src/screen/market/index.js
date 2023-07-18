import React, { useEffect, useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { Icon } from 'react-native-eva-icons';
import NavigationHeader from '../../components/navigation';
import { styles } from './styles';
import WelcomeBanner from '../../components/welcomeBanner';
import Coins from '../../components/coins';
import Featured from '../../components/featured';

const Market = (props) => {
  const { navigation } = props;
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <NavigationHeader title="Market" navigation={navigation} drawer bell />
      <View style={styles.background}>
        <KeyboardAwareScrollView
          style={{ flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        >
          <View style={styles.mainContent}>
            <WelcomeBanner />
            <View style={styles.title}>
              <Text style={styles.titleText}>Market is down</Text>
              <Text style={styles.titlePercentage}>-11.9%</Text>
            </View>
            <Text style={styles.time}>In the past 24 hours</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={search}
                placeholder="Search Cryptocurrencies..."
                onChangeText={(text) => setSearch(text)}
                maxLength={50}
              />
              <Icon
                style={styles.inputIcon}
                name="search"
                fill="#8FA2B7"
                width={24}
                height={24}
              />
            </View>
            <Coins navigation={navigation} />
            <Featured {...props} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Market;
