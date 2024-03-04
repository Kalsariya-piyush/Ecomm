import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';
import { AddToWishList } from '../functions/products';
import addcart from '../images/add-cart.svg';
import prodcompare from '../images/prodcompare.svg';
import view from '../images/view.svg';
import wish from '../images/wish.svg';

const ProductCard = (props) => {
  const { grid, data } = props;

  let location = useLocation();

  const addToWishList = async (pid) => {
    try {
      await AddToWishList({ prodId: pid });
    } catch (err) {
      console.log('err > ', err);
    } finally {
    }
  };

  return (
    <>
      {data?.map((prod) => (
        <div
          className={` ${
            location.pathname === '/product' ? `gr-${grid}` : 'col-3'
          } `}
          key={prod?._id}
        >
          <div className="product-card position-relative">
            <div className="wishlist-icon position-absolute">
              <button
                onClick={() => addToWishList(prod?._id)}
                className="border-0 bg-transparent"
              >
                <img src={wish} alt="wishlist" />
              </button>
            </div>

            <Link
              to={`${
                location.pathname === '/'
                  ? `/product/${prod?._id}`
                  : location.pathname === `/product/${prod?._id}`
                  ? `/product/${prod?._id}`
                  : `${prod?._id}`
              }`}
              key={prod?.id}
            >
              <div className="product-image">
                {prod?.images?.slice(0, 2)?.map((img) => (
                  <img
                    src={img?.url || ''}
                    className="img-fluid"
                    alt="product image"
                    key={img?.publicId}
                  />
                ))}
              </div>

              <div className="product-details">
                <h6 className="brand">{prod?.brand}</h6>
                <h5 className="product-title">{prod?.title}</h5>
                <ReactStars
                  count={5}
                  size={24}
                  value={prod?.totalRating?.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? 'd-block' : 'd-none'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: prod?.description,
                  }}
                ></p>
                <p className="price">${prod?.price}</p>
              </div>
            </Link>

            <div
              style={{ zIndex: 1000 }}
              className="action-bar position-absolute"
            >
              <div className="d-flex flex-column gap-15">
                <button className="border-0 bg-transparent">
                  <img src={prodcompare} alt="compare" />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={view} alt="view" />
                </button>
                <button className="border-0 bg-transparent">
                  <img src={addcart} alt="addcart" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
