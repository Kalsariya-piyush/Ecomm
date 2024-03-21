import { useFormik } from 'formik';
import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiInfoCircle, BiPhoneCall } from 'react-icons/bi';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';
import Meta from '../components/Meta';
import { CreateEnquiryHandler } from '../functions/auththenticaion';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    values,
    resetForm,
  } = useFormik({
    initialValues: {
      name: '',
      mobileNo: '',
      email: '',
      password: '',
      comments: '',
    },

    validationSchema: yup.object({
      name: yup.string().required('Please enter a name'),
      mobileNo: yup
        .string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required('Please enter a mobile number'),
      email: yup
        .string()
        .email('Please Enter valid email address')
        .required('Please enter a email address'),
      comments: yup.string().required('Please enter a address'),
    }),

    onSubmit: (value) => {
      setIsLoading(true);

      CreateEnquiryHandler(value)
        .then((res) => {
          if (res?.data && res?.data?._id) {
            toast.success('Your message submitted successfully.');
            resetForm();
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

  return (
    <>
      <Meta title={'Contact Us'} />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.934492301182!2d72.81109339999999!3d21.2344461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fb2ceeef58b%3A0x330ae60f6f2cc344!2sShivalik!5e0!3m2!1sen!2sin!4v1711035251198!5m2!1sen!2sin"
              width="600"
              height="450"
              className="border-0 w-100"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-12 mt-5">
            <div className="contact-inner-wrapper d-flex justify-content-between ">
              <div>
                <h3 className="contact-title mb-4">Contact</h3>
                <form
                  onSubmit={handleSubmit}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <CustomInput
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      style={{
                        height: 46,
                        borderRadius: 6,
                      }}
                      value={values?.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched?.name && errors?.name}
                    />
                  </div>
                  <div>
                    <CustomInput
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email"
                      style={{
                        height: 46,
                        borderRadius: 6,
                      }}
                      value={values?.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched?.email && errors?.email}
                    />
                  </div>
                  <div>
                    <CustomInput
                      type="text"
                      id="mobileNo"
                      name="mobileNo"
                      placeholder="Mobile No"
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
                  <div>
                    <CustomInput
                      type="text"
                      id="comments"
                      name="comments"
                      placeholder="Comments.."
                      style={{
                        height: 46,
                        borderRadius: 6,
                      }}
                      value={values?.comments}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched?.comments && errors?.comments}
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="button border-0"
                    >
                      {isLoading ? 'Loading...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
              <div>
                <h3 className="contact-title mb-4">Get in touch with us</h3>
                <div>
                  <ul className="ps-0">
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineHome className="fs-5" />
                      <address className="mb-0">A-308 Shivalik arcade.</address>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+91 7698026049">+91 9999999999</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:clicon@gmail.coms">clicon@gmail.com</a>
                    </li>
                    <li className="mb-3 d-flex gap-15 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <p className="mb-0">Monday – Friday 10 AM – 8 PM</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
