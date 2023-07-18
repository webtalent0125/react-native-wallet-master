import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  logoIcon: {
    alignSelf: 'center',
    marginVertical: 20,
    width: '40%',
    height: undefined,
    aspectRatio: 1 / 1,
  },
  title: {
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 10,
  },
  content: {
    color: 'white',
    fontSize: 14,
    lineHeight: 24,
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    color: '#013BFF',
    marginTop: 25,
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
  },
});
