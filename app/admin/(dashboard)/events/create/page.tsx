"use client";
import dynamic from 'next/dynamic'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const EventForm = dynamic(() => import('@/components/admin/forms/EventForm'), { ssr: false })

const CreateEvent = () => {
    const id = "";
  return (
    <CreateLayout title={'Event Create'} >
        <EventForm  id={id} />
    </CreateLayout>
  )
}

export default CreateEvent
