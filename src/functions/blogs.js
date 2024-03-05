import axios from 'axios';
import { token } from '../constants';

const GetBlogsHandler = async () => {
  const res = await axios.get(`http://localhost:5000/api/blog`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    withCredentials: true,
  });
  return res.data;
};

const GetBlogById = async (blogId) => {
  const res = await axios.get(`http://localhost:5000/api/blog/${blogId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
    },
    withCredentials: true,
  });
  return res.data;
};

export { GetBlogById, GetBlogsHandler };
