import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  passwordForm: {
    marginTop: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  pageLogo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 10,
  },
  inputWrapper: {
    marginTop: 10,
  },
  inputLabel: {
    fontWeight: '500',
  },
  textInput: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#EDF1F9',
    marginVertical: 5,
    borderRadius: 5,
    fontWeight: '500',
  },
  errorMessage: {
    fontSize: 12,
    fontWeight: '500',
    color: 'red',
  },
  passwordSaveButton: {
    padding: 10,
    backgroundColor: '#013BFF',
    borderRadius: 100,
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 14,
    lineHeight: 22.4,
    color: 'white',
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: 'gray',
  },
  strength: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
});
