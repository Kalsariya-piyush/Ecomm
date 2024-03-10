import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Meta from '../components/Meta';
import { useAuth } from '../context/auth';
import { GetCart, RemoveCartProduct } from '../functions/products';

const Cart = () => {
  const { currentUser, isLoadingUser } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [cartItem, setCartItem] = useState([]);

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

  const deleteProductFromCart = (cartId) => {
    RemoveCartProduct(cartId)
      ?.then((res) => {
        if (res) {
          getUserCart();
          toast?.success('Product deleted from cart successfully !!');
        }
      })
      .catch(() => {
        toast?.error('Failed please try again !!');
      });
  };

  useEffect(() => {
    if (currentUser && currentUser?._id && !isLoadingUser) getUserCart();
  }, [currentUser, isLoadingUser]);

  useEffect(() => {
    const total = cartItem?.reduce((acc, item) => {
      return acc + item?.productId?.price * item?.quantity;
    }, 0);
    setTotalAmount(total);
  }, [cartItem]);

  return (
    <>
      <Meta title={'Cart'} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="cart-header py-3 d-flex justify-content-between align-items-center">
              <h4 className="cart-col-1">Product</h4>
              <h4 className="cart-col-2">Price</h4>
              <h4 className="cart-col-3">Quantity</h4>
              <h4 className="cart-col-4">Total</h4>
            </div>
            {isLoading && (
              <div className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center">
                <span class="loader mx-auto"></span>
              </div>
            )}
            {cartItem &&
              cartItem?.length > 0 &&
              !isLoading &&
              cartItem?.map((item, index) => (
                <div
                  className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                  key={index}
                >
                  <div className="cart-col-1 gap-15 d-flex align-items-center">
                    <div className="w-25">
                      <img
                        src={item?.productId?.images[0]?.url}
                        className="img-fluid"
                        alt="product image"
                      />
                    </div>
                    <div className="w-75">
                      <p>{item?.productId?.title}</p>
                      <p className="d-flex gap-3">
                        Color:
                        <ul className="colors ps-0">
                          <li style={{ background: item?.color?.title }} />
                        </ul>
                      </p>
                    </div>
                  </div>
                  <div className="cart-col-2">
                    <h5 className="price">$ {item?.productId?.price}</h5>
                  </div>
                  <div className="cart-col-3 d-flex align-items-center gap-15">
                    <div className=" w-25">
                      {/* <input
                        className="form-control"
                        type="number"
                        name=""
                        min={1}
                        max={10}
                        id=""
                        value={item?.quantity}
                      /> */}
                      {item?.quantity}
                    </div>
                    <div onClick={() => deleteProductFromCart(item?._id)}>
                      <AiFillDelete className="text-danger " />
                    </div>
                  </div>
                  <div className="cart-col-4">
                    <h5 className="price">
                      $ {item?.productId?.price * item?.quantity}
                    </h5>
                  </div>
                </div>
              ))}

            {!cartItem?.length && !isLoading && (
              <p className="text-center fs-4" style={{ marginTop: 20 }}>
                No Products in your cart
              </p>
            )}
          </div>
          {cartItem && cartItem?.length > 0 && (
            <div className="col-12 py-2 mt-4">
              <div className="d-flex justify-content-between align-items-baseline">
                <Link to="/product" className="button">
                  Continue To Shopping
                </Link>
                <div className="d-flex flex-column align-items-end">
                  <h4>SubTotal: $ {totalAmount}</h4>
                  <p>Taxes and shipping calculated at checkout</p>
                  <Link to="/checkout" className="button">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Cart;
