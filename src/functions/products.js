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
  const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/product`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    withCredentials: true,
  });
  return res.data;
};

const AddToWishList = async (values) => {
  return await axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/product/wishlist`,
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

const GetWishList = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/user/wishlist`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
      withCredentials: true,
    }
  );

  return res.data;
};

const GetProductById = async (productId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/product/${productId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
      withCredentials: true,
    }
  );
  return res.data;
};

const AddToCart = async (values) => {
  return await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/user/cart`,
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

const GetCart = async () => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/cart`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

const deleteCartProduct = async () => {
  return await axios.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/user/cart/product`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
};

const RemoveCartProduct = async (productId) => {
  return await axios.delete(
    `${process.env.REACT_APP_API_ENDPOINT}/user//delete-product-cart`,
    { cartItemId: productId },
    {
      headers: {
        Authorization: `Bearer ${token()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
};

export {
  AddProduct,
  AddToCart,
  AddToWishList,
  GetCart,
  GetProductById,
  GetProductsHandler,
  GetWishList,
  ImageUpload,
  RemoveCartProduct,
};
