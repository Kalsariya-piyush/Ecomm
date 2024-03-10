import React, { useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import { useFormik } from 'formik';
import { ERRORS, getCharacterValidationError } from '../constants';
import * as yup from 'yup';
import { resetPasswordHandler } from '../functions/auththenticaion';
import { toast } from 'react-toastify';

const Resetpassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },

      validationSchema: yup.object({
        password: yup
          .string()
          .required('Please enter a password')
          .min(8, 'Password must have at least 8 characters')
          .matches(/[0-9]/, getCharacterValidationError('digit'))
          .matches(/[a-z]/, getCharacterValidationError('lowercase'))
          .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
        confirmPassword: yup
          .string()
          .required('Please enter a confirm password')
          .oneOf([yup.ref('password'), null], 'Password does not match'),
      }),

      onSubmit: async (value) => {
        setIsLoading(true);

        const hash = token;

        resetPasswordHandler(hash, value.password)
          .then((res) => {
            if (res?.status === 200) {
              toast.success(ERRORS.RESET_PASSWORD_SUCCESS);
              localStorage.removeItem('mail_step');
              navigate('/login');
            }
          })
          .catch((error) => {
            if (
              error?.response?.data?.message.trim() ===
              'Token Expired, Please try again later'
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
      <Meta title={'Reset Password'} />
      <BreadCrumb title="Reset Password" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Password</h3>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={values?.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched?.password && errors?.password}
                />

                <CustomInput
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={values?.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched?.confirmPassword && errors?.confirmPassword}
                />
                <div>
                  <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                    <button type="submit" className="button border-0">
                      Ok
                    </button>
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

export default Resetpassword;
