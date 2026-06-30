"use client";
import BlogForm from '@/components/admin/forms/BlogForm';
import CreateLayout from '@/components/common/Layouts/CreateLayout';
import React from 'react';

const CreateBlog = () => {
    return (
        <CreateLayout title="Create Blog">
            <BlogForm id="" />
        </CreateLayout>
    );
};

export default CreateBlog;
