import axios from 'axios';
import { config } from '../context/auth';

export const createOrder = async(order) => {
    const res = await axios.put(
        `${process.env.REACT_APP_API_ENDPOINT}/user/cart/create-order`,
        order,
        config
    );

    return res;
};