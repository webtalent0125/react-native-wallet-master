import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import QRCode from 'react-native-qrcode-svg';
import { Icon } from 'react-native-eva-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import { BlurView } from '@react-native-community/blur';
import { useIsFocused } from '@react-navigation/native';
import NavigationHeader from '../../../components/navigation';
import { logo } from '../../../assets/images';
import { styles } from './styles';

const SeedPhrase = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.UserReducer);
  const [mnemonics, SetMnemonics] = useState([]);
  const [showSeed, setShowSeed] = useState(false);
  const isFocused = useIsFocused();

  const copyToClipboard = () => {
    Clipboard.setString(mnemonics.join(' '));
  };

  useEffect(() => {
    if (user) {
      SetMnemonics(user.secretRecoveryPhrase.split(' '));
    }
  }, [user]);

  useEffect(() => {
    setShowSeed(false);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <NavigationHeader {...props} title='Seed Phrase' />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.mainContent}>
          <View style={styles.QRcode}>
            <QRCode
              value={user.secretRecoveryPhrase}
              logo={logo}
              size={Dimensions.get('window').width - 200}
            />
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text style={styles.title}>Back up manually:</Text>
              <TouchableOpacity style={styles.copyIcon} onPress={copyToClipboard}>
                <Icon name='copy-outline' width={30} height={30} fill='black' />
              </TouchableOpacity>
            </View>

            <View style={styles.seedItems}>
              {mnemonics.map((item, index) => {
                return (
                  <View style={styles.seedItem} key={index}>
                    <View style={styles.itemNumber}>
                      <Text style={styles.textNumber}>{index + 1}</Text>
                    </View>
                    <Text style={styles.itemText}>{item}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {!showSeed && (
          <React.Fragment>
            <BlurView
              style={styles.absolute}
              blurType='light'
              blurAmount={20}
              reducedTransparencyFallbackColor='white'
            />
            <View style={styles.revealView}>
              <Text style={styles.revealText}>
                You must keep your seed phrase secret and safe. If someone gets your seed phrase,
                they'll gain control over your accounts.
              </Text>
              <TouchableOpacity style={styles.revealButton} onPress={() => setShowSeed(true)}>
                <Text style={{ fontWeight: '500' }}>Reveal</Text>
                <Icon name='eye' width={24} height={24} fill='black' />
              </TouchableOpacity>
            </View>
          </React.Fragment>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SeedPhrase;
