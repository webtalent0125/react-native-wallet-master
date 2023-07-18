import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, Text, Switch, View, ImageBackground } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { Icon } from 'react-native-eva-icons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import PasswordInput from './passwordInput';
import { GradientButton } from '../../../components/Buttons';
import { background } from '../../../assets/images';
import { styles } from './styles';

const CreatePassword = ({ navigation }) => {
  const { t, i18n } = useTranslation();

  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [strength, setStrength] = useState(0);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} resizeMode='cover' style={{ flex: 1 }}>
        <View style={styles.statusBar}>
          <Pressable onPress={() => navigation.goBack()}>
            <Icon name='close-outline' fill={'white'} width={20} height={20} />
          </Pressable>

          <View style={styles.progress}>
            <View style={styles.fill}></View>
          </View>

          <Text style={styles.stepText}>1/3</Text>
        </View>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
          <View style={styles.mainContent}>
            <View>
              <Text style={styles.title}>{t('common:createpassword')}</Text>
              <Text style={styles.content}>{t('common:passwordinfotext')}</Text>

              <PasswordInput
                password={password}
                confirmPassword={confirmPassword}
                setPassword={setPassword}
                setconfirmPassword={setconfirmPassword}
                strength={strength}
              ></PasswordInput>

              <View style={styles.faceId}>
                <Text style={styles.faceIdText}>Sign in with Face ID?</Text>
                <Switch
                  trackColor={{ false: '#767577', true: '#81b0ff' }}
                  thumbColor={isEnabled ? '#013BFF' : '#f4f3f4'}
                  ios_backgroundColor='#3e3e3e'
                  onValueChange={toggleSwitch}
                  value={isEnabled}
                />
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <BouncyCheckbox
                  size={25}
                  fillColor='#013BFF'
                  iconStyle={{ borderRadius: 3, borderColor: '#013BFF', height: 20, width: 20 }}
                  onPress={(isChecked) => {
                    setAccepted(isChecked);
                  }}
                />

                <Text style={styles.confirmText}>
                  I understand that ExzoSwap cannot recover this password for me.{' '}
                  <Pressable onPress={() => navigation.navigate('LearnMore')}>
                    <Text
                      style={{
                        color: '#0066FF',
                        fontWeight: '700',
                        textDecorationLine: 'underline',
                        lineHeight: 24
                      }}
                    >
                      Learn more
                    </Text>
                  </Pressable>
                </Text>
              </View>
            </View>

            <GradientButton
              customStyle={{ marginBottom: 32, marginTop: 32 }}
              onPress={() => navigation.navigate('SecureWallet', { password })}
              disabled={!(accepted && password === confirmPassword && password.length > 7)}
              text={t('common:createpassword')}
            ></GradientButton>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default CreatePassword;
