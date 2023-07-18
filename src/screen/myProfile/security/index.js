import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-toast-message';
import { security } from '../../../assets/images';
import NavigationHeader from '../../../components/navigation';
import PasswordInput from '../../../components/PasswordInput';
import { UserAction } from '../../../module/persistent/user/UserAction';
import { styles } from './styles';

const Security = (props) => {
  const dispatch = useDispatch();
  const [oldPassword, setoldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState(true);
  const [lengthError, setlengthError] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [strength, setStrength] = useState(0);

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
      color: '#108C4A',
    },
  ];

  const checkPassword = () => {
    setDisabled(false);
    setlengthError(false);
    setPasswordConfirmed(true);
    if (newPassword.length > 0 && newPassword.length < 8) {
      setlengthError(true);
      setPasswordConfirmed(true);
      setDisabled(true);
    } else if (confirmPassword === '') {
      setPasswordConfirmed(true);
      setDisabled(true);
    } else if (newPassword !== confirmPassword) {
      setPasswordConfirmed(false);
      setDisabled(true);
    }
  };

  const savePasswrod = () => {
    dispatch(UserAction.changePassword(oldPassword, newPassword)).then((response) => {
      const { success, message } = response;
      Toast.show({
        type: success ? 'success' : 'error',
        text2: message,
      });
    });
  };

  useEffect(() => {
    if (newPassword.length >= 8) setlengthError(false);
    if (newPassword === confirmPassword) setPasswordConfirmed(true);
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    var strength = 0;
    if (newPassword.match(/[a-z]+/)) {
      strength += 1;
    }
    if (newPassword.match(/[A-Z]+/)) {
      strength += 1;
    }
    if (newPassword.match(/[0-9]+/)) {
      strength += 1;
    }
    if (newPassword.match(/[$@#&!]+/)) {
      strength += 1;
    }
    setStrength(strength);
  }, [newPassword]);

  return (
    <View style={styles.container}>
      <NavigationHeader {...props} title='Security' />
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.mainContent}>
          <Image source={security} style={styles.pageLogo} />
          <View style={styles.passwordForm}>
            <Text style={styles.title}>Change password</Text>

            <PasswordInput
              label='Old password'
              value={oldPassword}
              changeText={(text) => setoldPassword(text)}
            />
            <PasswordInput
              label='New password'
              value={newPassword}
              changeText={(text) => setNewPassword(text)}
              checkPassword={checkPassword}
            />
            {lengthError && (
              <Text style={styles.errorMessage}>Password must be at least 8 characters!</Text>
            )}

            {strength > 0 && newPassword.length >= 8 && (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.strength}>Password strength:</Text>
                <Text style={[styles.strength, { color: passwordType[strength - 1].color }]}>
                  {' '}
                  {passwordType[strength - 1].text}
                </Text>
              </View>
            )}

            <PasswordInput
              label='Confirm password'
              value={confirmPassword}
              changeText={(text) => setConfirmPassword(text)}
              checkPassword={checkPassword}
            />
            {!passwordConfirmed && <Text style={styles.errorMessage}>Password doesn't match!</Text>}

            <TouchableOpacity
              style={[styles.passwordSaveButton, disabled ? styles.disabled : '']}
              onPress={savePasswrod}
              disabled={disabled}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Security;
