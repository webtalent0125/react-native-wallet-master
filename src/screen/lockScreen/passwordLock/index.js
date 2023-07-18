import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Icon } from 'react-native-eva-icons';
import Toast from 'react-native-toast-message';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { useIsFocused } from '@react-navigation/native';
import { UserAction } from '../../../module/persistent/user/UserAction';
import { planet, background } from '../../../assets/images';
import { styles } from './styles';

const PasswordLockScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [showPassword, setshowPassword] = useState(false);
  const [unlock, setUnlock] = useState(false);
  const isFocused = useIsFocused();

  const signIn = () => {
    dispatch(UserAction.unlockScreen(password)).then((res) => {
      if (res) {
        setUnlock(res);
      } else
        Toast.show({
          type: 'error',
          text2: 'Incorrect Password',
        });
    });
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      if (unlock) navigation.dispatch(e.data.action);
      else e.preventDefault();
    });
    navigation.goBack();
  }, [navigation, unlock]);

  useEffect(() => {
    setPassword('');
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <ImageBackground source={background} resizeMode='cover' style={styles.imagebackground}>
        <KeyboardAwareScrollView style={styles.scrollView}>
          <View style={styles.mainContent}>
            <View style={{ flex: 1, paddingBottom: 30 }}>
              <Image
                source={planet}
                style={{
                  alignSelf: 'center',
                  width: Dimensions.get('window').width - 30,
                  height: Dimensions.get('window').width - 30,
                }}
              />

              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subTitle}>
                Be in control of your own digital assets today all in one secure wallet.
              </Text>

              <Text style={styles.inputLabel}>Password</Text>
              <View
                style={{
                  flexDirection: 'row',
                  backgroundColor: '#212130',
                  alignItems: 'center',
                  paddingRight: 10,
                  borderRadius: 5,
                }}
              >
                <TextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  placeholder='Password'
                  maxLength={50}
                  placeholderTextColor='#5F6474'
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />

                <View style={styles.iconWrapper}>
                  {showPassword ? (
                    <Icon
                      name='eye-off-outline'
                      width={24}
                      height={24}
                      fill='#5F6474'
                      onPress={() => setshowPassword(false)}
                    />
                  ) : (
                    <Icon
                      name='eye-outline'
                      width={24}
                      height={24}
                      fill='#5F6474'
                      onPress={() => setshowPassword(true)}
                    />
                  )}
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={[
                  styles.button,
                  Boolean(password) ? { backgroundColor: '#013BFF' } : { backgroundColor: 'gray' },
                ]}
                onPress={signIn}
                disabled={!Boolean(password)}
              >
                <Text style={[styles.buttonText, { color: 'white' }]}>Unlock</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </View>
  );
};

export default PasswordLockScreen;
