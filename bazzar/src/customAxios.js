import axios from 'axios';
const SERVER_ADDRESS = 'https://port-0-bazaar-backend-1gksli2alphjrcb7.sel5.cloudtype.app/'

axios.defaults.withCredentials = true;

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});