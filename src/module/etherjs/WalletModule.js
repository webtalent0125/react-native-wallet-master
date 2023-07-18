import 'react-native-get-random-values';
import '@ethersproject/shims';
import { ethers, Contract } from 'ethers';
import { entropyToMnemonic } from '@ethersproject/hdnode';
import { ProviderModule } from './ProviderModule';
import { ApplicationProperties } from '../../ApplicationProperties';
import { LMStorageService } from '../persistent/storage/LMStorageService';
import { LMStorageConstant } from '../persistent/storage/LMStorageConstant';

const { utils, BigNumber, Wallet } = ethers;

function generateMnemonics() {
  return entropyToMnemonic(utils.randomBytes(16)).split(' ');
}

async function fromMnemonic(mnemonics) {
  try {
    const walletMnemonic = Wallet.fromMnemonic(mnemonics.join(' '));
    return walletMnemonic.connect(ProviderModule.getProvider());
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

async function fromPrivateKey(pk) {
  try {
    if (pk.indexOf('0x') !== 0) pk = `0x${pk}`;
    return new Wallet(pk, ProviderModule.getProvider());
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

async function getBalance(wallet) {
  const balance = utils.formatEther(await wallet.getBalance());
  return balance;
}

async function getDefaultAssets(wallet) {
  const { privateKey } = wallet;
  const networks = await LMStorageService.getItem(LMStorageConstant.NETWORKS_STORAGE_KEY);
  const defaultAssets = [];
  for (let i = 0; i < networks.length; i++) {
    try {
      const provider = await ProviderModule.setTempProvider(networks[i]);
      const wallet = new Wallet(privateKey, provider);
      const balance = utils.formatEther(await wallet.getBalance());
      defaultAssets.push({
        symbol: networks[i].symbol,
        platform: networks[i].displayName,
        balance,
      });
    } catch (e) {
      console.log('Error message:\n', e.message);
    }
  }
  return defaultAssets;
}

async function tokenBalance(address, tokenAddress) {
  const abi = ApplicationProperties.MainABI;

  try {
    const contract = new Contract(tokenAddress, abi, ProviderModule.getProvider());
    const contractAddress = tokenAddress;
    const balanceLong = await contract.balanceOf(address);
    const decimals = await contract.decimals();
    const symbol = await contract.symbol();
    const balance = balanceLong.toString() / Math.pow(10, decimals);
    return { contractAddress, address, balance, symbol, decimals };
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function assetBalance(address, tokenAddress) {
  const abi = ApplicationProperties.MainABI;
  const networks = await LMStorageService.getItem(LMStorageConstant.NETWORKS_STORAGE_KEY);
  let balanceData = null;
  for (let i = 0; i < networks.length; i++) {
    try {
      const provider = await ProviderModule.setTempProvider(networks[i]);
      const contract = new Contract(tokenAddress, abi, provider);
      const contractAddress = tokenAddress;
      const balanceLong = await contract.balanceOf(address);
      const decimals = await contract.decimals();
      const symbol = await contract.symbol();
      const balance = utils.formatUnits(balanceLong.toString(), decimals);
      balanceData = {
        contractAddress,
        balance,
        symbol,
        decimals,
        platform: networks[i].displayName,
        address: contractAddress,
      };
      break;
    } catch (e) {
      console.log('Error message:\n', e.message);
    }
  }

  return balanceData;
}

const WalletModule = {
  generateMnemonics,
  fromMnemonic,
  getBalance,
  fromPrivateKey,
  tokenBalance,
  assetBalance,
  getDefaultAssets,
};

export default WalletModule;
