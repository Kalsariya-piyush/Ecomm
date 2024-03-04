import axios from 'axios';
import { token } from '../constants';

const GetAllBrands = async() => {
    return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/brand`, {
        headers: {
            Authorization: `Bearer ${token()}`,
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
};

export { GetAllBrands };