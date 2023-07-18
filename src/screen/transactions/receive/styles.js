import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginTop: -35,
    zIndex: 11,
    backgroundColor: 'white',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  wrapper: {
    // backgroundColor: '#EDF1F9',
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  logoImage: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  title: {
    // marginTop: 20,
    fontSize: 16,
    fontWeight: '400',
    textAlign: 'center',
    color: '#011B21',
  },
  QRcode: {
    marginVertical: 35,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  QRcodeContainer: {
    borderWidth: 2,
    position: 'absolute',
  },
  divider: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#819EB0',
    opacity: 0.2,
  },
  orView: {
    paddingHorizontal: 14,
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 2,
    position: 'absolute',
    top: -14,
  },
  orText: {
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
    color: '#6C757D',
  },
  addressTitle: {
    marginTop: 28,
    marginBottom: 17,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 18,
    textAlign: 'center',
    color: '#343A40',
  },
  addressWrapper: {
    flex: 1,
    padding: 7,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D8DFEE',
    flexDirection: 'row',
    alignItems: 'center',
    // paddingRight: 135,
  },
  walletAddress: {
    flex: 1,
    color: '#212529',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
  },
  copyButton: {
    // marginTop: 18,
    marginLeft: 18,
    borderRadius: 4,
    borderColor: '#0063F5',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F3F6FE',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 14,
    color: '#3755F0',
  },
  bottomText: {
    marginTop: 20,
    color: '#8FA2B7',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    textAlign: 'left',
    width: '100%',
    alignSelf: 'center',
  },
  shareButton: {
    marginTop: 35,
    backgroundColor: '#013BFF',
    borderRadius: 100,
    paddingVertical: 12,
  },
  shareButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
  },
  shareForm: {
    alignItems: 'center',
    marginTop: 20,
  },
  shareTitle: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 10,
  },
  shareIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
});
