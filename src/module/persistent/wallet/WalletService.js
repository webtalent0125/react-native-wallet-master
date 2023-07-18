import WalletModule from '../../etherjs/WalletModule';
import CommonAPI from '../../api/CommonAPI';
import { ApplicationProperties } from '../../../ApplicationProperties';
import convert from 'ether-converter';
import moment from 'moment';

export const WalletService = {
  fromMnemonic,
  fromPrivateKey,
  getTransactions,
};

async function fromMnemonic(mnemonics) {
  const wallet = await WalletModule.fromMnemonic(mnemonics);
  return {
    success: wallet ? true : false,
    data: wallet,
  };
}

async function fromPrivateKey(pk) {
  const wallet = await WalletModule.fromPrivateKey(pk);
  return {
    success: wallet ? true : false,
    data: wallet,
  };
}

async function getTransactions(address) {
  const { status, message, result } = await CommonAPI.get(
    'api?module=account&action=txlist&address=' +
      address +
      '&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=' +
      ApplicationProperties.ETHERSCAN_API_KEY
  );
  const data = status === '1' ? result : [];
  data.map((transaction) => {
    transaction.sentOrReceived =
      transaction.from.toUpperCase() == address.toUpperCase() ? 'Sent' : 'Received';
    transaction.status = transaction.txreceipt_status == '0' ? 'Pending' : 'Confirmed';
    transaction.date = moment(transaction.timeStamp, 'X').format('MMMM Do YYYY, h:mm:ss a');
    transaction.etherValue = convert(transaction.value, 'wei').ether;
    transaction.etherGasValue = convert(transaction.gasPrice * transaction.gas, 'wei').ether;
  });
  return data;
}
