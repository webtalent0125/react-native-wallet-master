import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  progress: {
    flex: 1,
    backgroundColor: 'white',
    height: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  fill: {
    width: '66%',
    height: '100%',
    backgroundColor: '#013BFF',
    borderRadius: 10,
  },
  stepText: {
    color: 'white',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    lineHeight: 28,
  },
  content: {
    marginTop: 10,
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  mnemonics: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  overView: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  blurImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mnemonic: {
    width: '28%',
    backgroundColor: 'white',
    marginVertical: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
