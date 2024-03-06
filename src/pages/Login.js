import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import Meta from '../components/Meta';
import { HandleSetCookie } from '../constants';
import { useAuth } from '../context/auth';
import { LoginHandler } from '../functions/auththenticaion';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getUser } = useAuth();

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },

      validationSchema: yup.object({
        email: yup
          .string()
          .email('Please Enter valid email address')
          .required('Please enter a email address'),
        password: yup.string().required('Please enter a password'),
      }),

      onSubmit: (value) => {
        setIsLoading(true);
        LoginHandler(value)
          .then((res) => {
            if (res?.data && res?.data?._id && typeof window !== undefined) {
              HandleSetCookie('accessToken', res.data.token);
              // getUser();
              // router.push('/');
              setIsLoading(false);
            }
          })
          .catch((err) => {
            if (err?.response?.data?.message === 'Invalid Credentials') {
              toast.error(err?.response?.data?.message);
            }
            setIsLoading(false);
          });
      },
    });

  return (
    <>
      <Meta title={'Login'} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <CustomInput
                  type="text"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={values?.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div>
                  <Link to="/forgot-password">Forgot Password?</Link>

                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Login
                    </button>

                    <Link to="/signup" className="button signup">
                      SignUp
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
