"use client";
import VideoForm from '@/components/admin/forms/VideoForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateVideo = () => {
    const id = "";
  return (
    <CreateLayout title={'Video Create'} >
        <VideoForm  id={id} />
    </CreateLayout>
  )
}

export default CreateVideo
