import { utils, ethers } from 'ethers';
import { TransactionService } from './TransactionService';
import { getGasPrice } from './TransactionReducer';
import LMLoading from '../../../components/common/LMLoading';
import { ApplicationProperties } from '../../../ApplicationProperties';

const { BigNumber, Wallet } = ethers;

export const TransactionAction = {
  getGasprice,
  sendTransaction,
};

function getGasprice() {
  return async (dispatch) => {
    const result = await TransactionService.getGasprice();
    dispatch(getGasPrice(result));
    return result;
  };
}

function sendTransaction(params) {
  return async (dispatch) => {
    const { activeWallet, ToAddress, amount, note, gasPrice, contractAddress, decimals, platform, symbol } =
      params;

    const networks = ApplicationProperties.NETWORKS;
    const index = networks.findIndex((network) => network.displayName === platform);
    const selectedNetwork = networks[index];
    const provider = ethers.getDefaultProvider(
      selectedNetwork.name,
      ApplicationProperties.API_PROVIDERS
    );
    const wallet = new Wallet(activeWallet.privateKey, provider);

    if (contractAddress) {
      try {
        const walletSigner = (await wallet).connect(provider);
        let contract = new ethers.Contract(
          contractAddress,
          ApplicationProperties.transactionABI,
          walletSigner
        );

        const numberOfTokens = utils.parseUnits(amount, decimals).toString();
        await contract.approve(activeWallet.address, numberOfTokens);
        const result = await contract.transfer(ToAddress, numberOfTokens);
        LMLoading.hide();
        return {
          success: true,
          data: result,
        };
      } catch (error) {
        LMLoading.hide();
        return {
          success: false,
          data: error.message,
        };
      }
    } else {
      const result = await TransactionService.sendTransaction({
        ToAddress,
        amount,
        note,
        wallet,
      });
      LMLoading.hide();
      return result;
    }
  };
}
