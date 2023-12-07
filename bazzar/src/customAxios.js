import axios from 'axios';
const SERVER_ADDRESS = process.env.REACT_APP_BACKEND_ADDRESS;

axios.defaults.withCredentials = true;

export const customAxios = axios.create({
  baseURL: `${SERVER_ADDRESS}`,
});