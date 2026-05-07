'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { customerInquiryList } from '@/services/inquiry-api'

type InquiryType = 'enquiry' | 'callback'

interface InquiryListTableProps {
  title: string
  enquiryType: InquiryType
}

interface InquiryRow {
  _id: string
  enquiry_type: InquiryType
  enquiry_date?: string
  createdAt?: string
  service?: {
    _id?: string
    name?: string
    image?: string
  }
  business_profile?: {
    _id?: string
    businessName?: string
    profilePicture?: string
  } | null
  package?: {
    _id?: string
    packageName?: string
    image?: string
  } | null
}

const InquiryListTable = ({ title, enquiryType }: InquiryListTableProps) => {
  const dispatch = useDispatch()
  const customerAuth = useSelector((state: any) => state.customerAuth)

  const customerDetails = useMemo(() => {
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

  const customerId = customerDetails?._id

  const [rows, setRows] = useState<InquiryRow[]>([])
  const [loading, setLoading] = useState(false)
  const [serviceSearch, setServiceSearch] = useState('')
  const [dateFilter, setDateFilter] = useState('')

  const formatDate = (value?: string) => {
    if (!value) return '--'
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return '--'
    return parsed.toLocaleDateString('en-GB')
  }

  const fetchRows = async (filters?: { service?: string; date?: string }) => {
    if (!customerId) {
      setRows([])
      return
    }

    const params: Record<string, string> = {
      customer_id: customerId,
      enquiry_type: enquiryType,
      limit: '100'
    }

    if (filters?.service) params.service_name = filters.service
    if (filters?.date) params.enquiry_date = filters.date

    setLoading(true)
    try {
      // @ts-ignore
      const response = await dispatch(customerInquiryList(params)).unwrap()
      if (response?.status) {
        setRows(Array.isArray(response.data) ? response.data : [])
      } else {
        setRows([])
      }
    } catch {
      setRows([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRows()
  }, [customerId, enquiryType])

  const handleSearch = () => {
    fetchRows({
      service: serviceSearch.trim(),
      date: dateFilter
    })
  }

  const handleReset = () => {
    setServiceSearch('')
    setDateFilter('')
    fetchRows({ service: '', date: '' })
  }

  return (
    <div className="content">
      <div className="pad">
        <div className="row align-items-center d-flex mb-3">
          <div className="col-md-12">
            <h3 className="text-start text-theme mb-2">{title}</h3>
          </div>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-md-5">
            <input
              type="text"
              className="form-control py-2 px-3 rounded-5"
              placeholder="Search by service name"
              value={serviceSearch}
              onChange={(event) => setServiceSearch(event.target.value)}
            />
          </div>
          <div className="col-md-3">
            <input
              type="date"
              className="form-control py-2 px-3 rounded-5"
              value={dateFilter}
              onChange={(event) => setDateFilter(event.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex gap-2">
            <button type="button" className="btn btn-secondary rounded-5 px-4" onClick={handleSearch}>
              Search
            </button>
            <button type="button" className="btn btn-outline-secondary rounded-5 px-4" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>Service</th>
                <th>Enquiry Date</th>
                <th>Profile</th>
                {enquiryType === 'callback' ? <th>Package</th> : null}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={enquiryType === 'callback' ? 4 : 3} className="text-center py-4">Loading...</td>
                </tr>
              ) : rows.length > 0 ? (
                rows.map((row) => {
                  const serviceImage = row?.service?.image || '/images/common/cart_img.jpg'
                  const profileImage = row?.business_profile?.profilePicture || '/images/common/user.png'
                  const packageImage = row?.package?.image || '/images/common/cart_img.jpg'
                  const profileId = row?.business_profile?._id

                  return (
                    <tr key={row._id}>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={`/api/image-proxy?url=${encodeURIComponent(serviceImage)}`}
                            alt={row?.service?.name || 'Service'}
                            style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
                          />
                          <span>{row?.service?.name || '--'}</span>
                        </div>
                      </td>
                      <td>{formatDate(row?.enquiry_date || row?.createdAt)}</td>
                      <td>
                        {row?.business_profile ? (
                          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={`/api/image-proxy?url=${encodeURIComponent(profileImage)}`}
                                alt={row?.business_profile?.businessName || 'Profile'}
                                style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                              />
                              <span>{row?.business_profile?.businessName || '--'}</span>
                            </div>
                            {profileId ? (
                              <Link href={`/services/d/${profileId}`} className="btn btn-sm btn-secondary rounded-5 px-3">
                                View Profile
                              </Link>
                            ) : null}
                          </div>
                        ) : (
                          <span className="text-muted">Profile not available</span>
                        )}
                      </td>
                      {enquiryType === 'callback' ? (
                        <td>
                          {row?.package?._id ? (
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={`/api/image-proxy?url=${encodeURIComponent(packageImage)}`}
                                alt={row?.package?.packageName || 'Package'}
                                style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
                              />
                              <span>{row?.package?.packageName || '--'}</span>
                            </div>
                          ) : (
                            <span className="text-muted">No package</span>
                          )}
                        </td>
                      ) : null}
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={enquiryType === 'callback' ? 4 : 3} className="text-center py-4 text-muted">
                    No {enquiryType === 'callback' ? 'callback requests' : 'enquiries'} found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default InquiryListTable
