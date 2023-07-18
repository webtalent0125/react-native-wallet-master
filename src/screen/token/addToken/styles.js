import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  mainContent: {
    paddingHorizontal: 20,
    marginTop: 30,
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
});
