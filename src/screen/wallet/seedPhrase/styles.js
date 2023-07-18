import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  QRcode: {
    marginVertical: 20,
    alignSelf: 'center',
  },
  title: {
    color: 'black',
    fontSize: 18,
    lineHeight: 21,
    fontWeight: '500',
  },
  copyIcon: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  seedItems: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  seedItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 100,
    marginVertical: 10,
    marginHorizontal: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  itemNumber: {
    backgroundColor: '#013BFF',
    width: 32,
    height: 32,
    borderRadius: 100,
    marginRight: 5,
  },
  textNumber: {
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 16,
    color: 'white',
  },
  itemText: {
    fontSize: 18,
    fontWeight: '500',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  revealView: {
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    width: '70%',
    transform: [{ translateY: -100 }],
  },
  revealText: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
  revealButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderColor: '#013BFF',
  },
});
