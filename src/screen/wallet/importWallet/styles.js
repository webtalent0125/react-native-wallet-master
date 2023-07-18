import { StyleSheet } from 'react-native';
import { primary, white } from '../../../components/common/LMStyle';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  background: {
    flex: 1,
    backgroundColor: white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -35,
    zIndex: 11,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  title: {
    color: 'white',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
  },
  QRcodeContainer: {
    position: 'absolute',
    height: '100%',
    backgroundColor: 'black',
    top: 0,
    zIndex: 111,
  },
  faceId: {
    marginTop: 30,
    marginBottom: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  faceIdText: {
    color: '#011B21',
    fontSize: 18,
    lineHeight: 28,
  },
  info: {
    color: '#011B21',
    fontSize: 14,
    lineHeight: 21,
  },
  strength: {
    marginTop: 10,
    color: '#8FA2B7',
    fontSize: 12,
    lineHeight: 18,
  },
});
