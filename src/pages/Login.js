import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import Meta from '../components/Meta';
import { HandleSetCookie } from '../constants';
// import { useAuth } from '../context/auth';
import { LoginHandler } from '../functions/auththenticaion';
import { useAuth } from '../context/auth';

const Login = () => {
  const navigate = useNavigate();

  const { getUser, currentUser, isLoadingUser } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

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
            if (res?.data && res?.data?._id) {
              HandleSetCookie('accessToken', res.data.token);
              getUser();
              navigate('/');
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

  useEffect(() => {
    if (!isLoadingUser && currentUser) {
      navigate('/');
    }

    if (!isLoadingUser && !currentUser) {
      setIsPageLoading(false);
    }
  }, [isLoadingUser, currentUser]);

  return (
    <>
      <Meta title={'Login'} />
      <BreadCrumb title="Login" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        {isPageLoading ? (
          <div className="d-flex justify-content-center align-items-center flex-row py-5">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
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
                    error={touched?.email && errors?.email}
                  />

                  <CustomInput
                    type="text"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={values?.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched?.password && errors?.password}
                  />
                  <div>
                    <Link to="/forgot-password">Forgot Password?</Link>

                    <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                      <button
                        disabled={isLoading}
                        className="button border-0"
                        type="submit"
                      >
                        {isLoading ? 'Loading...' : 'Login'}
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
        )}
      </Container>
    </>
  );
};

export default Login;
