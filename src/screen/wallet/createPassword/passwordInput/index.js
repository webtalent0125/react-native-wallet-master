import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import { styles } from './styles';

const PasswordInput = (props) => {
  const [showPassword, setshowPassword] = useState(false);
  const { password, confirmPassword, strength } = props;

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

  return (
    <View>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder='New Password'
          maxLength={50}
          secureTextEntry={!showPassword}
          onChangeText={(text) => props.setPassword(text)}
        />
        <Icon
          style={styles.eyeIcon}
          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
          fill='black'
          width={24}
          height={24}
          onPress={() => setshowPassword(!showPassword)}
        />
      </View>

      {strength > 0 && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.strength}>Password strength:</Text>
          <Text style={[styles.strength, { color: passwordType[strength - 1].color }]}>
            {' '}
            {passwordType[strength - 1].text}
          </Text>
        </View>
      )}
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder='Confirm Password'
          maxLength={50}
          secureTextEntry={!showPassword}
          onChangeText={(text) => props.setconfirmPassword(text)}
        />
        {password === confirmPassword && password !== '' && (
          <Icon
            style={styles.eyeIcon}
            name='checkmark-outline'
            fill='#108C4A'
            width={24}
            height={24}
          />
        )}
      </View>
      {password !== '' && password.length < 8 && (
        <Text style={styles.strength}>Must be at least 8 characters:</Text>
      )}
    </View>
  );
};

export default PasswordInput;
