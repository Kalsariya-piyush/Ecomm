import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Meta from '../components/Meta';
import { AddToWishList, GetWishList } from '../functions/products';
import PrivateRoute from '../components/PrivateRoute';

const Wishlist = () => {
  const [wishListData, setWishListData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getWishList = async () => {
    try {
      setIsLoading(true);
      const res = await GetWishList();
      setWishListData(res);
    } catch (err) {
      console.log('error > ', err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishList = async (pid) => {
    try {
      await AddToWishList({ prodId: pid });
    } catch (err) {
      console.log('err > ', err);
    } finally {
      getWishList();
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  return (
    <>
      <Meta title={'Wishlist'} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <PrivateRoute>
          <div className="row">
            {!wishListData?.wishlist?.length && !isLoading && (
              <p className="text-center fs-3">No data</p>
            )}

            {!isLoading &&
              wishListData?.wishlist &&
              wishListData?.wishlist?.map((item, idx) => (
                <div key={idx} className="col-3">
                  <div className="wishlist-card position-relative">
                    <img
                      src="images/cross.svg"
                      alt="cross"
                      className="position-absolute cross img-fluid"
                      onClick={() => removeFromWishList(item?._id)}
                    />
                    <div className="wishlist-card-image">
                      <img
                        src={item?.images[0]?.url}
                        className="img-fluid w-100"
                        alt="watch"
                        width={160}
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
        </PrivateRoute>
      </Container>
    </>
  );
};

export default Wishlist;
