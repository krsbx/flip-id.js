import axios from 'axios';
import { randomUUID } from 'crypto';

const instance = axios.create({
  baseURL: 'https://api.flip.id',
});

instance.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'multipart/form-data';
  config.headers['Request-ID'] = `bigflip-${randomUUID()}`;

  return config;
});

export = instance;
