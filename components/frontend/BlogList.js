import React from 'react'

const BlogList = () => {
  return (
    <div className="col-sm-6 col-md-4 col-lg-4">
        <div className="box">
            <div className="img-block">
            <img src="/images/blog/blog_img.jpg" alt="" className="main-img" />
            </div>
            <div className="content">
            <h3>Green Leaf Foods</h3>
            <p className="location">
                <img src="/images/icons/calendar-icon.png" alt="" />
                06-09-2024 | Admin
            </p>
            <p className="mb-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
                lacinia ante quis aliquet bibendum.
            </p>
            <a href={`/blog/view/1`} className="btn btn-secondary">
                Read More
                <img src="/images/icons/btn-arrow.png" alt="" width={10} />
            </a>
            </div>
        </div>
    </div>
  )
}

export default BlogList
