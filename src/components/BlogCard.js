import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ data }) => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">
          {moment(data?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </p>
        <h5 className="title text-truncate">{data?.title}</h5>
        <p
          className="desc d-inline-block"
          dangerouslySetInnerHTML={{
            __html: `${data?.description?.substr(0, 70)}`,
          }}
        ></p>
        <Link to={`/blog/${data?._id}`} className="button">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
