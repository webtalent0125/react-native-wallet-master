import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const SimpleButton = (props) => {
  const { text, onPress, customStyle } = props;
  return (
    <TouchableOpacity style={[styles.button, customStyle]} onPress={onPress}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 22,
    padding: 14,
    width: '100%',
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 18,
    textAlign: 'center',
    color: 'black',
    fontFamily: 'RNSSanz-Bold',
  },
});
