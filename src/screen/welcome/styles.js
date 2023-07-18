import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagebackground: {
    flex: 1,
    paddingLeft: 27,
    paddingRight: 27,
  },
  logoImage: {
    marginTop: '10%',
    width: '100%',
    height: undefined,
    aspectRatio: 358 / 352,
  },
  title: {
    fontSize: 28,
    lineHeight: 33.6,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
    maxWidth: 250,
    alignSelf: 'center',
  },
  subTitle: {
    color: '#5F6474',
    textAlign: 'center',
    maxWidth: 250,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  startButton: {
    marginBottom: Platform.OS === 'ios' ? 60 : 40,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 22,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
    fontWeight: '700',
  },
});
