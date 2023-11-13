import axios from 'axios';
const SERVER_ADDRESS = 'http://10.150.149.25:3000'

axios.defaults.withCredentials = true;

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});