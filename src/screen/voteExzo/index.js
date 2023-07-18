import React from 'react';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import NavigationHeader from '../../components/navigation';
import Project from '../../components/project';
import { styles } from './styles';

const VoteExzo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavigationHeader
        title="New Projects"
        navigation={navigation}
        drawer
        search
      />
      <View style={styles.background}>
        <KeyboardAwareScrollView
          style={{ flex: 1, borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        >
          <View style={styles.mainContent}>
            <Project navigation={navigation} />
            <Project navigation={navigation} />
            <Project navigation={navigation} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default VoteExzo;
