import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#1E2541',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -35,
    zIndex: 11,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  tokenBalance: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  currencyPrice: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '500',
    marginBottom: 5,
    color: 'white',
  },
  actionGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#323958',
    paddingVertical: 10,
    width: 105,
    borderRadius: 100,
  },
  actionButtonText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
    marginLeft: 13,
  },
  priceup: {
    color: 'rgba(50, 204, 134, 1)',
  },
  pricedown: {
    color: 'rgba(252, 48, 68, 1)',
  },
  priceGraph: {
    marginRight: 5,
  },
  balanceGraph: {
    width: '100%',
    height: undefined,
    aspectRatio: 164 / 48,
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
  handleIndicatorStyle: {
    width: 75,
    height: 5,
    backgroundColor: '#DCE1F4',
    borderRadius: 100,
  },
});
