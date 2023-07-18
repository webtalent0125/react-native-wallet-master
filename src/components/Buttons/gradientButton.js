import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const GradientButton = (props) => {
  const { text, onPress, customStyle, loading, disabled } = props;
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} activeOpacity={0.7} style={customStyle}>
      <LinearGradient
        colors={disabled ? ['#F4F4F6', '#F4F4F6'] : ['#6D0BBD', '#445FF5']}
        style={styles.button}
        start={{ x: 1, y: 0.5 }}
        end={{ x: 0, y: 0.5 }}
        locations={[0, 1]}
      >
        <Text style={[styles.buttonText, disabled && styles.disabled]}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 22,
    fontSize: 15,
    lineHeight: 18,
    padding: 14,
    textAlign: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontFamily: 'RNSSanz-Bold',
  },
  disabled: {
    color: '#DDDFE4',
  },
});
