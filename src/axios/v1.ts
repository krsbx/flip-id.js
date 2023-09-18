import axios from 'axios';
import { v4 as uuid } from 'uuid';

const instance = axios.create({
  baseURL: 'https://api.flip.id',
});

instance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'multipart/form-data';
  config.headers['Request-ID'] = `bigflip-${uuid()}`;

  return config;
});

export = instance;
