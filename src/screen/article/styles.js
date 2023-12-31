import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -35,
    zIndex: 11,
  },
  topBar: {
    alignSelf: 'center',
    width: 70,
    height: 5,
    borderRadius: 100,
    backgroundColor: '#DCE1F4',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '500',
    color: '#011B21',
  },
  publishDate: {
    marginTop: 25,
    textAlign: 'right',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  publishDateText: {
    color: '#8FA2B7',
    marginLeft: 8,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  topicWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  topicItem: {
    // backgroundColor: 'rgba(50, 127, 235, 0.1)',
    // borderWidth: 1,
    // borderColor: '#327FEB',
    // borderRadius: 4,
    // paddingHorizontal: 13,
    // paddingVertical: 5,
    marginRight: 10,
    // marginTop: 5,
  },
  topicText: {
    fontSize: 14,
    lineHeight: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
    color: '#F7421A',
  },
  newsImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 325 / 180,
    borderRadius: 8,
  },
  contentText: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    color: '#011B21',
  },
});
