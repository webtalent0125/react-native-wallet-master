import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D2F',
  },
  imagebackground: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'ios' ? 40 : 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 27,
    fontWeight: '600',
    marginBottom: 20,
  },
  languageItem: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3E3E3E',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    color: 'white',
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: 17,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4,
  },
});
