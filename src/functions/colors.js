import axios from 'axios';
import { token } from '../constants';

const GetAllColors = async () => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/color`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

export { GetAllColors };
