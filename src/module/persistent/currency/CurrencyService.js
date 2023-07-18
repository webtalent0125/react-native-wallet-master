import { ApplicationProperties } from '../../../ApplicationProperties';
import { LMStorageService } from '../storage/LMStorageService';
import { LMStorageConstant } from '../storage/LMStorageConstant';
import cryptocompare from 'cryptocompare';

async function getCurrency(token) {
  cryptocompare.setApiKey(ApplicationProperties.CRYPTOCOMPARE_API_KEY);
  const currency =
    (await LMStorageService.getItem(LMStorageConstant.DEFAULT_CURRENCY_STORAGE_KEY)) ||
    ApplicationProperties.DEFAULT_CURRENCY;
  await LMStorageService.setItem(LMStorageConstant.DEFAULT_CURRENCY_STORAGE_KEY, currency);
  const key = currency.key;
  return await cryptocompare.price(token, key);
}
export const CurrencyService = {
  getCurrency,
};
