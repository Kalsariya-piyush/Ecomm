import { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Meta from '../components/Meta';
import { useAuth } from '../context/auth';
import { GetMyOrders } from '../functions/products';

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

  useEffect(() => {
    if (currentUser && currentUser?._id && !isLoadingUser) getUserCart();
  }, [currentUser, isLoadingUser]);

  return (
    <>
      <Meta title={'My-orders'} />
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        {isLoading && !orders ? (
          <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
            <span class="loader mx-auto"></span>
          </div>
        ) : (
          <>{!orders && <p className="text-center fs-3">No data</p>}</>
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
                <div className="col-3">
                  <h5>Total Amount after Discount</h5>
                </div>
                <div className="col-3">
                  <h5>Status</h5>
                </div>
              </div>
            </div>

            <div className="col-12 mt-3">
              {orders?.map((order, index) => (
                <div
                  style={{ background: '#febd69' }}
                  key={index}
                  className="row my-3 pt-3"
                >
                  <div className="col-3">
                    <p>{order?._id}</p>
                  </div>
                  <div className="col-3">
                    <p>{order?.totalPrice}</p>
                  </div>
                  <div className="col-3">
                    <p>{order?.totalPriceAfterDiscount}</p>
                  </div>
                  <div className="col-3">
                    <p>{order?.orderStatus}</p>
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
                      <div className="col-3">
                        <h6>Price</h6>
                      </div>
                      <div className="col-3">
                        <h6>Color</h6>
                      </div>
                      {order?.orderItems?.map((item, index) => (
                        <div key={index} className="col-12 text-white">
                          <div className="row pt-3 ">
                            <div className="col-3">
                              <p>{item?.product?.title}</p>
                            </div>
                            <div className="col-3">
                              <p>{item?.quantity}</p>
                            </div>
                            <div className="col-3">
                              <p>{item?.price}</p>
                            </div>
                            <div className="col-3">
                              <ul className="colors ps-0">
                                <li
                                  style={{ background: item?.color?.title }}
                                />
                              </ul>
                            </div>
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
      </Container>
    </>
  );
};

export default Orders;
