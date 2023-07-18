import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    padding: 15,
  },
  valueTitle: {
    color: 'black',
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    marginBottom: 3,
  },
  tokenBalance: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  currencyPrice: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    marginBottom: 3,
  },
  marketPrice: {
    fontSize: 12,
    lineHeight: 18,
    color: '#4DC552',
    fontWeight: '500',
  },
  actionGroup: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#013BFF',
    paddingVertical: 10,
    width: 100,
    borderRadius: 100,
  },
  actionButtonText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  watchListTitle: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  watchListWrapper: {
    backgroundColor: '#F9FBFE',
    marginTop: 25,
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: 'rgba(72, 80, 104, 0.13)',
    borderRadius: 10,
  },
  watchListItem: {
    backgroundColor: '#EDF1F9',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 5,
  },
  assetLogo: {
    marginRight: 10,
  },
  TokenSymbol: {
    fontWeight: '700',
    fontSize: 15,
    lineHeight: 18,
    color: '#34384C',
    marginBottom: 5,
  },
  changes: {
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'right',
  },
  priceup: {
    color: 'rgba(50, 204, 134, 1)',
  },
  pricedown: {
    color: 'rgba(252, 48, 68, 1)',
  },
  deleteButtonWrapper: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  TokenName: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 14,
    color: '#34384C',
    opacity: 0.5,
  },
  priceGraph: {
    marginRight: 5,
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
  rowBack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
