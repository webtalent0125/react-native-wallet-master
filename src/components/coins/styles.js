import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    color: '#011B21',
  },
  tabItem: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    backgroundColor: '#F0F3FF',
    borderRadius: 100,
    marginRight: 10,
  },
  tabItemActive: {
    backgroundColor: '#3755F0',
  },
  tabItemText: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#8FA2B7',
  },
  tabItemTextActive: {
    color: '#FFFFFF',
  },

  watchListWrapper: {
    marginTop: 20,
    paddingVertical: 7,
    paddingHorizontal: 7,
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
  addTokenButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(1, 59, 255, 1)',
    borderRadius: 100,
    padding: 10,
    marginTop: 15,
  },
  addTokenButtonText: {
    marginLeft: 5,
    color: 'white',
    fontSize: 14,
  },
});
