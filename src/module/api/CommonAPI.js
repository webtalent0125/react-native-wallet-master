import axios from 'axios';
import { ApplicationProperties } from '../../ApplicationProperties';
const instance = axios.create({
  baseURL: ApplicationProperties.ACTIVE_NETWORK.apiUrl,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36',
  },
});
const post = async (url, params) => {
  const response = await instance.post(url, params);
  return response;
};
const get = async (url) => {
  const data = await instance.get(url);
  return data.data;
};
const setBaseUrl = (url) => {
  instance.defaults.baseURL = url;
};
const CommonAPI = {
  post,
  get,
  setBaseUrl,
};
export default CommonAPI;
