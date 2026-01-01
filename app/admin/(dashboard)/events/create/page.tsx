import EventForm from '@/components/admin/forms/EventForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateEvent = () => {
    const id = "";
  return (
    <CreateLayout title={'Event Create'} >
        <EventForm  id={id} />
    </CreateLayout>
  )
}

export default CreateEvent
