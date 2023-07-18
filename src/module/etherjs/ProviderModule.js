import { ethers } from 'ethers';
import { ApplicationProperties } from '../../ApplicationProperties';

const Mainprovider = ethers.getDefaultProvider('homestead', ApplicationProperties.API_PROVIDERS);
let provider = ethers.getDefaultProvider('homestead', ApplicationProperties.API_PROVIDERS);
let TempProvider;

async function setProvider(network) {
  const { name } = network;
  provider = ethers.getDefaultProvider(name, ApplicationProperties.API_PROVIDERS);
  return provider;
}

async function setTempProvider(network) {
  const { name } = network;
  TempProvider = ethers.getDefaultProvider(name, ApplicationProperties.API_PROVIDERS);
  return TempProvider;
}

async function getMainProvider() {
  return Mainprovider;
}

async function getTempProvider() {
  return TempProvider;
}

function getProvider() {
  return provider;
}

async function getNetwork() {
  return await provider.getNetwork();
}

async function getGasprice() {
  return await provider.getGasPrice();
}

export const ProviderModule = {
  setProvider,
  getProvider,
  getNetwork,
  getMainProvider,
  getGasprice,
  setTempProvider,
  getTempProvider
};
