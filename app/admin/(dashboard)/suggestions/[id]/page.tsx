"use client";
import SuggestionForm from '@/components/admin/forms/SuggestionForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import { useParams } from 'next/navigation'
import React, { useMemo } from 'react'

const SuggestionEdit = () => {
  const params = useParams()
  const id = useMemo(() => {
    if (!params || !params.id) return undefined
    if (typeof params.id === 'string') {
      return params.id
    }
    return Array.isArray(params.id) ? params.id[0] : undefined
  }, [params?.id])

  const title = id && id !== 'create' ? 'Edit Suggestion' : 'Create Suggestion'

  return (
    <CreateLayout title={title}>
      <SuggestionForm id={id} />
    </CreateLayout>
  )
}

export default SuggestionEdit
