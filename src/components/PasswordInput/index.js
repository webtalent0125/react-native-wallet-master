import React, { useState } from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-eva-icons';

const PasswordInput = (props) => {
  const { label } = props;
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View style={styles.content}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.wrapper}>
        <TextInput
          {...props}
          style={styles.inputBox}
          secureTextEntry={!showPassword}
          onChangeText={(text) => props.changeText(text)}
          onBlur={props.checkPassword}
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
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 15,
  },
  inputLabel: {
    fontWeight: '500',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF1F9',
    borderRadius: 5,
  },
  inputBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontWeight: '500',
    flex: 1,
  },
  eyeIcon: {
    marginRight: 5,
  },
});

export default PasswordInput;
