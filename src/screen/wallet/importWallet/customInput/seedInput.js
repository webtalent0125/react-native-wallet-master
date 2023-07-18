import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import QRCodeScan from '../../../../assets/images/svg/qrcodescan.svg';
import BlockQuote from '../../../../assets/images/svg/blockquote.svg';
import FlexibleInput from '../../../../components/flexibleInput';

const SeedInput = (props) => {
  const [showText, setShowText] = useState(false);

  return (
    <View style={styles.wrapper}>
      <BlockQuote
        color='#8FA2B7'
        style={styles.leftIcon}
        width={24}
        height={24}
      />
      <FlexibleInput {...props} showText={showText} />
      <Icon
        style={styles.icon}
        name={showText ? 'eye-off' : 'eye'}
        fill='#8FA2B7'
        width={24}
        height={24}
        onPress={() => setShowText(!showText)}
      />
      <QRCodeScan
        color='#8FA2B7'
        style={styles.icon}
        width={24}
        height={24}
        onPress={() => props.ScanQRcode()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#F0F3FF',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  passwordBox: {
    paddingRight: 5,
    flex: 1,
  },
  icon: {
    marginRight: 10,
  },
  leftIcon: {
    marginLeft: 15,
  },
});

export default SeedInput;
