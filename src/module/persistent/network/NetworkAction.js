import { NetworkService } from './NetworkService';
import { getNetworksSuccess, setActiveNetworkSuccess } from './NetworkReducer';
import { ProviderModule } from '../../etherjs/ProviderModule';
import CommonAPI from '../../api/CommonAPI';
import LMLoading from '../../../components/common/LMLoading';

function list() {
  return async (dispatch) => {
    const { success, data } = await NetworkService.list();
    if (success) {
      dispatch(getNetworksSuccess(data));
    }
    return { success, data };
  };
}

function setActiveNetwork(network) {
  return async (dispatch) => {
    await NetworkService.setActiveNetwork(network);
    await ProviderModule.setProvider(network);
    CommonAPI.setBaseUrl(network.apiUrl);
    dispatch(setActiveNetworkSuccess(network));
    LMLoading.hide();
  };
}

function getActiveNetwork() {
  return async (dispatch) => {
    const activeNetwork = await NetworkService.getActiveNetwork();
    dispatch(setActiveNetworkSuccess(activeNetwork));
    return activeNetwork;
  };
}

export const NetworkAction = {
  list,
  getActiveNetwork,
  setActiveNetwork,
};
