"use client";
import LeadPackageForm from '@/components/admin/forms/LeadPackageForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const LeadPackageEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id && id !== 'create' ? 'Edit Lead Package' : 'Create Lead Package';
    return (
    <CreateLayout title={title} >
        <LeadPackageForm  id={id} />
    </CreateLayout>
  )
}

export default LeadPackageEdit
