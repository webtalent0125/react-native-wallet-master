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
  },
  title: {
    color: '#EDF1F9',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
  },
  subTitle: {
    color: '#EDF1F9',
    fontSize: 16,
    marginTop: 16,
  },
  contentCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 10,
  },
  strengthBar: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  colorBar: {
    backgroundColor: '#108C4A',
    width: 32,
    height: 8,
    borderRadius: 100,
    marginRight: 7,
  },
  listText: {
    fontSize: 14,
    lineHeight: 24,
  },
});
