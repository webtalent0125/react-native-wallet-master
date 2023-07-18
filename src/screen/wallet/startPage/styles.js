import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D2F',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
  },
  image: {
    alignSelf: 'center',
    marginTop: '30%',
  },
  title: {
    fontSize: 48,
    color: 'white',
    marginTop: '15%',
    marginBottom: 16,
  },
  contentText: {
    fontSize: 18,
    color: 'white',
    width: 220,
    lineHeight: 28,
  },
  startButton: {
    marginBottom: 30,
    alignSelf: 'flex-start',
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
