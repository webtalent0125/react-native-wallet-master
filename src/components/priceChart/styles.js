import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  marketPrice: {
    fontSize: 12,
    lineHeight: 18,
    color: '#4DC552',
    fontWeight: '500',
  },
  priceup: {
    color: 'rgba(50, 204, 134, 1)',
  },
  pricedown: {
    color: 'rgba(252, 48, 68, 1)',
  },
  periodButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  periodButton: {
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderRadius: 8,
  },
  periodText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: '#8E8E8E',
  },
});
