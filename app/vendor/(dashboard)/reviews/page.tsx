'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReviewCard from '../../../../components/vendor/ReviewCard'
import { reviewByVendorId, reviewEdit, reviewDelete } from '../../../../services/review-api'
import { resetSuccess, resetError } from '../../../../redux/features/review-slice'

const ReviewsManagement = () => {
  const dispatch = useDispatch() as any
  const { vendorReviews, loading, error, success, pagination } = useSelector((state: any) => state.review)
  const { details, vendorid } = useSelector((state: any) => state.vendorAuth)
  const vendorDetails = React.useMemo(() => {
    if (!details) return null
    if (typeof details === 'string') {
      try {
        return JSON.parse(details)
      } catch (error) {
        return null
      }
    }
    return details
  }, [details])
  
  const [currentPage, setCurrentPage] = useState(1)
  const [filterStatus, setFilterStatus] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const limit = 10

  const vendorId = vendorDetails?._id || vendorid

  // Fetch reviews on mount or when page/filter changes
  useEffect(() => {
    if (vendorId) {
      dispatch(reviewByVendorId({
        vendor_id: vendorId,
        page: currentPage,
        limit: limit,
        status: filterStatus || undefined
      }))
    }
  }, [dispatch, vendorId, currentPage, filterStatus])

  // Handle success messages
  useEffect(() => {
    if (success) {
      setSuccessMessage('Action completed successfully!')
      setTimeout(() => {
        setSuccessMessage('')
        dispatch(resetSuccess())
      }, 3000)
    }
  }, [success, dispatch])

  // Handle error messages
  useEffect(() => {
    if (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage('')
        dispatch(resetError())
      }, 3000)
    }
  }, [error, dispatch])

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(reviewDelete({ id: reviewId }))
    }
  }

  const handleUpdateReview = (data: any) => {
    dispatch(reviewEdit({
      id: data.id,
      data: {
        status: data.status,
        replay_review: data.replay_review || undefined
      }
    }))
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="page-title">Reviews Management</h2>
        <div className="d-flex gap-2">
          <select
            className="form-select form-select-sm"
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value)
              setCurrentPage(1)
            }}
            style={{ maxWidth: '150px' }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          {successMessage}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setSuccessMessage('')}
          ></button>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMessage}
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setErrorMessage('')}
          ></button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : vendorReviews && vendorReviews.length > 0 ? (
        <>
          <div id="reviews-section">
            <div className="row">
              {vendorReviews.map((review: any) => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  onDelete={handleDeleteReview}
                  onUpdate={handleUpdateReview}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          {pagination && pagination.pages > 1 && (
            <nav aria-label="Page navigation" className="mt-4">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((page) => (
                  <li
                    key={page}
                    className={`page-item ${currentPage === page ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === pagination.pages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(prev => Math.min(pagination.pages, prev + 1))}
                    disabled={currentPage === pagination.pages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}

          {/* Showing info */}
          <div className="text-center mt-3">
            <small className="text-muted">
              Showing {((currentPage - 1) * limit) + 1} to {Math.min(currentPage * limit, pagination?.total)} of {pagination?.total} reviews
            </small>
          </div>
        </>
      ) : (
        <div className="alert alert-info text-center py-5">
          <i className="bi bi-info-circle me-2"></i>
          No reviews found. Start collecting customer reviews to see them here.
        </div>
      )}
    </>
  )
}

export default ReviewsManagement
