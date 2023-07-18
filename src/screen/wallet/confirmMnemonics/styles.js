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
    width: '100%',
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
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
  },
  confirmForm: {
    marginTop: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  wordsSelected: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wordSelected: {
    width: '30%',
    marginTop: 24,
    paddingVertical: 8,
    borderStyle: 'dashed',
    borderColor: '#DDDFE4',
    borderWidth: 1,
    borderRadius: 8,
  },
  active: {
    borderWidth: 0,
    backgroundColor: '#CDF9D0',
  },
  selected: {
    color: '#108C4A',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  mnemonics: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 16,
  },
  mnemonic: {
    width: '28%',
    backgroundColor: 'white',
    marginVertical: 8,
    paddingVertical: 8,
    borderRadius: 8,
  },
  disabled: {
    color: '#DDDFE4',
  },
  loading: {
    marginTop: 30,
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 28,
  },
});
