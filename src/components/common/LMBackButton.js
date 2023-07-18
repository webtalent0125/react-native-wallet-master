import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-eva-icons';

export default function LMBackButton({ ...rest }) {
  const { label, labelStyle, style, color } = { ...rest };
  return (
    <TouchableOpacity style={[styles.container, style]} {...rest}>
      <Icon name='chevron-left' fill={color ? color : 'black'} width={34} height={34} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 50,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontSize: 16,
    lineHeight: 22,
  },
});
