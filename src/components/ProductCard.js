import React, { useEffect, useState } from 'react';
import { CiHeart } from 'react-icons/ci';
import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/auth';
import { AddToWishList, GetWishList } from '../functions/products';
import view from '../images/view.svg';

const ProductCard = (props) => {
  const { grid, data } = props;
  const { isLoadingUser } = useAuth();

  const [wishListData, setWishListData] = useState(null);

  let location = useLocation();

  const getWishList = async () => {
    try {
      const res = await GetWishList();
      setWishListData(res);
    } catch (err) {
      console.log('error > ', err);
    } finally {
    }
  };

  const addToWishList = async (pid) => {
    try {
      await AddToWishList({ prodId: pid });
      getWishList();
      toast.success('Product added to wishlist.');
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    if (!isLoadingUser) getWishList();
  }, [isLoadingUser]);

  // if (data && wishListData) {
  //   data?.forEach((product) => {
  //     wishListData?.wishlist?.forEach((p) => {
  //       if (p?._id === product?._id) {
  //         product.isFav = true;
  //       } else {
  //         product.isFav = false;
  //       }
  //     });
  //   });
  // }

  return (
    <>
      {data?.map((prod) => (
        <div
          className={` ${
            location.pathname === '/product' ? `gr-${grid}` : 'col-3'
          } `}
          key={prod?._id}
          style={{
            height: '100%',
            marginBottom: '20px',
          }}
        >
          {/* {console.log('prod > ', prod)} */}
          <div
            style={{
              height: '100%',
            }}
            className="product-card position-relative"
          >
            {console.log('prod?.isFav', prod?.isFav)}
            <div className="wishlist-icon position-absolute">
              <button
                onClick={() => addToWishList(prod?._id)}
                className="border-0 bg-transparent"
              >
                {/* {!prod?.isFav && <img src={wish} alt="wishlist" />} */}
                <CiHeart
                  style={{
                    fontSize: 20,
                    color: prod?.isFav ? 'red' : 'black',
                  }}
                />
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
              style={{
                display: grid === 12 ? 'flex' : '',
                gap: grid === 12 ? '14px' : '',
              }}
            >
              <div className="product-image">
                {prod?.images?.slice(0, 2)?.map((img) => (
                  <img
                    src={img?.url || ''}
                    className="img-fluid"
                    alt="product image"
                    key={img?.publicId}
                    style={{
                      width: grid * 100,
                      height: '250px',
                      margin: '0 auto',
                      aspectRatio: '1/1',
                      minWidth: '200px',
                    }}
                  />
                ))}
              </div>

              <div className="product-details">
                <h6 className="brand">{prod?.brand}</h6>
                <h5 className="product-title">{prod?.title}</h5>
                {prod?.totalrating && (
                  <ReactStars
                    count={5}
                    size={24}
                    value={Number(prod.totalrating)}
                    edit={false}
                    activeColor="#ffd700"
                  />
                )}
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
                {/* <button className="border-0 bg-transparent">
                  <img src={prodcompare} alt="compare" />
                </button> */}
                <Link
                  to={`${
                    location.pathname === '/'
                      ? `/product/${prod?._id}`
                      : location.pathname === `/product/${prod?._id}`
                      ? `/product/${prod?._id}`
                      : `${prod?._id}`
                  }`}
                  className="border-0 bg-transparent"
                >
                  <img src={view} alt="view" />
                </Link>
                {/* <button className="border-0 bg-transparent">
                  <img src={addcart} alt="addcart" />
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
