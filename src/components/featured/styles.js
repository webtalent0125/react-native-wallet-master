import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  trendingItem: {
    width: 120,
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    borderRadius: 8,
    padding: 15,
    marginRight: 15,
    shadowColor: 'rgba(63, 119, 172, 1)',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 10,
    elevation: 7,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    color: '#011B21',
  },
  assetLogo: {
    marginBottom: 10,
  },
  symbolName: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '500',
    color: '#0D1F3C',
  },
  price: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: '#8FA2B7',
  },
  percent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },
  percentChange: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    marginLeft: 2,
  },
  percentUp: {
    color: '#3DEC8D',
  },
  percentDown: {
    color: '#FC5D68',
  },
});
