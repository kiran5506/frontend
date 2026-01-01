import LeadPackageForm from '@/components/admin/forms/LeadPackageForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateLeadPackage = () => {
    const id = "";
  return (
    <CreateLayout title={'Lead Package Create'} >
        <LeadPackageForm  id={id} />
    </CreateLayout>
  )
}

export default CreateLeadPackage
