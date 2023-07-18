import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    marginBottom: 25,
    color: '#011B21',
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 25,
  },
  newsImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 25,
  },
  newsTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    color: '#011B21',
  },
  topics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // marginTop: 5,
    marginBottom: 10,
  },
  topicItem: {
    // color: '#327FEB',
    // backgroundColor: 'rgba(50, 127, 235, 0.1);',
    // borderRadius: 4,
    // borderWidth: 1,
    // borderColor: '#327FEB',
    // marginRight: 5,
    // paddingVertical: 5,
    // paddingHorizontal: 12,
    // marginVertical: 3,
    marginRight: 10,
  },
  topicText: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: '#F7421A',
  },
});
