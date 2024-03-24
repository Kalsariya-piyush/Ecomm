import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import Meta from '../components/Meta';
import { ERRORS } from '../constants';
import { forgotPasswordHandler } from '../functions/auththenticaion';

const Forgotpassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    setFieldValue,
    setTouched,
  } = useFormik({
    initialValues: {
      email: '',
    },

    validationSchema: yup.object({
      email: yup
        .string()
        .email('Please Enter valid email address')
        .required('Please enter a email address'),
    }),

    onSubmit: async (value) => {
      setIsLoading(true);
      forgotPasswordHandler(value.email)
        .then((res) => {
          if (res?.status === 200) {
            toast.success('Email sent');
            setFieldValue('email', '');
            setTouched({
              email: false,
            });
          }
        })
        .catch((error) => {
          console.log('error > ', error);
          if (
            error?.response?.data?.message === 'User not found with this email'
          ) {
            toast.error(error?.response?.data?.message);
          } else {
            toast.error(ERRORS.INTERNAL_SERVER_ERROR);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <>
      <Meta title={'Forgot Password'} />
      <BreadCrumb title="Forgot Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-2 mb-3">
                We will send you an email to reset your password
              </p>
              <form
                className="d-flex flex-column gap-15"
                onSubmit={handleSubmit}
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

                <div className="d-flex mt-3 gap-4 justify-content-center align-items-center">
                  <div className="d-flex justify-content-center flex-column gap-15 align-items-center">
                    <button
                      disabled={isLoading}
                      className="button border-0"
                      type="submit"
                    >
                      {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                  </div>

                  <Link className="button border-0 bg-danger" to="/login">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Forgotpassword;
