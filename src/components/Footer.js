import React from 'react';
import { BsGithub, BsInstagram, BsLinkedin, BsYoutube } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import newsletter from '../images/newsletter.png';
const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src={newsletter} alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            {/* <div className="col-7">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div> */}
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Office : 308, Shivalik dabholi, <br /> surat, gujarat <br />
                  PinCode: 395004
                </address>
                <a
                  href="tel:+91 7698026049"
                  className="mt-3 d-block mb-1 text-white"
                >
                  +91 999999999
                </a>
                <a
                  href="mailto:clicon@gmail.com"
                  className="mt-2 d-block mb-0 text-white"
                >
                  clicon@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="#">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsGithub className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsYoutube className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-link d-flex flex-column">
                <Link to="/product" className="text-white py-2 mb-1">
                  Our store
                </Link>
                <Link to="/wishlist" className="text-white py-2 mb-1">
                  Wishlist
                </Link>
                <Link to={'/blogs'} className="text-white py-2 mb-1">
                  Blogs
                </Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link to={'/profile'} className="text-white py-2 mb-1">
                  Profile
                </Link>
                <Link to={'/contact'} className="text-white py-2 mb-1">
                  Contact
                </Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-link d-flex flex-column">
                <Link to={'/product'} className="text-white py-2 mb-1">
                  Laptops
                </Link>
                <Link to={'/product'} className="text-white py-2 mb-1">
                  Headphones
                </Link>
                <Link to={'/product'} className="text-white py-2 mb-1">
                  Tablets
                </Link>
                <Link to={'/product'} className="text-white py-2 mb-1">
                  Watch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}, Powered by clicon
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
