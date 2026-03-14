"use client";
import EmployeeForm from '@/components/admin/forms/EmployeeForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation';
import React from 'react'

const EditEmployee = () => {
    const params = useParams();
    const id = (params?.id as string) || "";
    
  return (
    <CreateLayout title={'Employee Edit'} >
        <EmployeeForm  id={id} />
    </CreateLayout>
  )
}

export default EditEmployee
