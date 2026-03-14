'use client'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createContactSupport, contactSupportList, updateContactSupportStatus } from '@/services/contact-support-api'

interface ContactSupport {
  _id: string
  mobile_number: string
  issue: string
  type: 'customer' | 'vendor'
  status: 0 | 1
  createdAt: string
}

const ContactSupport = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    mobile_number: '',
    issue: '',
    type: 'customer' as 'customer' | 'vendor'
  })
  const [contactList, setContactList] = useState<ContactSupport[]>([])
  const [loading, setLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')

  useEffect(() => {
    fetchContactSupports()
  }, [filterStatus, filterType])

  const fetchContactSupports = async () => {
    try {
      const params: any = {}
      if (filterStatus !== 'all') params.status = filterStatus
      if (filterType !== 'all') params.type = filterType

      // @ts-ignore
      const response: any = await dispatch(contactSupportList(params)).unwrap()
      if (response.status) {
        setContactList(response.data)
      }
    } catch (error) {
      console.error('Error fetching contact supports:', error)
    }
  }

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
    
    if (!formData.type) {
      newErrors.type = 'Type is required'
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
      // @ts-ignore
      const response: any = await dispatch(createContactSupport(formData)).unwrap()
      if (response.status) {
        setShowSuccess(true)
        setFormData({
          mobile_number: '',
          issue: '',
          type: 'customer'
        })
        setErrors({})
        setTimeout(() => setShowSuccess(false), 5000)
        fetchContactSupports()
      }
    } catch (error: any) {
      console.error('Error submitting contact support:', error)
      alert(error.message || 'Failed to submit request')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusChange = async (id: string, newStatus: 0 | 1) => {
    try {
      // @ts-ignore
      const response: any = await dispatch(updateContactSupportStatus({ id, status: newStatus })).unwrap()
      if (response.status) {
        fetchContactSupports()
      }
    } catch (error: any) {
      console.error('Error updating status:', error)
      alert(error.message || 'Failed to update status')
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="content">
      <div className="pad">
        <div className="row align-items-center d-flex mb-2">
          <div className="col-md-12">
            <h3 className="text-start text-theme mb-3">Contact Support</h3>
          </div>
        </div>
        
        <div className="row">
          <div className="col-md-6">
            <div className="form-sec">
              <h5 className="mb-3">Submit Your Request</h5>
              <form onSubmit={handleSubmit}>
                {/* <div className="mb-3">
                  <label className="form-label">Type*</label>
                  <select
                    name="type"
                    className="form-control py-2 px-4 rounded-5"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                  {errors.type && <small className="text-danger">{errors.type}</small>}
                </div> */}

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
                  />
                  {errors.mobile_number && <small className="text-danger">{errors.mobile_number}</small>}
                </div>

                <div className="mb-3">
                  <label className="form-label">Write Brief Your Issue*</label>
                  <textarea
                    name="issue"
                    className="form-control py-2 px-4 rounded-5"
                    rows={4}
                    placeholder="Describe your issue..."
                    value={formData.issue}
                    onChange={handleInputChange}
                  />
                  {errors.issue && <small className="text-danger">{errors.issue}</small>}
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
                  We will call you as soon as possible
                </div>
              )}
            </div>
          </div>

          {/* <div className="col-md-6">
            <div className="form-sec">
              <h5 className="mb-3">Support Requests</h5>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label className="form-label">Filter by Status</label>
                  <select
                    className="form-control py-2 px-4 rounded-5"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="0">Pending</option>
                    <option value="1">Resolved</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Filter by Type</label>
                  <select
                    className="form-control py-2 px-4 rounded-5"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                  </select>
                </div>
              </div>

              <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className="table table-bordered table-striped">
                  <thead className="table-light" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                    <tr>
                      <th>Mobile</th>
                      <th>Type</th>
                      <th>Issue</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactList.length > 0 ? (
                      contactList.map((contact) => (
                        <tr key={contact._id}>
                          <td>{contact.mobile_number}</td>
                          <td>
                            <span className={`badge bg-${contact.type === 'customer' ? 'info' : 'warning'}`}>
                              {contact.type}
                            </span>
                          </td>
                          <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {contact.issue}
                          </td>
                          <td style={{ fontSize: '0.85rem' }}>{formatDate(contact.createdAt)}</td>
                          <td>
                            <select
                              className={`form-select form-select-sm ${contact.status === 0 ? 'bg-warning' : 'bg-success text-white'}`}
                              value={contact.status}
                              onChange={(e) => handleStatusChange(contact._id, parseInt(e.target.value) as 0 | 1)}
                            >
                              <option value={0}>Pending</option>
                              <option value={1}>Resolved</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center">No support requests found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default ContactSupport

