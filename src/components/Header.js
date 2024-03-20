import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import cart from '../images/cart.svg';
import user from '../images/user.svg';
import wishlist from '../images/wishlist.svg';

const Header = () => {
  const { currentUser, isLoadingUser, LogoutHandler, cartItem, totalAmount } =
    useAuth();

  const navigate = useNavigate();

  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link className="text-white">
                  <svg
                    width="177"
                    height="48"
                    viewBox="0 0 177 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24ZM36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24ZM24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z"
                      fill="white"
                    ></path>
                    <path
                      d="M68.016 12.544C69.7547 12.544 71.3013 12.896 72.656 13.6C74.0213 14.2933 75.12 15.2427 75.952 16.448C76.7947 17.6533 77.2907 19.0133 77.44 20.528H72.544C72.3947 19.728 72.1227 19.0187 71.728 18.4C71.3333 17.7707 70.816 17.28 70.176 16.928C69.536 16.5653 68.768 16.384 67.872 16.384C66.7947 16.384 65.8667 16.6453 65.088 17.168C64.3093 17.6907 63.712 18.5333 63.296 19.696C62.88 20.8587 62.672 22.3947 62.672 24.304C62.672 27.184 63.1307 29.2693 64.048 30.56C64.976 31.84 66.2507 32.48 67.872 32.48C68.768 32.48 69.536 32.2773 70.176 31.872C70.816 31.456 71.3333 30.912 71.728 30.24C72.1227 29.5573 72.3947 28.8107 72.544 28H77.44C77.3013 29.0987 77.0347 30.1493 76.64 31.152C76.2453 32.144 75.6853 33.0293 74.96 33.808C74.2347 34.5867 73.3013 35.2 72.16 35.648C71.0187 36.096 69.6373 36.32 68.016 36.32C65.8613 36.32 64 35.8187 62.432 34.816C60.864 33.8133 59.6533 32.4053 58.8 30.592C57.9573 28.7787 57.536 26.6613 57.536 24.24C57.536 21.808 57.9573 19.7227 58.8 17.984C59.6427 16.2347 60.848 14.8907 62.416 13.952C63.984 13.0133 65.8507 12.544 68.016 12.544ZM80.9208 12.864H85.6248V32.048H95.6728V36H80.9208V12.864ZM98.7495 12.864H103.406V36H98.7495V12.864ZM117.377 12.544C119.116 12.544 120.663 12.896 122.017 13.6C123.383 14.2933 124.481 15.2427 125.313 16.448C126.156 17.6533 126.652 19.0133 126.801 20.528H121.905C121.756 19.728 121.484 19.0187 121.089 18.4C120.695 17.7707 120.177 17.28 119.537 16.928C118.897 16.5653 118.129 16.384 117.233 16.384C116.156 16.384 115.228 16.6453 114.449 17.168C113.671 17.6907 113.073 18.5333 112.657 19.696C112.241 20.8587 112.033 22.3947 112.033 24.304C112.033 27.184 112.492 29.2693 113.409 30.56C114.337 31.84 115.612 32.48 117.233 32.48C118.129 32.48 118.897 32.2773 119.537 31.872C120.177 31.456 120.695 30.912 121.089 30.24C121.484 29.5573 121.756 28.8107 121.905 28H126.801C126.663 29.0987 126.396 30.1493 126.001 31.152C125.607 32.144 125.047 33.0293 124.321 33.808C123.596 34.5867 122.663 35.2 121.521 35.648C120.38 36.096 118.999 36.32 117.377 36.32C115.223 36.32 113.361 35.8187 111.793 34.816C110.225 33.8133 109.015 32.4053 108.161 30.592C107.319 28.7787 106.897 26.6613 106.897 24.24C106.897 21.808 107.319 19.7227 108.161 17.984C109.004 16.2347 110.209 14.8907 111.777 13.952C113.345 13.0133 115.212 12.544 117.377 12.544ZM139.898 36.32C137.711 36.32 135.818 35.8453 134.218 34.896C132.629 33.936 131.397 32.576 130.522 30.816C129.658 29.0453 129.226 26.9333 129.226 24.48C129.226 22.016 129.663 19.8933 130.538 18.112C131.423 16.3307 132.666 14.96 134.266 14C135.866 13.0293 137.743 12.544 139.898 12.544C142.042 12.544 143.909 13.024 145.498 13.984C147.087 14.944 148.314 16.3147 149.178 18.096C150.053 19.8773 150.49 22.0053 150.49 24.48C150.49 26.9227 150.058 29.0293 149.194 30.8C148.341 32.5707 147.119 33.936 145.53 34.896C143.941 35.8453 142.063 36.32 139.898 36.32ZM139.898 32.48C141.029 32.48 142.005 32.2133 142.826 31.68C143.658 31.136 144.298 30.2827 144.746 29.12C145.194 27.9467 145.418 26.4213 145.418 24.544C145.418 22.6133 145.189 21.0507 144.73 19.856C144.282 18.6613 143.642 17.7867 142.81 17.232C141.989 16.6667 141.018 16.384 139.898 16.384C138.778 16.384 137.802 16.6667 136.97 17.232C136.138 17.7867 135.493 18.6667 135.034 19.872C134.575 21.0667 134.346 22.624 134.346 24.544C134.346 26.432 134.575 27.9573 135.034 29.12C135.493 30.2827 136.138 31.136 136.97 31.68C137.802 32.2133 138.778 32.48 139.898 32.48ZM169.17 12.864H173.842V36H169.634L158.642 20.08V36H153.986V12.864H158.61L169.17 28.176V12.864Z"
                      fill="white"
                    ></path>
                  </svg>
                </Link>
              </h2>
            </div>
            <div className="col-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-2"
                  placeholder="Search Product Here..."
                  aria-label="Search Product Here..."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-4">
              <div className="header-upper-links d-flex align-items-center justify-content-between">
                {/* <div>
                  <Link
                    to="/compare-product"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={compare} alt="compare" />
                    <p className="mb-0">
                      Compare <br /> Products
                    </p>
                  </Link>
                </div> */}
                <div>
                  <Link
                    to="/wishlist"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={wishlist} alt="wishlist" />
                    <p className="mb-0">
                      Favourite <br /> wishlist
                    </p>
                  </Link>
                </div>
                <div>
                  {!isLoadingUser && (
                    <>
                      {currentUser ? (
                        <div
                          onClick={() => navigate('/profile')}
                          className="d-flex align-items-center gap-10 text-white cursor-pointer"
                          style={{
                            cursor: 'pointer',
                          }}
                        >
                          <img src={user} alt="user" />
                          <p className="mb-0">
                            {currentUser?.firstname} {currentUser?.lastname}{' '}
                            <br /> My Account
                          </p>
                        </div>
                      ) : (
                        <Link
                          to="/login"
                          className="d-flex align-items-center gap-10 text-white"
                        >
                          <img src={user} alt="user" />
                          <p className="mb-0">Log in</p>
                        </Link>
                      )}
                    </>
                  )}
                </div>
                <div>
                  <Link
                    to="/cart"
                    className="d-flex align-items-center gap-10 text-white"
                  >
                    <img src={cart} alt="cart" />
                    <div className="d-flex flex-column gap-10">
                      <span className="badge bg-white text-dark">
                        {cartItem.length}
                      </span>
                      {totalAmount && <p className="mb-0">$ {totalAmount}</p>}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center justify-content-center gap-30">
                {/* <div>
                  <div className="dropdown">
                    <button
                      className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={menu} alt="" />
                      <span className="me-5 d-inline-block">
                        Shop Categories
                      </span>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Another action
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item text-white" to="">
                          Something else here
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div> */}
                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/product">Our Store</NavLink>
                    <NavLink to="/my-orders">My Orders</NavLink>
                    <NavLink to="/blogs">Blogs</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    {!isLoadingUser && (
                      <>
                        {currentUser && (
                          <button
                            onClick={() => LogoutHandler()}
                            className="border-0 bg-transparent text-white"
                          >
                            LOG OUT
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
