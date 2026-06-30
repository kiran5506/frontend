
"use client";
import React, { useEffect, useState } from 'react';
import WithLayout from '@/hoc/WithLayout';
import BlogCard from '@/components/frontend/BlogCard';
import Pagination from '@/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { blogList } from '@/services/blog-api';
import Breadcrumb from '@/components/frontend/Breadcrumb';

const BLOGS_PER_PAGE = 20;

const Blog = () => {
    const dispatch = useDispatch();
    const { Blogs, loading } = useSelector((state: any) => state.blog);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        (dispatch as any)(blogList());
    }, [dispatch]);

    const totalPages = Blogs ? Math.ceil(Blogs.length / BLOGS_PER_PAGE) : 0;
    const paginatedBlogs: any[] = Blogs
        ? Blogs.slice((currentPage - 1) * BLOGS_PER_PAGE, currentPage * BLOGS_PER_PAGE)
        : [];

    return (
        <>
            <section className="blog-section py-3">
                <div className="container">
                    {loading ? (
                        <div className="row pb-5">
                            <div className="col-12 text-center py-5">
                                <p>Loading blogs...</p>
                            </div>
                        </div>
                    ) : paginatedBlogs.length === 0 ? (
                        <div className="row pb-5">
                            <div className="col-12 text-center py-5">
                                <p>No blogs available at the moment.</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="row gx-4 pb-5 d-flex align-items-start">
                                {paginatedBlogs.map((blog: any) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))}
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={(page: number) => {
                                            setCurrentPage(page);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default WithLayout(Blog, 'frontend');
