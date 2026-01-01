"use client";
import EventForm from '@/components/admin/forms/EventForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React, { useMemo } from 'react'

const EventEdit = () => {
    const params = useParams();
    const id = useMemo(() => {
        if (!params || !params.id) return undefined;
        if (typeof params.id === 'string') {
            return params.id;
        }
        return Array.isArray(params.id) ? params.id[0] : undefined;
    }, [params?.id]);

    const title = id && id !== 'create' ? 'Edit Event' : 'Create Event';
    return (
    <CreateLayout title={title} >
        <EventForm  id={id} />
    </CreateLayout>
  )
}

export default EventEdit
