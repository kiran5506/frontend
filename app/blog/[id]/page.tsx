"use client";
import WithLayout from '@/hoc/WithLayout';
import Breadcrumb from '@/components/frontend/Breadcrumb';
import { blogById, blogList } from '@/services/blog-api';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import 'react-quill-new/dist/quill.snow.css';

const BlogView = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const id = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

    const { currentBlog, Blogs, loading } = useSelector((state: any) => state.blog);

    useEffect(() => {
        if (id) {
            (dispatch as any)(blogById(id as any));
        }
    }, [id, dispatch]);

    // Fetch all blogs for recent posts sidebar
    useEffect(() => {
        (dispatch as any)(blogList());
    }, [dispatch]);

    const blog = currentBlog?.data || currentBlog;

    const recentPosts: any[] = Blogs
        ? Blogs.filter((b: any) => b._id !== id).slice(0, 9)
        : [];

    const formattedDate = blog?.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          })
        : '';

    if (loading) {
        return (
            <>
                <section className="blog-section py-3">
                    <div className="container">
                        <div className="text-center py-5">
                            <p>Loading blog...</p>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    if (!blog) {
        return (
            <>
                <section className="blog-section py-3">
                    <div className="container">
                        <div className="text-center py-5">
                            <p>Blog not found.</p>
                            <Link href="/blog" className="btn btn-secondary mt-3">Back to Blogs</Link>
                        </div>
                    </div>
                </section>
            </>
        );
    }

    return (
        <>
            <section className="blog-section py-3">
                <div className="container">
                    <div className="row pb-5">
                        {/* Main Content */}
                        <div className="col-md-9">
                            <div className="box-details">
                                <img
                                    src={blog.imagePath || '/images/blog/blog_img.jpg'}
                                    alt={blog.title}
                                    className="main-img"
                                    style={{ width: '100%', objectFit: 'cover', borderRadius: '4px', height: '500px' }}
                                />
                            </div>
                            <div className="content mt-4">
                                <div className="main-title">
                                    <h2 className="text-uppercase">{blog.title}</h2>
                                </div>
                                <p className="blog_date">
                                    <img src="/images/icons/calendar-icon.png" alt="" />
                                    {formattedDate} | Admin
                                </p>
                                <div
                                    className="blog-content mt-3 ql-editor"
                                    style={{ lineHeight: '1.8', padding: 0 }}
                                    dangerouslySetInnerHTML={{ __html: blog.content || '' }}
                                />
                            </div>
                        </div>

                        {/* Sidebar — Recent Posts */}
                        <div className="col-md-3">
                            <div className="related_posts">
                                <div className="head">
                                    <h4>Recent Posts</h4>
                                </div>
                                <div className="content">
                                    {recentPosts.length === 0 ? (
                                        <p className="p-3">No recent posts.</p>
                                    ) : (
                                        <ul>
                                            {recentPosts.map((post: any) => (
                                                <li key={post._id}>
                                                    <Link href={`/blog/view/${post._id}`}>
                                                        {post.title.length > 55
                                                            ? post.title.substring(0, 55) + '...'
                                                            : post.title}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WithLayout(BlogView, 'frontend');
