import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Meta from '../components/Meta';
import PrivateRoute from '../components/PrivateRoute';
import { useAuth } from '../context/auth';
import { GetMyOrders, cencelOrder } from '../functions/products';

const Orders = () => {
  const { currentUser, isLoadingUser } = useAuth();

  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUserCart = () => {
    setIsLoading(true);
    GetMyOrders()
      .then((res) => {
        setOrders(res?.data?.orders);
      })
      .catch((err) => {
        console.log('Error > ', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const cencelOrderItem = (orderId) => {
    cencelOrder(orderId)
      ?.then((res) => {
        if (res) {
          getUserCart();
          toast?.success('Order Canceled successfully !!');
        }
      })
      .catch(() => {
        toast?.error('Failed please try again !!');
      });
  };

  useEffect(() => {
    if (currentUser && currentUser?._id && !isLoadingUser) getUserCart();
  }, [currentUser, isLoadingUser]);

  return (
    <>
      <Meta title={'My-orders'} />
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <PrivateRoute>
          <>
            {isLoading ? (
              <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                <span class="loader mx-auto"></span>
              </div>
            ) : (
              <>
                {!orders?.length && (
                  <p className="text-center fs-3">
                    You don't have ordered any products.
                  </p>
                )}
              </>
            )}

            {!isLoading && orders?.length > 0 && (
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-3">
                      <h5>Order Id</h5>
                    </div>
                    <div className="col-3">
                      <h5>Total Amount</h5>
                    </div>
                    <div className="col-2">
                      <h5>Total Amount after Discount</h5>
                    </div>
                    <div className="col-2">
                      <h5>Status</h5>
                    </div>
                    <div className="col-2">
                      <h5>Actions</h5>
                    </div>
                  </div>
                </div>

                <div className="col-12 mt-3">
                  {orders?.map((order, index) => (
                    <div
                      style={{ background: '#febd69' }}
                      key={index}
                      className="row my-3 pt-3  position-relative"
                    >
                      <div className="col-3">
                        <p>{order?._id}</p>
                      </div>
                      <div className="col-3">
                        <p>{order?.totalPrice}</p>
                      </div>
                      <div className="col-2">
                        <p>{order?.totalPriceAfterDiscount}</p>
                      </div>
                      <div className="col-2">
                        <p
                          className="badge badge-success"
                          style={{ background: '#6c757d' }}
                        >
                          {order?.orderStatus}
                        </p>
                      </div>
                      {order?.orderStatus !== 'Shipped' &&
                        order?.orderStatus !== 'Delivered' &&
                        order?.orderStatus !== 'Canceled' && (
                          <div
                            className="col-1"
                            style={{ padding: 0 }}
                            onClick={() => cencelOrderItem(order?._id)}
                          >
                            <p
                              className="btn btn-danger"
                              style={{ fontSize: 12, whiteSpace: 'normal' }}
                            >
                              Cancel Order
                            </p>
                          </div>
                        )}
                      <div className="col-1" style={{ padding: 0 }}>
                        <Link
                          className="btn btn-danger"
                          style={{ fontSize: 12, whiteSpace: 'normal' }}
                          to={`/orders/${order?._id}`}
                        >
                          Detail
                        </Link>
                      </div>
                      <div className="col-12 text-white">
                        <div
                          className="row pt-3"
                          style={{ backgroundColor: '#232f3e' }}
                        >
                          <div className="col-3">
                            <h6>Product Name</h6>
                          </div>
                          <div className="col-3">
                            <h6>Quantity</h6>
                          </div>
                          <div className="col-2">
                            <h6>Price</h6>
                          </div>
                          <div className="col-2">
                            <h6>Color</h6>
                          </div>
                          <div className="col-2"></div>

                          {order?.orderItems?.map((item, index) => (
                            <div key={index} className="col-12 text-white">
                              <div className="row pt-3 ">
                                <div className="col-3">
                                  <p>{item?.product?.title}</p>
                                </div>
                                <div className="col-3">
                                  <p>{item?.quantity}</p>
                                </div>
                                <div className="col-2">
                                  <p>{item?.price}</p>
                                </div>
                                <div className="col-2">
                                  <ul className="colors ps-0">
                                    <li
                                      style={{ background: item?.color?.title }}
                                    />
                                  </ul>
                                </div>
                                <div className="col-2"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        </PrivateRoute>
      </Container>
    </>
  );
};

export default Orders;
