"use client";
import LanguageForm from '@/components/admin/forms/LanguageForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const LanguageEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id && id !== 'create' ? 'Edit Language' : 'Create Language';
    return (
    <CreateLayout title={title} >
        <LanguageForm  id={id} />
    </CreateLayout>
  )
}

export default LanguageEdit
