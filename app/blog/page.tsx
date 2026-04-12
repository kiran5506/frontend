
import React from 'react'
import WithLayout from '@/hoc/WithLayout';
import BlogList from '@/components/frontend/BlogList';

const Blog = () => {
  return (
    <section className="blog-section py-3">
        <div className="container">
            <div className="row gx-4 pb-5 d-flex align-items-center">
                <BlogList />
                <BlogList />
                <BlogList />
                <BlogList />
            </div>
        </div>
    </section>
  )
}

export default WithLayout(Blog, 'frontend');
