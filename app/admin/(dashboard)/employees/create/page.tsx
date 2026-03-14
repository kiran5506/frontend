import EmployeeForm from '@/components/admin/forms/EmployeeForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateEmployee = () => {
    const id = "";
  return (
    <CreateLayout title={'Employee Create'} >
        <EmployeeForm  id={id} />
    </CreateLayout>
  )
}

export default CreateEmployee
