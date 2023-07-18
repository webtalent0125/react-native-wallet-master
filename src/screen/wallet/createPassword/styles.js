import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D2F',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
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
    width: '33%',
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
    marginTop: 30,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    marginTop: 16,
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
  },
  faceId: {
    marginTop: 25 ,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  faceIdText: {
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
  },
  confirmText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 24,
  },
});
