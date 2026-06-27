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

interface AssignedVendor {
  _id?: string
  name?: string
  mobile_number?: string
  profile_image?: string
  assignment_status?: string
  assigned_at?: string
}

interface InquiryRow {
  _id: string
  enquiry_type: InquiryType
  enquiry_date?: string
  createdAt?: string
  city_name?: string
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
  assigned_vendors?: AssignedVendor[]
}

const statusBadge: Record<string, string> = {
  assigned: 'bg-secondary',
  viewed: 'bg-info text-dark',
  accepted: 'bg-success',
  rejected: 'bg-danger',
  replace_requested: 'bg-warning text-dark',
  replaced: 'bg-primary',
  expired: 'bg-secondary opacity-50'
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
    fetchRows({ service: serviceSearch.trim(), date: dateFilter })
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
                <th>Date</th>
                <th>Business Profile</th>
                {enquiryType === 'callback' ? <th>Package</th> : null}
                <th>{enquiryType === 'callback' ? 'Assigned Vendor' : 'Vendors Notified'}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={enquiryType === 'callback' ? 5 : 4} className="text-center py-4">Loading…</td>
                </tr>
              ) : rows.length > 0 ? (
                rows.map((row) => {
                  const serviceImage = row?.service?.image || '/images/common/cart_img.jpg'
                  const profileImage = row?.business_profile?.profilePicture || '/images/common/user.png'
                  const packageImage = row?.package?.image || '/images/common/cart_img.jpg'
                  const profileId = row?.business_profile?._id
                  const vendors = row.assigned_vendors || []

                  return (
                    <tr key={row._id}>
                      {/* Service */}
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            src={`/api/image-proxy?url=${encodeURIComponent(serviceImage)}`}
                            alt={row?.service?.name || 'Service'}
                            style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 500 }}>{row?.service?.name || '--'}</div>
                            {row?.city_name && (
                              <small className="text-muted">{row.city_name}</small>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Date */}
                      <td style={{ whiteSpace: 'nowrap' }}>
                        {formatDate(row?.enquiry_date || row?.createdAt)}
                      </td>

                      {/* Business profile */}
                      <td>
                        {row?.business_profile ? (
                          <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={`/api/image-proxy?url=${encodeURIComponent(profileImage)}`}
                                alt={row?.business_profile?.businessName || 'Profile'}
                                style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                              />
                              <span style={{ fontSize: 13 }}>{row?.business_profile?.businessName || '--'}</span>
                            </div>
                            {profileId && (
                              <Link href={`/services/d/${profileId}`} className="btn btn-sm btn-secondary rounded-5 px-3">
                                View
                              </Link>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted" style={{ fontSize: 13 }}>Not available</span>
                        )}
                      </td>

                      {/* Package (callback only) */}
                      {enquiryType === 'callback' ? (
                        <td>
                          {row?.package?._id ? (
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={`/api/image-proxy?url=${encodeURIComponent(packageImage)}`}
                                alt={row?.package?.packageName || 'Package'}
                                style={{ width: 40, height: 40, borderRadius: 6, objectFit: 'cover' }}
                              />
                              <span style={{ fontSize: 13 }}>{row?.package?.packageName || '--'}</span>
                            </div>
                          ) : (
                            <span className="text-muted" style={{ fontSize: 13 }}>No package</span>
                          )}
                        </td>
                      ) : null}

                      {/* Assigned vendors */}
                      <td>
                        {vendors.length ? (
                          <ul className="list-unstyled mb-0">
                            {vendors.map((vendor, idx) => (
                              <li
                                key={`${row._id}-v-${vendor?._id || idx}`}
                                className="d-flex align-items-center gap-2 mb-1"
                              >
                                <span style={{ fontSize: 13, fontWeight: 500 }}>
                                  {vendor?.name || 'Vendor'}
                                </span>
                                {vendor?.assignment_status && (
                                  <span
                                    className={`badge ${statusBadge[vendor.assignment_status] || 'bg-secondary'}`}
                                    style={{ fontSize: 10 }}
                                  >
                                    {vendor.assignment_status}
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-muted" style={{ fontSize: 13 }}>Not assigned yet</span>
                        )}
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={enquiryType === 'callback' ? 5 : 4} className="text-center py-4 text-muted">
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
