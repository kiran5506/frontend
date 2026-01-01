"use client";
import TutorialForm from '@/components/admin/forms/TutorialForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const TutorialEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id && id !== 'create' ? 'Edit Tutorial' : 'Create Tutorial';
    return (
    <CreateLayout title={title} >
        <TutorialForm  id={id} />
    </CreateLayout>
  )
}

export default TutorialEdit
