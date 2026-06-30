"use client";
import React, { useEffect, useState } from 'react';
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout';
import Table from '../../../../components/common/Table/Table';
import { useDispatch, useSelector } from 'react-redux';
import { blogAdminList, blogDelete } from '@/services/blog-api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const tableHeader: string[] = ['S.No', 'Title', 'Short Description', 'Image', 'Actions'];

const AdBlogs = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [headerData, setHeaderData] = useState<string[]>([]);
    const [bodyData, setBodyData] = useState<any[]>([]);

    const isview = false;
    const isedit = true;
    const isdelete = true;

    useEffect(() => {
        (dispatch as any)(blogAdminList());
    }, [dispatch]);

    const { Blogs, loading } = useSelector((state: any) => state.blog);

    useEffect(() => {
        setHeaderData(tableHeader);
        if (!loading && Blogs && Blogs.length > 0) {
            const mapped = Blogs.map((blog: any) => ({
                _id: blog._id,
                title: blog.title,
                shortDescription: blog.shortDescription && blog.shortDescription.length > 10
                    ? blog.shortDescription.substring(0, 10) + '...'
                    : blog.shortDescription || '',
                imagePath: blog.imagePath,
            }));
            setBodyData(mapped);
        } else {
            setBodyData([]);
        }
    }, [Blogs, loading]);

    const handleEdit = (id: string) => {
        router.push(`/admin/blogs/${id}`);
    };

    const handleDelete = (id: string) => {
        (dispatch as any)(blogDelete(id as any)).then((result: any) => {
            if (result.payload && result.payload.status) {
                toast.success(result.payload.message);
            } else {
                toast.error(result.payload?.message || 'Delete failed');
            }
        });
    };

    return (
        <AdPageLayout
            iscreate={true}
            title="Blogs"
            linkHref="/admin/blogs/create"
            name="Blog"
        >
            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table
                    headerData={headerData}
                    bodyData={bodyData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    isview={isview}
                    isedit={isedit}
                    isdelete={isdelete}
                />
            )}
        </AdPageLayout>
    );
};

export default AdBlogs;
