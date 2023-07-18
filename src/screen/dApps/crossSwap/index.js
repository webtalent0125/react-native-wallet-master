import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationHeader from '../../../components/navigation';
import { styles } from './styles';

const CrossSwap = (props) => {
  const { navigation } = props;

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Cross Chain Swap',
    });
  }, []);

  return (
    <View style={styles.container}>
      <NavigationHeader
        title="Market"
        navigation={navigation}
        drawer
        search
        bell
      />
      <View style={styles.mainContent}>
        <Text>Being integrated Cross Chain Swapping</Text>
        <WebView
          source={{
            html: '<iframe width="100%" height="50%" frameborder="none" src="https://widget.changelly.com?from=*&to=*&amount=1&address=&fromDefault=btc&toDefault=eth&theme=default&merchant_id=edw3fi0adm7bafwg&payment_id=&v=3">Can\'t load widget</iframe>',
          }}
          style={styles.webviewContent}
        />
      </View>
    </View>
  );
};

export default CrossSwap;
