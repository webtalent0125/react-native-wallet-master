import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    shadowColor: '#3F77AC',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 50,
    elevation: 5,
    marginBottom: 20,
    borderRadius: 8,
  },
  content: {
    padding: 20,
  },
  time: {
    flexDirection: 'row',
  },
  timeText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#8FA2B7',
    marginLeft: 8,
  },
  votes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  votesItem: {
    alignItems: 'center',
  },
  votesNumber: {
    fontWeight: '500',
    fontSize: 21,
    lineHeight: 25,
    color: '#011B21',
  },
  votesText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#8FA2B7',
  },
  votesLogo: {
    marginHorizontal: 35,
  },
  info: {
    alignItems: 'center',
    marginBottom: 17,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 23,
    color: '#011B21',
    marginBottom: 13,
  },
  network: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#8FA2B7',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: '#DDE8E8',
    borderRadius: 40,
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 18,
    color: '#5A6E7A',
    marginLeft: 13,
  },
  detail: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#EDF1F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailText: {
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 15,
    color: '#3755F0',
  },
});
