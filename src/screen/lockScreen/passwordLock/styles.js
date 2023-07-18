import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imagebackground: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  mainContent: {
    paddingTop: Platform.OS === 'ios' ? 10 : 0,
    paddingBottom: Platform.OS === 'ios' ? 40 : 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 33.6,
    color: 'white',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 14,
    lineHeight: 19.6,
    color: '#5F6474',
    width: 260,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 14,
    lineHeight: 19.6,
    color: '#5F6474',
    marginTop: 20,
    marginBottom: 10,
  },
  passwordInput: {
    color: 'white',
    paddingVertical: 15,
    fontSize: 16,
    borderRadius: 8,
    paddingHorizontal: 15,
    flex: 1,
  },
  iconWrapper: {
    backgroundColor: '#181823',
    padding: 10,
    borderRadius: 8,
  },
  forgotPassword: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: 24,
  },
  button: {
    borderRadius: 100,
    paddingVertical: 15,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
});
