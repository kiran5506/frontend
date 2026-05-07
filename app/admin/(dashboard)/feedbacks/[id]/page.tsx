"use client";
import React, { useEffect, useMemo } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getFeedbackById } from '@/services/feedback-api'
import { BsArrowLeft } from 'react-icons/bs'

const FeedbackView = () => {
  const params = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if (params?.id) {
  ;(dispatch as any)(getFeedbackById(params.id as any))
    }
  }, [params?.id, dispatch])

  const { currentFeedback } = useSelector((state: any) => state.feedback)

  const feedbackData = useMemo(() => {
    if (currentFeedback && params?.id) {
      return currentFeedback.data || currentFeedback
    }
    return null
  }, [currentFeedback, params?.id])

  const typeLabel = useMemo(() => {
    const typeParam = searchParams?.get('type')
    if (typeParam === 'vendor' || feedbackData?.type === 'vendor') return 'Vendor'
    if (typeParam === 'customer' || feedbackData?.type === 'customer') {
      return 'Customer'
    }
    return 'Feedback'
  }, [searchParams, feedbackData?.type])

  const profile = feedbackData?.type === 'vendor' ? feedbackData?.vendor_id : feedbackData?.customer_id

  return (
    <section className="section">
      <div className="row">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {typeLabel} Feedback Details
                <button
                  onClick={() => router.back()}
                  className="btn btn-success btn-sm"
                  style={{ float: 'right' }}
                >
                  <BsArrowLeft /> Back
                </button>
              </h5>

              {feedbackData ? (
                <div className="row">
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-5 col-sm-4">
                        <p className="mb-0"><strong>Name</strong></p>
                      </div>
                      <div className="col-7 col-sm-8">
                        <p className="mb-0">{profile?.name || 'N/A'}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-5 col-sm-4">
                        <p className="mb-0"><strong>Email</strong></p>
                      </div>
                      <div className="col-7 col-sm-8">
                        <p className="mb-0">{profile?.email || 'N/A'}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-5 col-sm-4">
                        <p className="mb-0"><strong>Mobile</strong></p>
                      </div>
                      <div className="col-7 col-sm-8">
                        <p className="mb-0">{feedbackData.mobile_number || profile?.mobile_number || 'N/A'}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-5 col-sm-4">
                        <p className="mb-0"><strong>Feedback</strong></p>
                      </div>
                      <div className="col-7 col-sm-8">
                        <p className="mb-0">{feedbackData.feedback || 'N/A'}</p>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-5 col-sm-4">
                        <p className="mb-0"><strong>Status</strong></p>
                      </div>
                      <div className="col-7 col-sm-8">
                        <span className={`badge ${feedbackData.status === 1 ? 'bg-success' : 'bg-warning'}`}>
                          {feedbackData.status === 1 ? 'Resolved' : 'Pending'}
                        </span>
                      </div>
                    </div>
                    <hr />

                    <div className="row">
                      <div className="col-5 col-sm-4">
                        <p className="mb-0"><strong>Created Date</strong></p>
                      </div>
                      <div className="col-7 col-sm-8">
                        <p className="mb-0">
                          {feedbackData.createdAt ? new Date(feedbackData.createdAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading feedback details...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeedbackView
