"use client";
import dynamic from 'next/dynamic'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const SuggestionForm = dynamic(() => import('@/components/admin/forms/SuggestionForm'), { ssr: false })

const CreateSuggestion = () => {
  const id = ""
  return (
    <CreateLayout title="Suggestion Create">
      <SuggestionForm id={id} />
    </CreateLayout>
  )
}

export default CreateSuggestion
