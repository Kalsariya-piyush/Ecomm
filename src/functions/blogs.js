import axios from 'axios';
import { token } from '../constants';

const GetBlogsHandler = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/blog`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    withCredentials: true,
  });
  return res.data;
};

const GetBlogById = async (blogId) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ENDPOINT}/blog/${blogId}`,
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

export { GetBlogById, GetBlogsHandler };
