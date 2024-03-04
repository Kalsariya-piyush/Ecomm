import axios from 'axios';
import { token } from '../constants';

const GetAllCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/category`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

export { GetAllCategories };
