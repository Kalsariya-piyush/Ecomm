import React, { useEffect, useState } from 'react';
import ReactImageZoom from 'react-image-zoom';
import ReactStars from 'react-rating-stars-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BreadCrumb from '../components/BreadCrumb';
import Color from '../components/Color';
import Container from '../components/Container';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/auth';
import {
  AddToCart,
  GetCart,
  GetProductById,
  GetProductsHandler,
  ProductRatingsHandler,
} from '../functions/products';
import watch from '../images/watch.jpg';

const SingleProduct = () => {
  const { currentUser } = useAuth();

  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const location = useLocation();
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAlreadyAdded, setIsAlreadyAdded] = useState(false);

  // loading states
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProds, setIsLoadingProds] = useState(true);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState('');

  const productId = location?.pathname?.split('/')[2];

  const getProductDataHandler = async () => {
    if (productId !== '') {
      try {
        setIsLoading(true);
        const res = await GetProductById(productId);
        setProductData(res);
        setColor(res?.color[0]);
      } catch (err) {
        console.log('Error >> ', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const copyToClipboard = (text) => {
    const textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  const closeModal = () => {};

  useEffect(() => {
    getProductDataHandler();
  }, [productId]);

  const getPopularProductsDataHandler = async () => {
    setIsLoadingProds(true);
    try {
      const res = await GetProductsHandler();
      setProducts(res);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingProds(false);
    }
  };

  const getUserCart = () => {
    setIsLoading(true);
    GetCart()
      .then((res) => {
        for (let index = 0; index < res?.data?.length; index++) {
          if (productId === res?.data[index]?.productId?._id) {
            setIsAlreadyAdded(true);
          }
        }
      })
      .catch((err) => {
        console.log('Error > ', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addToCartHandler = async () => {
    if (!isAlreadyAdded) {
      if (!currentUser && !currentUser?._id) {
        navigate('/login');
        return;
      } else if (!color) {
        toast.error('Please select product color');
        return;
      } else {
        try {
          const data = {
            productId: productData?._id,
            color: color,
            price: productData?.price,
            quantity: quantity,
          };

          const res = await AddToCart(data);
          if (res) {
            toast.success('Product added successfully to your cart!');
            getUserCart();
            setTimeout(() => {
              navigate('/cart');
            }, 400);
          }
        } catch (error) {
          toast.error('Failed Please try again');
        } finally {
        }
      }
    } else {
      navigate('/cart');
    }
  };

  const addRatings = (e) => {
    e?.preventDefault();

    if (!currentUser && !currentUser?._id) {
      navigate('/login');
      return false;
    } else if (!star) {
      toast.error('Please add star rating.');
      return false;
    } else if (!comment) {
      toast.error('Please write Review About the Product.');
      return false;
    } else {
      const data = {
        star,
        comment,
        prodId: productId,
      };

      ProductRatingsHandler(data)
        ?.then((res) => {
          if (res && res?.data) {
            toast?.success('Ratings Added Successfully.');
            window?.location?.reload();
          }
        })
        .catch(() => {
          toast?.error('Failed please try again !!');
        });
    }
  };

  useEffect(() => {
    getPopularProductsDataHandler();
    getUserCart();
  }, []);

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img:
      productData?.images?.[0]?.url ||
      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg',
  };

  return (
    <>
      <Meta title={'Product Name'} />
      <BreadCrumb title={productData?.title} />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
              {productData?.images?.map(({ url }) => (
                <div key={url}>
                  <img
                    src={
                      url ||
                      'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?cs=srgb&dl=pexels-fernando-arcos-190819.jpg&fm=jpg'
                    }
                    className="img-fluid"
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">{productData?.title}</h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">$ {productData?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  {productData?.totalrating && (
                    <ReactStars
                      count={5}
                      size={24}
                      value={Number(productData?.totalrating)}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  )}
                  {productData?.ratings?.length > 0 && (
                    <p className="mb-0 t-review">
                      ( {productData?.ratings?.length} Reviews )
                    </p>
                  )}
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Watch</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{productData?.brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{productData?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Tags :</h3>
                  <p className="product-data">{productData?.tags}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data badge bg-secondary">In Stock</p>
                </div>

                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      S
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      M
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XL
                    </span>
                    <span className="badge border border-1 bg-white text-dark border-secondary">
                      XXL
                    </span>
                  </div>
                </div> */}

                {!isAlreadyAdded && (
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    <h3 className="product-heading">Color :</h3>
                    <Color
                      color={productData?.color}
                      setColor={setColor}
                      selectedColor={color}
                    />
                  </div>
                )}

                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {!isAlreadyAdded && (
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center gap-15">
                        <h3 className="product-heading">Quantity :</h3>
                        <div className="">
                          <input
                            type="number"
                            name=""
                            min={1}
                            max={productData?.quantity}
                            className="form-control"
                            style={{ width: '70px' }}
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            onBlur={(e) => {
                              if (e?.target?.value < 1) e.target.value = 1;
                              if (e?.target?.value > productData?.quantity)
                                e.target.value = productData?.quantity;
                            }}
                          />
                        </div>
                      </div>
                      {/* {quantity &&
                        productData?.quantity &&
                        quantity > productData?.quantity && (
                          <p className="text-danger">
                            you can only {productData?.quantity} quantity add{' '}
                          </p>
                        )} */}
                    </div>
                  )}
                  <div
                    className={`d-flex align-items-center gap-30 ${
                      !isAlreadyAdded ? 'ms-5' : ''
                    }`}
                  >
                    <button
                      className="button border-0"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() => addToCartHandler()}
                    >
                      {!isAlreadyAdded ? 'Add to Cart' : 'Go To Cart'}
                    </button>
                    {/* <button className="button signup">Buy It Now</button> */}
                  </div>
                </div>
                {/* <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <TbGitCompare className="fs-5 me-2" /> Add to Compare
                    </a>
                  </div>
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div> */}
                <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div>
                <div className="d-flex gap-10 align-items-center my-3">
                  <h3 className="product-heading">Product Link:</h3>
                  <a
                    href="javascript:void(0);"
                    onClick={() => {
                      copyToClipboard(window?.location?.href);
                    }}
                  >
                    Copy Product Link
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p
                dangerouslySetInnerHTML={{ __html: productData?.description }}
              />
            </div>
          </div>
        </div>
      </Container>

      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <h4 className="mb-2">Customer Reviews</h4>
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                <form
                  onSubmit={addRatings}
                  className="d-flex flex-column gap-15"
                >
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={star}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(rate) => setStar(rate)}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      value={comment}
                      onChange={(e) => setComment(e?.target?.value)}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="button border-0">Submit Review</button>
                  </div>
                </form>
              </div>
              <div className="reviews mt-4">
                {productData?.ratings &&
                  productData?.ratings?.length > 0 &&
                  productData?.ratings?.map((rating) => (
                    <div key={rating?._id} className="review">
                      <div className="d-flex gap-10 align-items-center">
                        <ReactStars
                          count={5}
                          size={24}
                          value={rating?.star}
                          edit={false}
                          activeColor="#ffd700"
                        />
                      </div>
                      <p className="mt-3">{rating?.comment}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard
            data={products
              ?.filter((item) => item?.tags === 'popular')
              ?.slice(0, 4)}
          />
        </div>
      </Container>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={watch} className="img-fluid" alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Apple Watch</h6>
                  <p className="mb-1">Quantity: asgfd</p>
                  <p className="mb-1">Color: asgfd</p>
                  <p className="mb-1">Size: asgfd</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              <button type="button" className="button signup">
                Checkout
              </button>
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
