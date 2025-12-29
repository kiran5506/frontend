"use client";
import ServiceForm from '@/components/admin/forms/ServiceForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const ServiceEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id && id !== 'create' ? 'Edit Service' : 'Create Service';
  return (
    <CreateLayout title={title} >
        <ServiceForm  id={id} />
    </CreateLayout>
  )
}

export default ServiceEdit
