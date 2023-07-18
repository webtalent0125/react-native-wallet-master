import { utils, ethers } from 'ethers';
import axios from 'axios';
import { ApplicationProperties } from '../../../ApplicationProperties';
import { ProviderModule } from '../../etherjs/ProviderModule';

const { BigNumber, Wallet } = ethers;

// Check network connection
async function healthcheck(chainId) {
  let requestUrl = ApplicationProperties.ONEINCH_API_URL + '/' + chainId + '/healthcheck';
  try {
    const response = await axios.get(requestUrl);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}

// Get 0x swap quotes (check if the tx is possible)
async function getQuotes(tokenFrom, tokenTo, chainId, slippage, wallet) {
  let requestUrl = ApplicationProperties.Oxapi[chainId] + 'swap/v1/quote';
  const numberOfTokens = utils.parseUnits(tokenFrom.amount, tokenFrom.decimals).toString();
  const params =
    '?sellToken=' +
    tokenFrom.tokenaddress +
    '&buyToken=' +
    tokenTo.tokenaddress +
    '&sellAmount=' +
    numberOfTokens +
    '&slippagePercentage=' +
    slippage / 100 +
    '&takerAddress=' +
    wallet.address +
    '&includePriceComparisons=true&intentOnFilling=true';

  try {
    const { data } = await axios.get(requestUrl + params);
    const fromTokenAmount = utils.formatUnits(data.sellAmount, tokenFrom.decimals);
    const toTokenAmount = utils.formatUnits(data.buyAmount, tokenTo.decimals);
    const { estimatedGas, value } = data;
    const routeAddress = data.to;
    const contractCallData = data.data;
    const gasPrice = utils.formatEther(data.gasPrice);

    return {
      success: true,
      data: {
        fromTokenAmount,
        toTokenAmount,
        estimatedGas,
        gasPrice,
        routeAddress,
        contractCallData,
        value,
      },
    };
  } catch (error) {
    const errorData = error.response.data;
    return {
      success: false,
      code: errorData.code,
      message: errorData.values.message,
    };
  }
}

// Submit tx
async function swapToken(chainId, wallet, quote) {
  try {
    const tx = {
      to: quote.routeAddress,
      value: BigNumber.from(quote.value),
      gasLimit: Number(quote.estimatedGas),
      data: quote.contractCallData,
    };
    const provider = await ProviderModule.getProvider();
    const walletObject = new Wallet(wallet.privateKey, provider);

    const result = await walletObject.sendTransaction(tx);

    return {
      success: true,
      data: result,
      // data: 'test',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: error.code,
    };
  }
}

async function approveToken(tokenFrom, tokenTo, chainId, slippage, wallet) {
  let requestUrl = ApplicationProperties.Oxapi[chainId] + 'swap/v1/quote';
  const numberOfTokens = utils.parseUnits(tokenFrom.amount, tokenFrom.decimals).toString();
  const params =
    '?sellToken=' +
    tokenFrom.tokenaddress +
    '&buyToken=' +
    tokenTo.tokenaddress +
    '&sellAmount=' +
    numberOfTokens +
    '&slippagePercentage=' +
    slippage / 100 +
    '&includePriceComparisons=true&intentOnFilling=true';

  try {
    const { data } = await axios.get(requestUrl + params);
    const routeAddress = data.to;
    const provider = await ProviderModule.getProvider();
    const walletObject = new Wallet(wallet.privateKey, provider);
    const walletSigner = (await walletObject).connect(provider);

    let contract = new ethers.Contract(
      tokenFrom.tokenaddress,
      ApplicationProperties.transactionABI,
      walletSigner
    );

    const approveAmount = utils
      .parseUnits(
        '10000000000000000000000000000000000000000000000000000',
        tokenFrom.decimals
      )
      .toString();

    approved = await contract.approve(routeAddress, approveAmount);

    return {
      success: true,
      result: approved,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
}

export const SwapServices = {
  getQuotes,
  healthcheck,
  swapToken,
  approveToken,
};
