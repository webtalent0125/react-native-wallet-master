import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  mainContent: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    width: '50%',
  },
  tabButton: {
    borderWidth: 1,
    alignSelf: 'center',
    borderColor: '#013BFF',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '500',
  },
  indicator: {
    width: 32,
    height: 2,
    backgroundColor: '#013BFF',
    marginTop: 5,
  },
  tokenLists: {
    marginTop: 10,
  },
  tokenItem: {
    backgroundColor: '#f7f9fc',
    marginVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tokenLogo: {
    width: 48,
    height: 48,
    marginRight: 15,
  },
  tokenSymbol: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.41,
    color: '#8E8E93',
    marginBottom: 5,
  },
  tokenName: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16.41,
  },
  deleteButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formLayout: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  buttonGroup: {
    marginTop: 29,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  cancelButtonModal: {
    padding: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#013BFF',
  },
  deleteButtonModal: {
    padding: 7,
    backgroundColor: '#013BFF',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});
