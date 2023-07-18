import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 25,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDF1F9',
    alignSelf: 'flex-start',
    borderRadius: 100,
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    marginBottom: 10,
  },
  assetLogo: {
    marginRight: 5,
  },
  symbolName: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 17,
    marginRight: 5,
  },
  percent: {
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '500',
    marginLeft: 5,
  },
  up: {
    color: '#0DC471',
  },
  down: {
    color: '#FC3044',
  },
});
