import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Meta from '../components/Meta';
import ProductCard from '../components/ProductCard';
import { GetProductsHandler } from '../functions/products';

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const [products, setProducts] = useState([]);

  const [brands, setBrands] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [tags, setTags] = useState([]);

  // filter states
  const [selectedCat, setSelectedCategory] = useState('');
  const [tag, setTag] = useState('');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  // const getBrandHandler = async () => {
  //   setIsLoading(true);
  //   const res = await GetAllBrands();
  //   setBrands(res.data);
  //   setIsLoading(false);
  // };

  // const getCategoryHandler = async () => {
  //   setIsLoading(true);
  //   const res = await GetAllCategories();
  //   setCategorys(res.data);
  //   setIsLoading(false);
  // };

  const getProductDataHandler = async (
    selectedCat,
    brand,
    tag,
    sort,
    maxPrice,
    minPrice
  ) => {
    setIsLoading(true);
    const res = await GetProductsHandler(
      selectedCat,
      brand,
      tag,
      sort,
      maxPrice,
      minPrice
    );
    setProducts(res);
    setIsLoading(false);
  };

  useEffect(() => {
    // getBrandHandler();
    getProductDataHandler(selectedCat, brand, tag, sort, maxPrice, minPrice);
    // getCategoryHandler();
  }, [selectedCat, brand, tag, sort, maxPrice, minPrice]);

  useEffect(() => {
    let newBrands = [];
    let category = [];
    let newTags = [];
    for (let index = 0; index < products.length; index++) {
      const element = products[index];
      if (!newBrands?.includes(element.brand)) {
        newBrands.push(element.brand);
      }
      if (!category?.includes(element.category)) {
        category.push(element.category);
      }
      if (!newTags?.includes(element.tags)) {
        newTags.push(element.tags);
      }
    }

    setBrands(newBrands);
    setCategorys(category);
    setTags(newTags);
  }, [products]);

  return (
    <>
      <Meta title={'Our Store'} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                {categorys.map((item, index) => (
                  <ul key={item} className="ps-0">
                    <li onClick={() => setSelectedCategory(item)}>{item}</li>
                  </ul>
                ))}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                {/* <h5 className="sub-title">Availablity</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock (1)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock(0)
                    </label>
                  </div>
                </div> */}
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                      value={minPrice}
                      min={0}
                      max={maxPrice}
                      onChange={(e) => setMinPrice(e?.target?.value)}
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                      min={minPrice}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e?.target?.value)}
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                {/* <h5 className="sub-title">Colors</h5>
                <div>
                  <Color />
                </div> */}
                {/* <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      M (2)
                    </label>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tags</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {tags.map((item, index) => (
                    <span
                      key={index}
                      onClick={() => setTag(item)}
                      className="badge bg-light text-secondary rounded-3 py-2 px-3"
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                  {brands.map((item, index) => (
                    <span
                      key={index}
                      onClick={() => setBrand(item)}
                      className="badge bg-light text-secondary rounded-3 py-2 px-3"
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="filter-card mb-3">
              <h3 className="filter-title">Random Product</h3>
              <div>
                <div className="random-products mb-3 d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
                <div className="random-products d-flex">
                  <div className="w-50">
                    <img
                      src="images/watch.jpg"
                      className="img-fluid"
                      alt="watch"
                    />
                  </div>
                  <div className="w-50">
                    <h5>
                      Kids headphones bulk 10 pack multi colored for students
                    </h5>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <b>$ 300</b>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="col-9">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: '100px' }}>
                    Sort By:
                  </p>
                  <select
                    name=""
                    defaultValue={'manula'}
                    className="form-control form-select"
                    id=""
                    onChange={(e) => setSort(e?.target?.value)}
                  >
                    <option value="title">Alphabetically, A-Z</option>
                    <option value="-title">Alphabetically, Z-A</option>
                    <option value="price">Price, low to high</option>
                    <option value="-price">Price, high to low</option>
                    <option value="createdAt">Date, old to new</option>
                    <option value="-createdAt">Date, new to old</option>
                  </select>
                </div>
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">
                    {products?.length} Product{products?.length > 1 ? 's' : ''}
                  </p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="/images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="/images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="/images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="/images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="products-list pb-5">
              <div
                className="d-flex gap-10 flex-wrap"
                style={{
                  height: '100%',
                }}
              >
                <ProductCard grid={grid} data={products} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
