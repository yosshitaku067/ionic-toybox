import axios, { AxiosInstance } from 'axios';
import { APP_PARAMS } from '../common/app-params';
import { getProcessEnvParam } from '../common/env';

const API_ENDOPOINT = getProcessEnvParam('REACT_APP_API_ENDPOINT');

// Create Axios Instance
export const fetch: AxiosInstance = axios.create({
  timeout: APP_PARAMS.API_TIMEOUT,
  baseURL: API_ENDOPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// HTTP Request
fetch.interceptors.request.use((config) => {
  const newConfig = config;

  // 固定ヘッダーとかやりたいなら

  return newConfig;
});
