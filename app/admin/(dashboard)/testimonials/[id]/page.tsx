"use client";
import TestimonialForm from '@/components/admin/forms/TestimonialForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const TestimonialEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id && id !== 'create' ? 'Edit Testimonial' : 'Create Testimonial';
    return (
    <CreateLayout title={title} >
        <TestimonialForm  id={id} />
    </CreateLayout>
  )
}

export default TestimonialEdit
