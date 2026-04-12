"use client";
import React, { useEffect, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { listSuggestions, suggestionDelete } from '@/services/suggestion-api'

const tableHeader: string[] = [
  'S.No',
  'City',
  'Service',
  'Manual Vendors',
  'Auto Vendors',
  'Status',
  'Actions'
]

type City = { _id: string; cityName: string };
type Service = { _id: string; serviceName: string };
type Vendor = { _id: string; name: string };
type Suggestion = {
  _id: string;
  city_id: City;
  service_id: Service;
  manual_vendors: Vendor[];
  auto_vendors: Vendor[];
  isActive: boolean;
};

type SuggestionRow = {
  _id: string;
  city: string;
  service: string;
  manual_vendors: string;
  auto_vendors: string;
  status: string;
};

type RootState = {
  suggestions: { suggestions: Suggestion[]; loading: boolean };
};

type AppDispatch = (action: unknown) => Promise<unknown>;

const SuggestionsList = () => {
  const router = useRouter()
  const dispatch = useDispatch() as AppDispatch
  const [headerData, setHeaderData] = useState<string[]>([])
  const [bodyData, setBodyData] = useState<SuggestionRow[]>([])
  const isview = false
  const isedit = true
  const isdelete = true

  useEffect(() => {
    setHeaderData(tableHeader)
    dispatch(listSuggestions() as unknown)
  }, [dispatch])

  const { suggestions, loading } = useSelector((state: RootState) => state.suggestions)

  useEffect(() => {
    if (!loading && suggestions && suggestions.length > 0) {
      const formattedData = suggestions.map((item) => {
        const manualNames = (item.manual_vendors || [])
          .map((vendor) => vendor?.name || '')
          .filter(Boolean)
          .join(', ')
        const autoNames = (item.auto_vendors || [])
          .map((vendor) => vendor?.name || '')
          .filter(Boolean)
          .join(', ')
        return {
          _id: item._id,
          city: item.city_id?.cityName || 'N/A',
          service: item.service_id?.serviceName || 'N/A',
          manual_vendors: manualNames || 'N/A',
          auto_vendors: autoNames || 'N/A',
          status: item.isActive ? 'Active' : 'Inactive'
        }
      })
      setBodyData(formattedData)
    } else {
      setBodyData([])
    }
  }, [suggestions, loading])

  const handleEdit = (id: string) => {
    router.push(`/admin/suggestions/${id}`)
  }

  const handleDelete = (id: string) => {
    const runDelete = suggestionDelete as unknown as (value: string) => unknown
    const runList = listSuggestions as unknown as () => unknown

    dispatch(runDelete(id)).then((result) => {
      const payload = (result as { payload?: { status?: boolean; message?: string } }).payload
      if (payload?.status) {
        toast.success(payload.message || 'Suggestion deleted')
        dispatch(runList())
      } else {
        toast.error(payload?.message || 'Failed to delete suggestion')
      }
    })
  }

  return (
    <AdPageLayout
      iscreate={true}
      title="Suggestions"
      linkHref="/admin/suggestions/create"
      name="Suggestion"
    >
      <Table
        headerData={headerData}
        bodyData={bodyData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isview={isview}
        isedit={isedit}
        isdelete={isdelete}
        loading={loading}
      />
    </AdPageLayout>
  )
}

export default SuggestionsList
