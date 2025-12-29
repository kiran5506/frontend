
import ServiceForm from '@/components/admin/forms/ServiceForm';
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateService = () => {
    const id = "";
  return (
    <CreateLayout title={'Service Create'} >
        <ServiceForm  id={id} />
    </CreateLayout>
  )
}

export default CreateService
