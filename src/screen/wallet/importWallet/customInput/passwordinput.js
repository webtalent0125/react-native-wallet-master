import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-eva-icons';
import Lock from '../../../../assets/images/svg/lock.svg';

const PasswordInput = (props) => {
  const [showText, setShowText] = useState(false);

  return (
    <View style={[styles.wrapper, props.grey ? styles.wrapperGrey : '']}>
      {props.grey && (
        <Lock color='#8FA2B7' style={styles.leftIcon} width={24} height={24} />
      )}
      <TextInput
        {...props}
        style={[
          styles.input,
          styles.passwordBox,
          {
            fontSize: props.grey ? 12 : 14,
            fontWeight: props.grey ? '400' : '700',
          },
        ]}
        secureTextEntry={!showText}
        maxLength={50}
      />
      {props.grey ? (
        <Icon
          style={styles.icon}
          name={
            props.passwordCorrect
              ? 'checkmark-circle-2'
              : showText
              ? 'eye-off'
              : 'eye'
          }
          fill={props.passwordCorrect ? '#3DEC8D' : '#8FA2B7'}
          width={24}
          height={24}
          onPress={() => setShowText(!showText)}
        />
      ) : (
        <Icon
          style={styles.icon}
          name={showText ? 'eye-off-outline' : 'eye-outline'}
          fill='black'
          width={24}
          height={24}
          onPress={() => setShowText(!showText)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  wrapperGrey: {
    backgroundColor: '#F0F3FF',
    borderRadius: 6,
  },
  input: {
    width: '100%',
    padding: 15,
    zIndex: 0,
    fontSize: 14,
    fontWeight: '700',
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

export default PasswordInput;
