import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputWrapper: {
    paddingVertical: 14,
    marginTop: 10,
  },
  labelTextWrapper: {
    backgroundColor: '#013BFF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 100,
    position: 'absolute',
    zIndex: 1,
    alignSelf: 'center',
  },
  labelText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#EDF1F9',
    borderRadius: 100,
    paddingVertical: 20,
    paddingHorizontal: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  errorMessage: {
    fontSize: 12,
    marginLeft: 15,
    color: '#FC3044',
    fontWeight: '500',
  },
  tokenDetails: {
    flexDirection: 'row',
    marginTop: 10,
  },
  logoImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  customToken: {},
  selectToken: {},
  tabHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tabButton: {
    borderWidth: 1,
    borderColor: '#013BFF',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  tabFill: {
    backgroundColor: '#013BFF',
  },
  tabIndicator: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 3,
    textAlign: 'center',
  },
  tabSelected: {
    height: 3,
    width: 50,
    backgroundColor: '#013BFF',
  },
  tokenItem: {
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenLogo: {
    width: 48,
    height: 48,
    marginRight: 15,
  },
  tokenSymbol: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.41,
    color: '#8E8E93',
    marginBottom: 5,
  },
  tokenName: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.41,
  },
});
