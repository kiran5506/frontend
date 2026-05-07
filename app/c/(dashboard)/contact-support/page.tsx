'use client'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createFeedback } from '@/services/feedback-api'

const ContactSupport = () => {
  const dispatch = useDispatch()
  const customerAuth = useSelector((state: any) => state.customerAuth)
  const customerDetails = React.useMemo(() => {
    if (!customerAuth?.details) return null
    if (typeof customerAuth.details === 'string') {
      try {
        return JSON.parse(customerAuth.details)
      } catch {
        return null
      }
    }
    return customerAuth.details
  }, [customerAuth?.details])

  const [formData, setFormData] = useState({
    mobile_number: '',
    issue: ''
  })
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<any>({})

  useEffect(() => {
    if (!customerDetails) return
    setFormData((prev) => ({
      ...prev,
      mobile_number: customerDetails?.mobile_number || ''
    }))
  }, [customerDetails])

  const validateForm = () => {
    const newErrors: any = {}
    
    if (!formData.mobile_number) {
      newErrors.mobile_number = 'Mobile number is required'
    } else if (!/^[0-9]{10}$/.test(formData.mobile_number)) {
      newErrors.mobile_number = 'Mobile number must be 10 digits'
    }
    
    if (!formData.issue.trim()) {
      newErrors.issue = 'Issue description is required'
    }
    
    if (!customerDetails?._id) {
      newErrors.customer = 'Customer not found. Please login again.'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const payload = {
        customer_id: customerDetails?._id,
        type: 'customer',
        mobile_number: formData.mobile_number,
        feedback: formData.issue
      }

      // @ts-ignore
      const response: any = await dispatch(createFeedback(payload)).unwrap()
      if (response.status) {
        setShowSuccess(true)
        setFormData({
          mobile_number: '',
          issue: ''
        })
        setErrors({})
        setTimeout(() => setShowSuccess(false), 5000)
        if (customerDetails?.mobile_number) {
          setFormData({
            mobile_number: customerDetails.mobile_number,
            issue: ''
          })
        }
      }
    } catch (error: any) {
      console.error('Error submitting contact support:', error)
      alert(error.message || 'Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="content">
      <div className="pad">
        <div className="row align-items-center d-flex mb-2">
          <div className="col-md-12">
            <h3 className="text-start text-theme mb-3">Submit Feedback</h3>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <div className="form-sec">
              <h5 className="mb-3">Submit Your Feedback</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Mobile Number*</label>
                  <input
                    type="text"
                    name="mobile_number"
                    className="form-control py-2 px-4 rounded-5"
                    placeholder="Enter 10-digit Mobile Number"
                    value={formData.mobile_number}
                    onChange={handleInputChange}
                    maxLength={10}
                    readOnly={Boolean(customerDetails?.mobile_number)}
                  />
                  {errors.mobile_number && <small className="text-danger">{errors.mobile_number}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Write Your Feedback*</label>
                  <textarea
                    name="issue"
                    className="form-control py-2 px-4 rounded-5"
                    rows={4}
                    placeholder="Share your feedback..."
                    value={formData.issue}
                    onChange={handleInputChange}
                  />
                  {errors.issue && <small className="text-danger">{errors.issue}</small>}
                  {errors.customer && <small className="text-danger d-block">{errors.customer}</small>}
                </div>

                <button 
                  type="submit" 
                  className="btn btn-secondary rounded-5 px-4"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </form>

              {showSuccess && (
                <div className="alert alert-success text-center mt-3">
                  Feedback submitted successfully.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactSupport

