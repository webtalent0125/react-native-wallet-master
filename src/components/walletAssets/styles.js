import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  networkTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  watchListTitle: {
    // marginTop: 30,
    fontSize: 18,
    fontWeight: '400',
    color: '#011B21',
  },
  watchListWrapper: {
    // backgroundColor: '#F9FBFE',
    marginTop: 20,
    paddingVertical: 7,
    paddingHorizontal: 7,
    // borderWidth: 1,
    // borderColor: 'rgba(72, 80, 104, 0.13)',
    // borderRadius: 10,
  },
  watchListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  assetLogo: {
    marginRight: 10,
  },
  aseetName: {
    fontSize: 16,
    lineHeight: 23,
    fontWeight: '500',
    color: '#011B21',
  },
  assetbalance: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8FA2B7',
  },
  changes: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    textAlign: 'right',
  },
  priceup: {
    color: 'rgba(50, 204, 134, 1)',
  },
  pricedown: {
    color: 'rgba(252, 48, 68, 1)',
  },
});
