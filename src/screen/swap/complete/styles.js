import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  tokenLogo: {
    position: 'absolute',
    top: 55,
    left: '50%',
    width: 30,
    height: 30,
    transform: [{ translateX: -12.5 }],
    zIndex: 10,
  },
  logoImage: {
    width: 243,
    height: 174,
    alignSelf: 'center',
    marginTop: 110,
    marginBottom: 40,
  },
  logoIcon: {
    position: 'absolute',
    top: 47,
    left: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    alignSelf: 'center',
    color: '#011B21',
  },
  content: {
    marginTop: 15,
    maxWidth: 310,
    color: '#8FA2B7',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
    textAlign: 'center',
    alignSelf: 'center',
  },
  completeButton: {
    backgroundColor: '#3755F0',
    paddingVertical: 12,
    borderRadius: 100,
    marginTop: 'auto',
    marginBottom: Platform.OS === 'ios' ? 5 : 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '700',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 10,
  },
});
