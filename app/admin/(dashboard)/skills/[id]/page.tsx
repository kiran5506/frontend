"use client";
import SkillForm from '@/components/admin/forms/SkillForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const SkillEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id && id !== 'create' ? 'Edit Skill' : 'Create Skill';
    return (
    <CreateLayout title={title} >
        <SkillForm  id={id} />
    </CreateLayout>
  )
}

export default SkillEdit
