import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 50 : 40,
    flex: 1,
  },
  title: {
    fontSize: 24,
    lineHeight: 33.6,
    fontWeight: '500',
    textAlign: 'center',
  },
  bannerImage: {
    marginVertical: 10,
    width: '100%',
    height: undefined,
    aspectRatio: 327 / 190,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: 'rgba(172, 172, 176, 0.8)',
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: 'rgba(1, 59, 255, 1)',
    padding: 10,
    borderRadius: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },
});
