"use client";
import VideoForm from '@/components/admin/forms/VideoForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const VideoEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id && id !== 'create' ? 'Edit Video' : 'Create Video';
    return (
    <CreateLayout title={title} >
        <VideoForm  id={id} />
    </CreateLayout>
  )
}

export default VideoEdit
