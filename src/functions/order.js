import axios from 'axios';
import { config } from '../context/auth';

export const createOrder = async (order) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/user/cart/create-order`,
    order,
    config
  );

  return res;
};

export const clearCart = async () => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/user/empty-cart`,
    config
  );

  return res;
};
