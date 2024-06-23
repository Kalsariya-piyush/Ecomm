import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useLocation } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';
import SpecialProduct from '../components/SpecialProduct';
import { GetBlogsHandler } from '../functions/blogs';
import { GetProductsHandler } from '../functions/products';
// import { services } from "../utils/Data";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState(null);
  let location = useLocation();

  // loading states
  const [isLoadingProds, setIsLoadingProds] = useState(true);
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true);

  const getProductDataHandler = async () => {
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

  const getBlogsDataHandler = async () => {
    try {
      setIsLoadingBlogs(true);
      const res = await GetBlogsHandler();
      setBlogs(res);
    } catch (err) {
      console.log('Error >> ', err);
    } finally {
      setIsLoadingBlogs(false);
    }
  };

  useEffect(() => {
    getProductDataHandler();
    getBlogsDataHandler();
  }, []);

  console.log('products', products);

  return (
    <>
      {/* <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative ">
              <img
                src="images/main-banner-1.jpg"
                className="img-fluid rounded-3"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>

                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo.</p>
                <Link className="button" to={'/product'}>
                  s
                </Link>

                <Link to={'/product'} className="button">
                  BUY NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <Link
                  to={`${
                    location.pathname === '/'
                      ? `/product/${products[1]?._id}`
                      : location.pathname === `/product/${products[1]?._id}`
                      ? `/product/${products[1]?._id}`
                      : `${products[1]?._id}`
                  }`}
                  className="w-100"
                >
                  <img
                    src="images/catbanner-01.jpg"
                    className="img-fluid rounded-3 w-100"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>NEW ARRIVAL</h4>
                    <h5>{products[1]?.title}</h5>
                    <p>
                      From $999.00 <br /> or ${products[1]?.price}/mo.
                    </p>
                  </div>
                </Link>
              </div>
              <div className="small-banner position-relative">
                <Link
                  to={`${
                    location.pathname === '/'
                      ? `/product/${products[2]?._id}`
                      : location.pathname === `/product/${products[2]?._id}`
                      ? `/product/${products[2]?._id}`
                      : `${products[2]?._id}`
                  }`}
                  className="w-100"
                >
                  <img
                    src="images/catbanner-02.jpg"
                    className="img-fluid rounded-3 w-100"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sake</h4>
                    <h5>{products[2]?.title}</h5>
                    <p>
                      From $999.00 <br /> or ${products[2]?.price}/mo.
                    </p>
                  </div>
                </Link>
              </div>
              <div className="small-banner position-relative">
                <Link
                  to={`${
                    location.pathname === '/'
                      ? `/product/${products[3]?._id}`
                      : location.pathname === `/product/${products[3]?._id}`
                      ? `/product/${products[3]?._id}`
                      : `${products[3]?._id}`
                  }`}
                  className="w-100"
                >
                  <img
                    src="images/catbanner-03.jpg"
                    className="img-fluid rounded-3 w-100"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sake</h4>
                    <h5>{products[3]?.title}</h5>
                    <p>
                      From $999.00 <br /> or ${products[3]?.price}/mo.
                    </p>
                  </div>
                </Link>
              </div>
              <div className="small-banner position-relative">
                <Link
                  to={`${
                    location.pathname === '/'
                      ? `/product/${products[4]?._id}`
                      : location.pathname === `/product/${products[4]?._id}`
                      ? `/product/${products[4]?._id}`
                      : `${products[4]?._id}`
                  }`}
                  className="w-100"
                >
                  <img
                    src="images/catbanner-04.jpg"
                    className="img-fluid rounded-3 w-100"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>Best Sake</h4>
                    <h5>{products[4]?.title}</h5>
                    <p>
                      From $999.00 <br /> or ${products[4]?.price}/mo.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            {/* <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div> */}
          </div>
        </div>
      </Container>
      {/* <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex justify-content-between flex-wrap align-items-center">
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Music & Gaming</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Cameras</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="camera" />
              </div>
              <div className="d-flex gap align-items-center">
                <div>
                  <h6>Smart Watches</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="camera" />
              </div>
            </div>
          </div>
        </div>
      </Container> */}
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>

          <ProductCard
            data={products?.filter((item) => item?.tags === 'featured')}
          />
        </div>
      </Container>

      {/* <Container class1="famous-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-1.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5>Big Screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From $399or $16.62/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-2.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Studio Display</h5>
                <h6 className="text-dark">600 nits of brightness.</h6>
                <p className="text-dark">27-inch 5K Retina display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">smartphones</h5>
                <h6 className="text-dark">Smartphone 13 Pro.</h6>
                <p className="text-dark">
                  Now in Green. From $999.00 or $41.62/mo. for 24 mo. Footnote*
                </p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="images/famous-3.webp"
                className="img-fluid"
                alt="famous"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">home speakers</h5>
                <h6 className="text-dark">Room-filling sound.</h6>
                <p className="text-dark">
                  From $699 or $116.58/mo. for 12 mo.*
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      <Container class1="special-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
        </div>
        <div className="row">
          {products?.length > 0 &&
            products
              ?.filter((item) => item?.tags === 'special')
              ?.map((sProd) => (
                <SpecialProduct
                  key={sProd?._id}
                  id={sProd?._id}
                  title={sProd?.title}
                  brand={sProd?.brand}
                  totalRatings={sProd?.totalrating}
                  price={sProd?.price}
                  sold={sProd?.sold}
                  quantity={sProd?.quantity}
                  image={sProd?.images[0]?.url}
                />
              ))}
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
            data={products?.filter((item) => item?.tags === 'popular')}
          />
        </div>
      </Container>

      <Container class1="marque-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
                <div className="mx-4 w-25">
                  <img src="images/brand-01.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-02.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-03.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-04.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-05.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-06.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-07.png" alt="brand" />
                </div>
                <div className="mx-4 w-25">
                  <img src="images/brand-08.png" alt="brand" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          {!isLoadingBlogs &&
            blogs &&
            blogs?.length > 0 &&
            blogs.slice(0, 4)?.map((blog) => (
              <div key={blog?._id} className="col-3">
                <BlogCard data={blog} />
              </div>
            ))}
        </div>
      </Container>
    </>
  );
};

export default Home;
