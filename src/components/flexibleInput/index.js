import React, { useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const FlexibleInput = (props) => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        {...props}
        style={[
          styles.input,
          styles.passwordBox,
          styles.inputShow,
          { display: props.showText ? 'flex' : 'none' },
        ]}
        placeholder='Seed Phrase'
        placeholderTextColor='#AFB4C0'
        secureTextEntry={false}
        maxLength={300}
        multiline={true}
        textAlignVertical='center'
      />
      <TextInput
        {...props}
        style={[
          styles.input,
          styles.passwordBox,
          { display: props.showText ? 'none' : 'flex' },
        ]}
        placeholder='Seed Phrase'
        placeholderTextColor='#AFB4C0'
        secureTextEntry={true}
        maxLength={300}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  input: {
    width: '100%',
    padding: 15,
    zIndex: 0,
    fontSize: 12,
    fontWeight: '400',
    minHeight: 47,
    justifyContent: 'center',
    color: '#090A0B',
  },
  inputShow: {
    display: 'flex',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    paddingTop: 13,
  },
  passwordBox: {
    paddingRight: 5,
    flex: 1,
  },
});

export default FlexibleInput;
