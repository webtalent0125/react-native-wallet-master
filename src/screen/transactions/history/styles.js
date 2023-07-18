import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
    marginTop: -35,
    zIndex: 11,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'white',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  statusIcon: {
    padding: 10,
    backgroundColor: '#013BFF',
    alignSelf: 'flex-start',
    borderRadius: 100,
    marginRight: 10,
  },
  transactionDetails: {
    flexDirection: 'row',
    flex: 1,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#121212',
    lineHeight: 21,
  },
  address: {
    color: '#A2A2AA',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  right: {
    alignItems: 'flex-end',
  },
  tokenAmount: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 21,
  },
  currencyValue: {
    color: '#A2A2AA',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
});
