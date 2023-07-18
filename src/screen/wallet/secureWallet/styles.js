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
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  content: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 15,
    textAlign: 'justify',
  },
  modalContent: {
    paddingHorizontal: 24,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: '700',
  },
  modalText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
  },
});
