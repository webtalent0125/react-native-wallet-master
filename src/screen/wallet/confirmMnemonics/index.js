import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-eva-icons';
import _ from 'lodash';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { WalletActions } from '../../../module/persistent/wallet/WalletActions';
import { UserAction } from '../../../module/persistent/user/UserAction';
import { GradientButton } from '../../../components/Buttons';
import LMLoading from '../../../components/common/LMLoading';
import { background } from '../../../assets/images';
import { styles } from './styles';

const ConfirmMnemonics = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const { password, mnemonics } = route.params;
  const [selectable, setSelectable] = useState(_.shuffle([...mnemonics]));
  const [selectedNumbers, setselectedNumbers] = useState([]);
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const renderMnemonic = (mnemonic, index) => {
    if (selected.includes(mnemonic) || selected.length === 3) {
      return (
        <View style={styles.mnemonic} key={index}>
          <Text
            style={[{ textAlign: 'center', color: 'black' }, styles.disabled]}
          >
            {mnemonic}
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.mnemonic}
          key={index}
          onPress={() => {
            onPressMnemonic(mnemonic, index);
          }}
        >
          <Text style={[{ textAlign: 'center', color: 'black' }]}>
            {mnemonic}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  const onPressMnemonic = (mnemonic, index) => {
    setSelected((prevstate) => [...prevstate, mnemonic]);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const connectWallet = async () => {
    LMLoading.show();
    await sleep(1000);
    dispatch(WalletActions.addFromMnemonic({ mnemonics })).then((response) => {
      const { success, data } = response;
      if (success) {
        LMLoading.hide();
        dispatch(
          UserAction.signUp({
            password: password,
            walletAddress: data.address,
            secretRecoveryPhrase: mnemonics.join(' '),
          })
        );
        navigation.reset({
          index: 0,
          routes: [{ name: 'Conguratulations' }],
        });
      } else {
        LMLoading.hide();
        Toast.show({
          type: 'error',
          text2: 'Something went wrong. Please try again later',
        });
      }
    });
  };

  useEffect(() => {
    const array = [];
    let random;
    while (array.length < 3) {
      random = Math.floor(Math.random() * 12) + 1;
      if (!array.includes(random)) array.push(random);
    }
    setselectedNumbers(_.shuffle([...array]));
  }, []);

  useEffect(() => {
    let temp = 0;
    if (selected.length === 3) {
      for (let i = 0; i < 3; i++) {
        if (mnemonics[selectedNumbers[i] - 1] !== selected[i]) {
          Toast.show({
            type: 'error',
            text2: 'Invalid words. Please try again',
          });
          setSelected([]);
        } else {
          temp++;
        }
      }
      if (temp === 3) setConfirmed(true);
    }
  }, [selected]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={styles.statusBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" fill="white" width={24} height={24} />
          </Pressable>

          <View style={styles.progress}>
            <View style={styles.fill}></View>
          </View>

          <Text style={styles.stepText}>3/3</Text>
        </View>

        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.mainContent}>
            <Text style={styles.title}>Confirm Seed Phrase</Text>

            <View style={styles.confirmForm}>
              <Text style={styles.content}>
                Select each word in the order it was presented to you.
              </Text>

              <View style={styles.wordsSelected}>
                {selectedNumbers.map((item, index) => {
                  return (
                    <Pressable
                      style={[
                        styles.wordSelected,
                        selected[index] && styles.active,
                      ]}
                      key={index}
                    >
                      {selected[index] ? (
                        <Text style={[styles.text, styles.selected]}>
                          {selected[index]}
                        </Text>
                      ) : (
                        <Text style={[styles.text]}>{item}</Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.mnemonics}>
              {selectable && selectable.map(renderMnemonic)}
            </View>

            <GradientButton
              customStyle={{ marginBottom: 32, marginTop: 32 }}
              text="Continue"
              disabled={!confirmed}
              onPress={connectWallet}
            ></GradientButton>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default ConfirmMnemonics;
