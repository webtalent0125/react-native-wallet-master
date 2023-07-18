import React, {
  useCallback,
  useState,
  useRef,
  useMemo,
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { RNCamera } from 'react-native-camera';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
import NavigationHeader from '../../../components/navigation';
import SeedInput from './customInput/seedInput';
import PasswordInput from './customInput/passwordinput';
import LMLoading from '../../../components/common/LMLoading';
import { GradientButton } from '../../../components/Buttons';
import { WalletActions } from '../../../module/persistent/wallet/WalletActions';
import { UserAction } from '../../../module/persistent/user/UserAction';
import { styles } from './styles';

const ImportWallet = (props) => {
  const dispatch = useDispatch();
  const { navigation } = props;
  const { activeWallet, wallets } = useSelector((state) => state.WalletReducer);
  const QRcodemodal = useRef();
  const snapPoints = useMemo(() => ['100%'], []);
  const [mnemonics, setmnemonics] = useState('');
  const [password, setPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [available, setAvailable] = useState(false);
  const [passwordLenghtError, setPasswordLenghtError] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [strength, setStrength] = useState(0);
  const isFocused = useIsFocused();

  const passwordType = [
    {
      text: 'Bad',
      color: 'red',
    },
    {
      text: 'Normal',
      color: 'gold',
    },
    {
      text: 'Medium',
      color: 'green',
    },
    {
      text: 'Good',
      color: '#3DEC8D',
    },
  ];

  useEffect(() => {
    setmnemonics('');
    setPassword('');
    setConfirmPassword('');
  }, [isFocused]);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const ScanQRcode = useCallback(() => {
    setmnemonics('');
    QRcodemodal.current?.present();
  }, []);

  const onSuccess = (e) => {
    setmnemonics(e.data);
    QRcodemodal.current?.close();
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const importWallet = async () => {
    LMLoading.show();
    await sleep(1000);

    dispatch(
      WalletActions.addFromMnemonic({ mnemonics: mnemonics.split(' ') })
    ).then((response) => {
      const { success, data } = response;
      if (success) {
        LMLoading.hide();
        dispatch(
          UserAction.signUp({
            password: password,
            walletAddress: data.address,
            secretRecoveryPhrase: mnemonics,
          })
        );
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainStackNavigator' }],
        });
      } else {
        LMLoading.hide();
        Toast.show({
          type: 'error',
          text2: data,
        });
      }
    });
  };

  useEffect(() => {
    const mnemonicLength = mnemonics.split(' ').length;
    if (
      (mnemonicLength === 12 ||
        mnemonicLength === 18 ||
        mnemonicLength === 24) &&
      password !== '' &&
      password.length >= 8 &&
      password === confirmPassword
    )
      setAvailable(true);
    else setAvailable(false);
    if (password !== '' && password.length >= 8 && password === confirmPassword)
      setPasswordCorrect(true);
    else setPasswordCorrect(false);
    if (password.length > 0 && password.length < 8)
      setPasswordLenghtError(true);
    else setPasswordLenghtError(false);
  }, [mnemonics, password, confirmPassword]);

  useEffect(() => {
    var strength = 0;
    if (password.match(/[a-z]+/)) {
      strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (password.match(/[0-9]+/)) {
      strength += 1;
    }
    if (password.match(/[$@#&!]+/)) {
      strength += 1;
    }
    setStrength(strength);
  }, [password]);

  return (
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.container}>
        <NavigationHeader color={'white'} title='Import Form Seed' {...props} />
        <View style={styles.background}>
          <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
            <View style={styles.mainContent}>
              {/* <Text style={styles.title}>Import From Seed</Text> */}
              <SeedInput
                ScanQRcode={ScanQRcode}
                value={mnemonics}
                onChangeText={(text) => setmnemonics(text)}
              />
              <PasswordInput
                grey
                value={password}
                placeholder={'New Password'}
                onChangeText={(text) => setPassword(text)}
              />
              {strength > 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.strength}>Password strength:</Text>
                  <Text
                    style={[
                      styles.strength,
                      { color: passwordType[strength - 1].color },
                    ]}
                  >
                    {' '}
                    {passwordType[strength - 1].text}
                  </Text>
                </View>
              )}
              <PasswordInput
                grey
                value={confirmPassword}
                placeholder={'Confirm Password'}
                onChangeText={(text) => setConfirmPassword(text)}
                passwordCorrect={passwordCorrect}
              />
              {passwordLenghtError && (
                <Text style={styles.strength}>
                  Password must be at least 8 characters.
                </Text>
              )}

              <View style={styles.faceId}>
                <Text style={styles.faceIdText}>Sign in with Face ID?</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#3755F0' }}
                  thumbColor={isEnabled ? '#FAFAFA' : '#f4f3f4'}
                  ios_backgroundColor='#3e3e3e'
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>
              <Text
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.info}>
                  By proceeding, you agree to these{' '}
                </Text>
                <Text
                  onPress={() => navigation.navigate('TermsAndCondition')}
                  style={{
                    // textDecorationLine: 'underline',
                    color: '#3755F0',
                    fontSize: 14,
                    fontWeight: '500',
                  }}
                >
                  Terms and Conditions.
                </Text>
              </Text>
              <GradientButton
                customStyle={{ marginBottom: 32, marginTop: 32 }}
                text='Import'
                disabled={!available}
                onPress={importWallet}
              ></GradientButton>

              <GradientButton
                customStyle={{ marginBottom: 32 }}
                text='Create new wallet'
                onPress={() => navigation.navigate('AuthStactNavigator')}
              ></GradientButton>
            </View>
          </KeyboardAwareScrollView>
        </View>

        <BottomSheetModal
          ref={QRcodemodal}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: 'black',
          }}
          handleIndicatorStyle={{ backgroundColor: 'white' }}
        >
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.auto}
            fadeIn={false}
            reactivate={false}
            showMarker={true}
          />
        </BottomSheetModal>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};

export default ImportWallet;
