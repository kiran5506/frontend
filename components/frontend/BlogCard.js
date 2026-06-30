import React from 'react';
import Link from 'next/link';

const BlogCard = ({ blog }) => {
    const formattedDate = blog?.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          })
        : '';

    return (
        <div className="col-sm-6 col-md-4 col-lg-4">
            <div className="box">
                <div className="img-block">
                    <img
                        src={blog?.imagePath || '/images/blog/blog_img.jpg'}
                        alt={blog?.title}
                        className="main-img"
                        height={216}
                    />
                </div>
                <div className="content">
                    <h3>{blog?.title.length > 22 ? blog?.title.substring(0, 22) + '...' : blog?.title}</h3>
                    <p className="location">
                        <img src="/images/icons/calendar-icon.png" alt="" />
                        {formattedDate} | Admin
                    </p>
                    <p className="mb-3">{blog?.shortDescription.length > 200 ? blog?.shortDescription.substring(0, 200) + '...' : blog?.shortDescription}</p>
                    <Link href={`/blog/${blog?._id}`} className="btn btn-secondary">
                        Read More{' '}
                        <img src="/images/icons/btn-arrow.png" alt="" width={10} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
