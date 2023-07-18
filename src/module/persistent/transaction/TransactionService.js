import { ProviderModule } from '../../etherjs/ProviderModule';
import { BigNumber, utils } from 'ethers';
import EtherUtilModule from '../../etherjs/EtherUtilModule';

export const TransactionService = {
  getGasprice,
  sendTransaction,
};

async function getGasprice() {
  const hex = await ProviderModule.getGasprice();
  const gasPrice = EtherUtilModule.formatUnits(BigNumber.from(hex).toString(), 'gwei');
  return gasPrice;
}

async function sendTransaction(params) {
  const { ToAddress, amount, note, wallet } = params;

  const tx = {
    from: wallet.address,
    to: ToAddress,
    value: utils.parseEther(amount),
  };

  try {
    const result = await wallet.sendTransaction(tx);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.log(error.code)
    let errorMessage = '';
    if (error.code === 'INSUFFICIENT_FUNDS')
      errorMessage = 'Insufficient funds for intrinsic transaction cost';
    return {
      success: false,
      data: errorMessage,
    };
  }
}
