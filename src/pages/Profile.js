import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import Meta from '../components/Meta';
import PrivateRoute from '../components/PrivateRoute';

import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useAuth } from '../context/auth';
import { EditUserProfileHandler } from '../functions/auththenticaion';

const Profile = () => {
  const { currentUser, isLoadingUser } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    setValues,
  } = useFormik({
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
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Please enter a mobile number'),
      email: yup
        .string()
        .email('Please Enter valid email address')
        .required('Please enter a email address'),
      address: yup.string().required('Please enter a address'),
    }),

    onSubmit: (value) => {
      setIsLoading(true);

      EditUserProfileHandler(value)
        .then((res) => {
          if (res?.data && res?.data?._id) {
            toast.success('Profile updated successfully');
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
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  useEffect(() => {
    if (!isLoadingUser) {
      setValues({
        address: currentUser?.address,
        email: currentUser?.email,
        firstName: currentUser?.firstname,
        lastName: currentUser?.lastname,
        mobileNo: currentUser?.mobile,
      });
    }
  }, [isLoadingUser]);

  return (
    <>
      <Meta title={'Profile'} />
      <BreadCrumb title="Profile" />
      <Container class1="Profile-wrapper home-wrapper-2 py-5">
        <PrivateRoute>
          <div className="container">
            <div className="row gutters">
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div className="card h-100">
                  <div className="card-body">
                    <div className="account-settings">
                      <div className="user-profile">
                        <div className="user-avatar">
                          <img
                            src="https://bootdey.com/img/Content/avatar/avatar7.png"
                            alt="Maxwell Admin"
                          />
                        </div>
                        <h5 className="user-name">
                          {currentUser?.firstname} {currentUser?.lastname}
                        </h5>
                        <h6 className="user-email">{currentUser?.email}</h6>
                      </div>
                      <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                        <button
                          disabled={isLoadingUser}
                          className="button border-0"
                          type="button"
                          onClick={() => setEditMode(true)}
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                <div
                  className="card h-100"
                  style={{ padding: '10px 20px 20px 20px' }}
                >
                  <div className="card-body">
                    <form onSubmit={handleSubmit} className="row gutters">
                      <h3 className="text-left mb-3" style={{ opacity: 0.5 }}>
                        Personal Details
                      </h3>

                      <div className="col-xl-6 mb-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <label
                          for="firstName"
                          style={{
                            fontSize: '14px',
                            marginBottom: '2px',
                          }}
                        >
                          First Name
                        </label>
                        <CustomInput
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="First Name"
                          style={{
                            height: 46,
                            borderRadius: 6,
                          }}
                          disabled={!editMode}
                          value={values?.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched?.firstName && errors?.firstName}
                        />
                      </div>

                      <div className="col-xl-6 mb-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <label
                          for="lastName"
                          style={{
                            fontSize: '14px',
                            marginBottom: '2px',
                          }}
                        >
                          Last Name
                        </label>
                        <CustomInput
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Last Name"
                          disabled={!editMode}
                          style={{
                            height: 46,
                            borderRadius: 6,
                          }}
                          value={values?.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched?.lastName && errors?.lastName}
                        />
                      </div>

                      <div className="col-xl-6 mb-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <label
                          for="mobileNo"
                          style={{
                            fontSize: '14px',
                            marginBottom: '2px',
                          }}
                        >
                          Mobile No.
                        </label>
                        <CustomInput
                          type="text"
                          id="mobileNo"
                          name="mobileNo"
                          placeholder="Mobile No"
                          disabled={!editMode}
                          style={{
                            height: 46,
                            borderRadius: 6,
                          }}
                          value={values?.mobileNo}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched?.mobileNo && errors?.mobileNo}
                          onKeyDown={(e) => {
                            if (
                              !/[0-9]/.test(e.key) &&
                              e.key !== 'Backspace' &&
                              e.key !== 'Delete' &&
                              e.key !== 'ArrowLeft' &&
                              e.key !== 'ArrowRight'
                            ) {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>

                      <div className="col-xl-6 mb-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <label
                          for="address"
                          style={{
                            fontSize: '14px',
                            marginBottom: '2px',
                          }}
                        >
                          Address
                        </label>
                        <CustomInput
                          type="text"
                          id="address"
                          name="address"
                          placeholder="Address..."
                          style={{
                            height: 46,
                            borderRadius: 6,
                          }}
                          disabled={true}
                          value={values?.address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched?.address && errors?.address}
                        />
                      </div>

                      <div className="col-xl-6 mb-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <label
                          for="email"
                          style={{
                            fontSize: '14px',
                            marginBottom: '2px',
                          }}
                        >
                          Email
                        </label>
                        <CustomInput
                          type="text"
                          id="email"
                          name="email"
                          placeholder="Email"
                          style={{
                            height: 46,
                            borderRadius: 6,
                          }}
                          disabled={true}
                          value={values?.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched?.email && errors?.email}
                        />
                      </div>

                      <div className="row gutters mt-4">
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="text-right d-flex gap-2 justify-content-end">
                            <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                              <button
                                disabled={isLoadingUser || !editMode}
                                className="button border-0 bg-danger"
                                type="button"
                                onClick={() => setEditMode(false)}
                              >
                                Cancel
                              </button>
                            </div>

                            <div className="mt-3 d-flex justify-content-center gap-15 align-items-center">
                              <button
                                disabled={isLoadingUser || isLoading}
                                className="button border-0"
                                type="submit"
                              >
                                {isLoading ? 'Loading...' : 'Update'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PrivateRoute>
      </Container>
    </>
  );
};

export default Profile;
