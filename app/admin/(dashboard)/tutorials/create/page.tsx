import TutorialForm from '@/components/admin/forms/TutorialForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateTutorial = () => {
    const id = "";
  return (
    <CreateLayout title={'Tutorial Create'} >
        <TutorialForm  id={id} />
    </CreateLayout>
  )
}

export default CreateTutorial
