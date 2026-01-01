import LanguageForm from '@/components/admin/forms/LanguageForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateLanguage = () => {
    const id = "";
  return (
    <CreateLayout title={'Language Create'} >
        <LanguageForm  id={id} />
    </CreateLayout>
  )
}

export default CreateLanguage
