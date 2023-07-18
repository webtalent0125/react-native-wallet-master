import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cointainer: {
    flex: 1,
  },
  mainContent: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  coinList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinLogo: {
    marginRight: 15,
    marginVertical: 7,
  },
  coinName: {
    fontWeight: '500',
    fontSize: 16,
  },
  coinSymbol: {
    color: '#4a545e',
  },
});
