import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginTop: -35,
    zIndex: 11,
    backgroundColor: 'white',
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    flex: 1,
    padding: 15,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  walletDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  exzoLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  profileOptions: {
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 15,
  },
});
