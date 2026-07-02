"use client";
import React, { useEffect, useMemo, useState } from 'react'
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout'
import Table from '../../../../components/common/Table/Table'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { deleteFeedback, listFeedback } from '@/services/feedback-api'
import { toast } from 'react-toastify'

const tableHeader: string[] = ['S.No', 'Name', 'Mobile', 'Email', 'Feedback', 'Date', 'Actions']

const FeedbacksList = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const [headerData, setHeaderData] = useState<string[]>([])
  const [bodyData, setBodyData] = useState<any[]>([])
  const isview = true
  const isedit = false
  const isdelete = true

  const rawType = searchParams?.get('type') || 'vendor'
  const normalizedType = rawType

  console.log('Normalized Type:', normalizedType)

  const title = useMemo(
    () => (normalizedType === 'vendor' ? 'Vendor Feedbacks' : 'Customer Feedbacks'),
    [normalizedType]
  )

  useEffect(() => {
    setHeaderData(tableHeader)
  }, [])

  useEffect(() => {
    if (normalizedType) {
      setBodyData([])
  ;(dispatch as any)(listFeedback({ type: normalizedType } as any))
    }
  }, [dispatch, normalizedType])

  const { feedbacks, loading } = useSelector((state: any) => state.feedback)

  useEffect(() => {
    if (!loading && feedbacks && feedbacks.length > 0) {
      const formattedData = feedbacks.map((feedback: any) => {
        const profile = feedback.type === 'vendor' ? feedback.vendor_id : feedback.customer_id        
        return {
          _id: feedback._id,
          name: feedback.type === 'vendor'  ? feedback?.vendor_id?.businessName : profile?.name || '-',
          mobile_number: feedback.mobile_number || profile?.mobile_number || '-',
          email: profile?.email || '-',
          feedback: feedback.feedback || '-',
          //status: feedback.status === 1 ? 'Resolved' : 'Pending',
          createdAt: feedback.createdAt,
        }
      })
      setBodyData(formattedData)
    } else {
      setBodyData([])
    }
  }, [feedbacks, loading])

  const handleView = (id: string) => {
    router.push(`/admin/feedbacks/${id}?type=${normalizedType}`)
  }

  const handleDelete = (id: string) => {
  ;(dispatch as any)(deleteFeedback(id as any)).then((result: any) => {
      if (result?.payload?.status) {
        toast.success(result.payload.message || 'Feedback deleted successfully')
        ;(dispatch as any)(listFeedback({ type: normalizedType } as any))
      } else {
        toast.error(result?.payload?.message || 'Unable to delete feedback')
      }
    })
  }

  return (
    <AdPageLayout iscreate={false} title={title} linkHref="#" name="Feedback">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table
          headerData={headerData}
          bodyData={bodyData}
          onView={handleView}
          onDelete={handleDelete}
          isview={isview}
          isedit={isedit}
          isdelete={isdelete}
        />
      )}
    </AdPageLayout>
  )
}

export default FeedbacksList
