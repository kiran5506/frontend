import React, { useState } from 'react'
import { renderStars } from '@/utils/renderStars'

const ReviewCard = ({ review, onDelete, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [replyModal, setReplyModal] = useState(false)
  const [replyText, setReplyText] = useState('')

  const displayCharCount = 250
  const reviewText = review?.review || ''
  const isLongReview = reviewText.length > displayCharCount

  const handleShowMore = () => {
    setIsExpanded(!isExpanded)
  }

  const handleReply = () => {
    if (replyText.trim()) {
      onUpdate?.({
        id: review._id,
        status: 'accepted',
        replay_review: replyText
      })
      setReplyText('')
      setReplyModal(false)
    }
  }

  return (
    <div className="col-md-6">
      <div className="review-bx">
        <div className="row review-top">
          <div className="col-2 col-lg-3">
            <img
              src={review?.customer_id?.profile_image || 'assets/img/profile-img.jpg'}
              alt="Profile"
              className="rounded-circle w-100"
            />
          </div>
          <div className="col-7 col-lg-7 text-start">
            <h5>{review?.customer_id?.name || 'Customer Name'}</h5>
            <p>Customer ID: #{review?.customer_id?._id?.slice(-6).toUpperCase()}</p>
            <ul className="mb-0">
              {renderStars(review?.rating || 0)}
            </ul>
          </div>
          <div className="col-2 col-lg-2 text-end">
            <div 
              data-bs-toggle="dropdown" 
              className="cursor-pointer"
              style={{cursor: 'pointer'}}
            >
              <i className="bi bi-three-dots-vertical" />
            </div>
            <ul className="dropdown-menu">
              <li>
                <a 
                  className="dropdown-item" 
                  onClick={() => setReplyModal(true)}
                >
                  <i className="bi bi-reply"></i> Reply
                </a>
              </li>
              {review?.status === 'pending' && (
                <>
                  <li>
                    <a 
                      className="dropdown-item text-success" 
                      onClick={() => onUpdate?.({id: review._id, status: 'accepted'})}
                    >
                      <i className="bi bi-check"></i> Accept
                    </a>
                  </li>
                  <li>
                    <a 
                      className="dropdown-item text-danger" 
                      onClick={() => onUpdate?.({id: review._id, status: 'rejected'})}
                    >
                      <i className="bi bi-x"></i> Reject
                    </a>
                  </li>
                </>
              )}
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a 
                  className="dropdown-item text-danger" 
                  onClick={() => onDelete?.(review._id)}
                >
                  <i className="bi bi-trash"></i> Delete
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="review-center text-start">
          <p>
            {isExpanded ? reviewText : reviewText.slice(0, displayCharCount)}
            {isLongReview && !isExpanded && '...'}
          </p>
          {isLongReview && (
            <u 
              onClick={handleShowMore}
              className="cursor-pointer"
              style={{cursor: 'pointer', color: '#007bff'}}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </u>
          )}
        </div>

        {review?.status !== 'pending' && review?.replay_review && (
          <div className="review-reply mt-3 p-2" style={{backgroundColor: '#f8f9fa', borderRadius: '5px'}}>
            <small className="text-muted">Vendor Reply:</small>
            <p className="mb-0 mt-1">{review.replay_review}</p>
          </div>
        )}

        <div className="review-footer mt-2">
          <small className="text-muted">
            Status: <span className={`badge bg-${
              review?.status === 'accepted' ? 'success' : 
              review?.status === 'rejected' ? 'danger' : 
              'warning'
            }`}>
              {review?.status?.charAt(0).toUpperCase() + review?.status?.slice(1)}
            </span>
          </small>
        </div>
      </div>

      {/* Reply Modal */}
      <div 
        className={`modal fade ${replyModal ? 'show' : ''}`} 
        id="reply-modal" 
        style={{display: replyModal ? 'block' : 'none', backgroundColor: replyModal ? 'rgba(0,0,0,0.5)' : 'transparent'}}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Reply to Review</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setReplyModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Your Reply</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write your response to this review..."
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setReplyModal(false)}
              >
                Close
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={handleReply}
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard
