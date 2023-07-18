import { Platform } from 'react-native';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  navbar: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginStart: 15,
  },
  navbarStyle: {
    zIndex: 11,
  },
  title: {
    position: 'absolute',
    top: 5,
    fontSize: 18,
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
    zIndex: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -35,
    zIndex: 11,
  },
  modalContent: {
    paddingTop: 30,
    paddingBottom: Platform.OS === 'ios' ? 40 : 30,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'space-between',
  },
  txDetails: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 6,
    shadowColor: '#3F77AC',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 50,
    elevation: 3,
  },
  tokenDetail: {
    backgroundColor: '#F0F3FF',
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tokenLogo: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  tokenSymbol: {
    fontSize: 16,
    fontWeight: '500',
    color: '#011B21',
    marginBottom: 4,
  },
  tokenName: {
    fontSize: 12,
    fontWeight: '400',
    color: '#8FA2B7',
  },
  totalPrice: {
    marginTop: 30,
    marginBottom: 12,
    fontSize: 36,
    lineHeight: 56,
    fontWeight: '500',
    color: '#2D3748',
  },
  totalCost: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: '#8FA2B7',
  },
  divider: {
    marginVertical: 30,
    // height: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    // backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='black' stroke-width='1' stroke-dasharray='5%2c 3' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
  },
  gasPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  gasTitle: {
    color: '#8FA2B7',
    fontWeight: '400',
    fontSize: 12,
  },
  gasAmount: {
    color: '#2D3748',
    fontWeight: '400',
    fontSize: 12,
  },
  confirmButton: {
    backgroundColor: '#3755F0',
    paddingVertical: 12,
    borderRadius: 100,
    marginTop: 'auto',
  },
  confirmButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '700',
  },
});
