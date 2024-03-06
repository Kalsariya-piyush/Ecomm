import { useFormik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import Meta from '../components/Meta';
import { getCharacterValidationError } from '../constants';
import { SignUpHandler } from '../functions/auththenticaion';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  // const { setCurrentUser } = useAuth();

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        mobileNo: '',
        email: '',
        password: '',
        address: '',
      },

      validationSchema: yup.object({
        firstName: yup.string().required('Please enter a first name'),
        lastName: yup.string().required('Please enter a last name'),
        mobileNo: yup
          .number()
          .typeError('Please Enter a valid mobile number')
          .positive('Please Enter a valid mobile number')
          .integer('Please Enter a valid mobile number')
          .min(10)
          .required('Please enter a mobile number'),
        email: yup
          .string()
          .email('Please Enter valid email address')
          .required('Please enter a email address'),
        password: yup
          .string()
          .required('Please enter a password')
          .min(8, 'Password must have at least 8 characters')
          .matches(/[0-9]/, getCharacterValidationError('digit'))
          .matches(/[a-z]/, getCharacterValidationError('lowercase'))
          .matches(/[A-Z]/, getCharacterValidationError('uppercase')),
        address: yup.string().required('Please enter a address'),
      }),

      onSubmit: (value) => {
        setIsLoading(true);

        SignUpHandler(value)
          .then((res) => {
            if (res?.data && res?.data?._id) {
              // setCurrentUser(res?.data);
              // router.push('/login');
            }
          })
          .catch((err) => {
            if (err?.response?.data?.message === 'User Already Exists') {
              toast.error(err?.response?.data?.message);
            } else if (
              err?.response?.data?.message?.includes('mobile_1 dup key')
            ) {
              toast.error(
                'Mobile number is already registered please try with another mobile number'
              );
            }

            setIsLoading(false);
          });
      },
    });

  console.log('Error', errors);
  return (
    <>
      <Meta title={'Sign Up'} />
      <BreadCrumb title="Sign Up" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Sign Up</h3>
              <form
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="First Name"
                  value={values?.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <CustomInput
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Last Name"
                  value={values?.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <CustomInput
                  type="text"
                  id="mobileNo"
                  name="mobileNo"
                  placeholder="Mobile number"
                  value={values?.mobileNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

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

                <CustomInput
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  value={values?.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {/* <CustomInput type="text" name="name" placeholder="Name" />
                <CustomInput type="text" name="name" placeholder="Name" />
                <CustomInput type="email" name="email" placeholder="Email" />
                <CustomInput
                  type="tel"
                  name="mobile"
                  placeholder="Mobile Number"
                />
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                /> */}
                <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                  <button className="button border-0" type="submit">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Signup;
