"use client";
import CityForm from '@/components/admin/forms/CityForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const CityEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id && id !== 'create' ? 'Edit City' : 'Create City';
    return (
    <CreateLayout title={title} >
        <CityForm  id={id} />
    </CreateLayout>
  )
}

export default CityEdit
