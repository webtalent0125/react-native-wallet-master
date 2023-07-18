import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { tokenadded } from '../../../assets/images';
import { styles } from './styles';

const TokenAdded = (props) => {
  const { navigation } = props;

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>New Token Added!</Text>
          <Image source={tokenadded} style={styles.bannerImage} />
          <Text style={styles.contentText}>
            Now you can send, receive, swap and store the new cryptocurrency you added.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TokenAdded;
