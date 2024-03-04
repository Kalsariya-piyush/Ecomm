import axios from 'axios';
import { token } from '../constants';

const ImageUpload = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append(
      'images',
      file,
      'postman-cloud:///1eec37b3-bf04-45a0-ab3d-369bd91db0c3'
    );
  });

  return await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/upload`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    }
  );
};

const AddProduct = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/product`,
    values,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
};

const GetProductsHandler = async () => {
  const res = await axios.get(`http://localhost:5000/api/product`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    withCredentials: true,
  });
  return res.data;
};

export { AddProduct, GetProductsHandler, ImageUpload };