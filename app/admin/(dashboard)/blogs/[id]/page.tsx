"use client";
import BlogForm from '@/components/admin/forms/BlogForm';
import CreateLayout from '@/components/common/Layouts/CreateLayout';
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react';

const BlogEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') return params.id;
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id ? 'Edit Blog' : 'Create Blog';

    return (
        <CreateLayout title={title}>
            <BlogForm id={id} />
        </CreateLayout>
    );
};

export default BlogEdit;
