import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  mainContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  tokenBalance: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  assetLogo: {
    marginRight: 10,
  },
  showTransaction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  marketData: {
    marginTop: 40,
    borderTopWidth: 1,
    borderColor: '#E4E4E4',
  },
  marketItem: {
    paddingVertical: 25,
    borderBottomWidth: 1,
    borderColor: '#E4E4E4',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marketIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  metaData: {
    marginTop: 30,
  },
  metaTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '500',
    color: '#0D1F3C',
  },
  metaDescription: {
    fontSize: 13,
    lineHeight: 20,
    color: '#0D1F3C',
    marginTop: 20,
  },
  tokenUrls: {
    marginTop: 30,
  },
  tokenLink: {
    flexDirection: 'row',
    marginVertical: 7,
  },
  socialLinks: {
    marginTop: 20,
    flexDirection: 'row',
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 7,
  },
  removeAsset: {
    backgroundColor: '#FF2323',
    padding: 5,
    borderRadius: 5,
  },
  removeAssetText: {
    color: 'white',
    fontWeight: '700',
  },
  contracts: {
    marginTop: 10,
  },
  contractAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contractName: {
    fontWeight: '500',
    marginRight: 10,
  },
  moreButton: {
    flexDirection: 'row',
    marginLeft: 10,
    backgroundColor: '#eff2f5',
    borderRadius: 5,
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalHeader: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  closeButton: {
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 10,
  },
  modalContent: {
    maxHeight: '80%',
    backgroundColor: 'white',
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
});
