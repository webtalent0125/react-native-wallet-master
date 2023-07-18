import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import NavigationHeader from '../navigation';
import { styles } from './styles';

const LearnMore = (props) => {
  return (
    <View style={styles.container}>
      <NavigationHeader {...props} />
      <ScrollView style={styles.mainContent}>
        <Text style={styles.title}>Learn More</Text>
      </ScrollView>
    </View>
  );
};

export default LearnMore;
