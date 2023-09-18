import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://bigflip.id',
});

instance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

  return config;
});

export = instance;
