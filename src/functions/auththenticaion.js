import axios from 'axios';
import { token } from '../constants';

const SignUpHandler = async (data) => {
  const body = {
    email: data.email,
    password: data.password,
    firstname: data.firstName,
    lastname: data.lastName,
    mobile: data.mobileNo,
    address: data.address,
  };

  return await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/user/register`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
};

const LoginHandler = async (data) => {
  const body = {
    email: data.email,
    password: data.password,
  };

  return await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/user/login`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );
};

const GetCurrentUser = async () => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/me`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

const HandleLogout = async () => {
  return await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user/logout`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
};

const forgotPasswordHandler = async (email) => {
  const body = {
    email,
  };

  const res = await axios.post(
    `${process.env.REACT_APP_API_ENDPOINT}/user/forgot-password-token`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );

  return res;
};

const resetPasswordHandler = async (hash, password) => {
  const body = {
    password,
  };

  const res = await axios.put(
    `${process.env.REACT_APP_API_ENDPOINT}/user/reset-password/${hash}`,
    body,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }
  );

  return res;
};

export {
  GetCurrentUser,
  HandleLogout,
  LoginHandler,
  SignUpHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
};
