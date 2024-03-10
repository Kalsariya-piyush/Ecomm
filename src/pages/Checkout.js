import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import Container from '../components/Container';
import { config, useAuth } from '../context/auth';
import { createOrder } from '../functions/order';
import { GetCart } from '../functions/products';

const Checkout = () => {
  const { currentUser, isLoadingUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [cartItem, setCartItem] = useState([]);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: '',
    razorpayOrderId: '',
  });

  console.log(paymentInfo, shippingInfo);
  const [totalAmount, setTotalAmount] = useState(0);

  const getUserCart = () => {
    setIsLoading(true);
    GetCart()
      .then((res) => {
        setCartItem(res?.data);
      })
      .catch((err) => {
        console.log('rtt .> ', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const { handleBlur, handleChange, handleSubmit, errors, touched, values } =
    useFormik({
      initialValues: {
        firstName: '',
        lastName: '',
        address: '',
        state: '',
        city: '',
        country: '',
        pincode: '',
        other: '',
      },

      validationSchema: yup.object({
        firstName: yup.string().required('Please enter a first name'),
        lastName: yup.string().required('Please enter a last name'),
        address: yup.string().required('Please enter a address'),
        state: yup.string().required('Please enter a state'),
        city: yup.string().required('Please enter a city'),
        country: yup.string().required('Please enter a country'),
        pincode: yup.string().required('Please enter a pincode'),
      }),

      onSubmit: (value) => {
        setShippingInfo(value);
        checkOutHandler();
      },
    });

  useEffect(() => {
    if (currentUser && currentUser?._id && !isLoadingUser) getUserCart();
  }, [currentUser, isLoadingUser]);

  useEffect(() => {
    const total = cartItem?.reduce((acc, item) => {
      return acc + item?.productId?.price * item?.quantity;
    }, 0);
    setTotalAmount(total);
  }, [cartItem]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkOutHandler = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      alert('Razorpay SDK Failed to load');
      return;
    }
    const result = await axios.post(
      'http://localhost:5000/api/user/order/checkout',
      {},
      config
    );
    if (!result) {
      alert('Something Went Wrong');
      return;
    }

    const { amount, id: order_id, currency } = result.data?.order;
    const options = {
      key: 'rzp_test_7ExPl5jpqgY76U', // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: 'Clicon',
      description: 'Test Transaction',
      image: {},
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          'http://localhost:5000/api/user/order/paymentVerification',
          data,
          config
        );

        setPaymentInfo({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        });

        await createOrder({
          totalPrice: totalAmount,
          totalPriceAfterDiscount: totalAmount,
          orderItems: [],
          paymentInfo,
          shippingInfo,
        });
        // alert(result);
      },
      prefill: {
        name: 'clicon',
        email: 'clicon@example.com',
        contact: '9999999999',
      },
      notes: {
        address: 'clicon office',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Clicon</h3>
              <nav
                style={{ '--bs-breadcrumb-divider': '>' }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">clicon (clicon@gmail.com)</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="w-100">
                  <select
                    name="country"
                    className="form-control form-select"
                    value={values.country}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    id=""
                  >
                    <option value="" selected disabled>
                      Select Country
                    </option>
                    <option value="India">India</option>
                  </select>
                  {errors.country && touched.country && (
                    <p className="text-danger">{errors.country}</p>
                  )}
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="firstName"
                    placeholder="First Name"
                    className="form-control"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-danger">{errors.firstName}</p>
                  )}
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="lastName"
                    placeholder="Last Name"
                    className="form-control"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-danger">{errors.lastName}</p>
                  )}
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="address"
                    placeholder="Address"
                    className="form-control"
                  />
                  {errors.address && touched.address && (
                    <p className="text-danger">{errors.address}</p>
                  )}
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    value={values.other}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="other"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                  />
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    value={values.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="city"
                    placeholder="City"
                    className="form-control"
                  />
                  {errors.city && touched.city && (
                    <p className="text-danger">{errors.city}</p>
                  )}
                </div>
                <div className="flex-grow-1">
                  <select
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="state"
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" selected disabled>
                      Select State
                    </option>
                    <option value="Gujrat">Gujrat</option>
                  </select>
                  {errors.state && touched.state && (
                    <p className="text-danger">{errors.state}</p>
                  )}
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    value={values.pincode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="pincode"
                    placeholder="Zipcode"
                    className="form-control"
                  />
                  {errors.pincode && touched.pincode && (
                    <p className="text-danger">{errors.pincode}</p>
                  )}
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <Link to="/cart" className="button">
                      Continue to Shipping
                    </Link>
                    <button className="button" type="submit">
                      Place Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            {isLoading && (
              <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                <span class="loader mx-auto"></span>
              </div>
            )}
            <div className="border-bottom py-4">
              {cartItem &&
                !isLoading &&
                cartItem?.map((item, index) => (
                  <div className="d-flex gap-10 mb-2 align-align-items-center">
                    <div className="w-75 d-flex gap-10">
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: '-10px', right: '-2px' }}
                          className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                        >
                          {item?.quantity}
                        </span>
                        <img
                          className="img-fluid"
                          src={item?.productId?.images[0]?.url}
                          alt="product"
                        />
                      </div>
                      <div>
                        <h5 className="total-price">
                          {item?.productId?.title}
                        </h5>
                        <ul className="colors ps-0">
                          <li style={{ background: item?.color?.title }} />
                        </ul>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <h5 className="total">
                        $ {item?.productId?.price * item?.quantity}
                      </h5>
                    </div>
                  </div>
                ))}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">$ {totalAmount}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">$ 5</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">
                $ {totalAmount ? totalAmount + 5 : 0}
              </h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
