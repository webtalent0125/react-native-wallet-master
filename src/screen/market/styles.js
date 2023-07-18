import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -35,
    zIndex: 11,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
  },
  titleText: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 24,
    color: '#011B21',
  },
  titlePercentage: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#FC3044',
    marginLeft: 12,
  },
  time: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#8FA2B7',
    marginTop: 5,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: '#EDF1F9',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 12,
    padding: 10,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 12,
    fontWeight: '400',
    color: '#5A6E7A',
  },
  inputIcon: {
    marginRight: 10,
  },
});
