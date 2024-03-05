import React, { useEffect, useState } from 'react';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Meta from '../components/Meta';
import { GetBlogById } from '../functions/blogs';
import blog from '../images/blog-1.jpg';

const SingleBlog = () => {
  const location = useLocation();

  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const blogId = location?.pathname?.split('/')[2];

  const getBlogDataHandler = async () => {
    if (blogId !== '') {
      try {
        setIsLoading(true);
        const res = await GetBlogById(blogId);
        setBlogData(res);
      } catch (err) {
        console.log('Error >> ', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getBlogDataHandler();
  }, [blogId]);

  return (
    <>
      <Meta title={blogData?.title || ''} />
      <BreadCrumb title={blogData?.title || ''} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>

              {!isLoading && !blogData && (
                <p className="text-center fs-3">No data</p>
              )}

              {!isLoading && blogData && (
                <>
                  <h3 className="title">{blogData?.title}</h3>

                  <img
                    src={blogData?.images[0]?.url || blog}
                    className="img-fluid w-100 my-4"
                    alt="blog"
                  />

                  <p
                    dangerouslySetInnerHTML={{ __html: blogData?.description }}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
