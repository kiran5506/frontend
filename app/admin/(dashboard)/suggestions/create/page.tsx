import SuggestionForm from '@/components/admin/forms/SuggestionForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateSuggestion = () => {
  const id = ""
  return (
    <CreateLayout title="Suggestion Create">
      <SuggestionForm id={id} />
    </CreateLayout>
  )
}

export default CreateSuggestion
