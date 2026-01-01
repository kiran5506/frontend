import CityForm from '@/components/admin/forms/CityForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateCity = () => {
    const id = "";
  return (
    <CreateLayout title={'City Create'} >
        <CityForm  id={id} />
    </CreateLayout>
  )
}

export default CreateCity
