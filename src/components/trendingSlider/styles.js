import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#011B21',
  },
  assetLogo: {
    marginRight: 9,
  },
  GLSlider: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginVertical: 20,
    marginRight: 15,
    width: 300,
    padding: 15,
    shadowColor: 'rgba(63, 119, 172, 1)',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 7,
  },
  GLTop: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: '#8FA2B7',
  },
  GLDetails: {
    marginLeft: 6,
  },
  GLDetailsText: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: '400',
    color: '#3755F0',
  },
  GLName: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: '#8FA2B7',
    maxWidth: 100,
  },
  GLSymbol: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: '#0D1F3C',
    marginLeft: 9,
  },
  GLPrice: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '500',
    color: '#0D1F3C',
  },
  percentChange: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
    marginLeft: 5,
  },
  percentUp: {
    color: '#00CC96',
  },
  percentDown: {
    color: '#FC5D68',
  },
  GLGraph: {
    marginLeft: 5,
  },
});
