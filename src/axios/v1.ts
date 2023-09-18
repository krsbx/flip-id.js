import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.flip.id/kyc',
});

instance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'multipart/form-data';

  return config;
});

export = instance;
