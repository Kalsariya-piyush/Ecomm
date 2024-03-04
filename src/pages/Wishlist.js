import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Meta from '../components/Meta';
import { GetWishList } from '../functions/products';

const Wishlist = () => {
  const [wishListData, setWishListData] = useState(null);

  const getWishList = async () => {
    try {
      const res = await GetWishList();
      setWishListData(res);
    } catch (err) {
      console.log('error > ', err);
    } finally {
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  console.log('wishListData > ');

  return (
    <>
      <Meta title={'Wishlist'} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          {wishListData?.wishlist &&
            wishListData?.wishlist?.map((item, idx) => (
              <div key={idx} className="col-3">
                <div className="wishlist-card position-relative">
                  <img
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-card-image">
                    <img
                      src={item?.images[0]?.url}
                      className="img-fluid w-100"
                      alt="watch"
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">{item?.title}</h5>
                    <h6 className="price">$ {item?.price}</h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </>
  );
};

export default Wishlist;
