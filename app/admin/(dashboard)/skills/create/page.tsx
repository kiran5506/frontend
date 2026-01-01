import SkillForm from '@/components/admin/forms/SkillForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateSkill = () => {
    const id = "";
  return (
    <CreateLayout title={'Skill Create'} >
        <SkillForm  id={id} />
    </CreateLayout>
  )
}

export default CreateSkill
