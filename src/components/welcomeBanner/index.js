import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Icon } from 'react-native-eva-icons';
import { money } from '../../assets/images';

const WelcomeBanner = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, paddingRight: 35 }}>
        <Text style={styles.title}>Welcome,</Text>
        <Text style={styles.text}>
          Buy ExzoCoin 2.0 Today for Extended Charts & Functionalities on
          ExzoSwap!{' '}
          <Text style={styles.learn} onPress={() => {}}>
            Learn more
          </Text>
        </Text>
      </View>
      <Image source={money} style={styles.money} />
      <TouchableOpacity style={styles.close}>
        <Icon
          name="close"
          width={18}
          height={18}
          fill="#334956"
          onPress={() => {}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeBanner;
