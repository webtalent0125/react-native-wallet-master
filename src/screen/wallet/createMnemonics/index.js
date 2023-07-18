import React, { useState, useEffect } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Clipboard from '@react-native-clipboard/clipboard';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import WalletModule from '../../../module/etherjs/WalletModule';
import { GradientButton } from '../../../components/Buttons';
import { blurback, background } from '../../../assets/images';
import { styles } from './styles';

const CreateMnemonicsScreen = ({ navigation, route }) => {
  const { password } = route.params;
  const [revealed, setRevealed] = useState(false);
  const [mnemonics, setMnemonics] = useState([]);

  const copyToClipboard = () => {
    Clipboard.setString(mnemonics.join(' '));
    Toast.show({
      type: 'info',
      text2: 'Your Seed Phrase is copied to clipboard',
    });
  };

  const renderMnemonic = (mnemonic, index) => (
    <View style={styles.mnemonic} key={index}>
      <Text style={{ textAlign: 'center', color: 'black' }}>
        {index + 1}. {mnemonic}
      </Text>
    </View>
  );

  useEffect(() => {
    setMnemonics(WalletModule.generateMnemonics());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} resizeMode='cover' style={{ flex: 1 }}>
        <View style={styles.statusBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name='chevron-left' fill='white' width={24} height={24} />
          </Pressable>

          <View style={styles.progress}>
            <View style={styles.fill}></View>
          </View>

          <Text style={styles.stepText}>2/3</Text>
        </View>

        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.mainContent}>
            <Text style={styles.title}>Write Down Your Seed Phrase</Text>
            <Text style={styles.content}>
              This is your seed phrase. Write it down on a piece paper or somewhere secure and keep
              it in a safe place. You'll be asked to re-enter this phrase (in order) in the next
              steps to ensure you did this.
            </Text>

            <View style={{ marginTop: 20 }}>
              <View style={[styles.mnemonics, revealed && { borderColor: 'white' }]}>
                {mnemonics && mnemonics.map(renderMnemonic)}
              </View>
              {!revealed ? (
                <View style={styles.overView}>
                  <Pressable onPress={() => setRevealed(true)}>
                    <ImageBackground
                      resizeMode='stretch'
                      source={blurback}
                      style={styles.blurImage}
                    >
                      <Icon name='eye-off-outline' fill='white' width={40} height={40} />
                      <Text style={{ color: 'white', fontSize: 18, lineHeight: 28, marginTop: 8 }}>
                        Tap to reveal your seed phrase
                      </Text>
                      <Text style={{ color: 'white', fontSize: 14, lineHeight: 24, marginTop: 5 }}>
                        Make sure no one is watching your screen.
                      </Text>
                    </ImageBackground>
                  </Pressable>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={copyToClipboard}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginTop: 10,
                  }}
                >
                  <Icon name='copy-outline' fill='white' width={20} height={20} />
                  <Text style={{ color: 'white', marginLeft: 10 }}>Copy to clipboard.</Text>
                </TouchableOpacity>
              )}
            </View>

            <GradientButton
              customStyle={{ marginBottom: 32, marginTop: 32 }}
              text='Continue'
              disabled={!revealed}
              onPress={() => navigation.navigate('ConfirmMnemonics', { password, mnemonics })}
            ></GradientButton>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreateMnemonicsScreen;
