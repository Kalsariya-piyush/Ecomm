import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import Meta from '../components/Meta';
import { GetBlogsHandler } from '../functions/blogs';

const Blog = () => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getBlogsDataHandler = async () => {
    try {
      setIsLoading(true);
      const res = await GetBlogsHandler();
      setBlogs(res);
    } catch (err) {
      console.log('Error >> ', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlogsDataHandler();
  }, []);

  return (
    <>
      <Meta title={'Blogs'} />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Find By Categories</h3>
              <div>
                <ul className="ps-0">
                  <li>Watch</li>
                  <li>Tv</li>
                  <li>Camera</li>
                  <li>Laptop</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className="row">
              {!isLoading && !blogs?.length && (
                <p className="text-center fs-3">No data</p>
              )}

              {!isLoading &&
                blogs &&
                blogs?.length > 0 &&
                blogs?.map((blog) => (
                  <div key={blog?._id} className="col-6 mb-3">
                    <BlogCard data={blog} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Blog;
