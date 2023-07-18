import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDF1F9',
    borderRadius: 8,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 23,
    color: '#5A6E7A',
    marginBottom: 10,
  },
  text: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#5A6E7A',
  },
  learn: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#3755F0',
  },
  money: {
    width: 60,
    height: 70,
    marginRight: 5,
  },
  close: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
});
