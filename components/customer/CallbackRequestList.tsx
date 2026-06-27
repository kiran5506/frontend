'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { customerInquiryList } from '@/services/inquiry-api'

interface AssignedVendor {
  assignment_id?: string
  assignment_status?: string
  assigned_at?: string
  vendor_id?: string
  vendor_name?: string
  vendor_mobile?: string
  vendor_profile_image?: string
  profile_id?: string
  profile_name?: string
  profile_image?: string
  min_offer_price?: number
  max_market_price?: number
  discount_percent?: number
}

interface PackageInfo {
  _id?: string
  packageName?: string
  image?: string
}

interface CallbackRow {
  _id: string
  enquiry_type: 'enquiry' | 'callback'
  enquiry_date?: string
  createdAt?: string
  city_name?: string
  service?: { _id?: string; name?: string; image?: string }
  package?: PackageInfo | null
  assigned_vendors?: AssignedVendor[]
}

const toProxy = (url?: string) => {
  if (!url) return ''
  const n = String(url).trim()
  if (!n) return ''
  if (n.startsWith('/') || n.startsWith('data:') || n.startsWith('blob:')) return n
  return `/api/image-proxy?url=${encodeURIComponent(n)}`
}

const formatPrice = (v?: number) =>
  typeof v === 'number' && v > 0 ? v.toLocaleString('en-IN') : ''

const CallbackRequestList = () => {
  const dispatch = useDispatch()
  const customerAuth = useSelector((state: any) => state.customerAuth)

  const customerDetails = useMemo(() => {
    if (!customerAuth?.details) return null
    if (typeof customerAuth.details === 'string') {
      try { return JSON.parse(customerAuth.details) } catch { return null }
    }
    return customerAuth.details
  }, [customerAuth?.details])

  const customerId = customerDetails?._id
  const [rows, setRows] = useState<CallbackRow[]>([])
  const [loading, setLoading] = useState(false)

  const toDateKey = (value?: string): string => {
    if (!value) return '0000-00-00'
    const parsed = new Date(value)
    if (Number.isNaN(parsed.getTime())) return '0000-00-00'
    return parsed.toISOString().split('T')[0]
  }

  const formatDisplayDate = (isoKey: string): string => {
    if (isoKey === '0000-00-00') return 'Unknown Date'
    const [y, m, d] = isoKey.split('-')
    return `${d}-${m}-${y}`
  }

  useEffect(() => {
    const fetchRows = async () => {
      if (!customerId) { setRows([]); return }
      setLoading(true)
      try {
        const response = await (dispatch as any)(
          // @ts-ignore
          customerInquiryList({ customer_id: customerId, enquiry_type: 'callback', limit: '200' })
        ).unwrap()
        if (response?.status) {
          const data: CallbackRow[] = Array.isArray(response.data) ? response.data : []
          const sorted = [...data].sort((a, b) => {
            const tA = new Date(a.enquiry_date || a.createdAt || 0).getTime()
            const tB = new Date(b.enquiry_date || b.createdAt || 0).getTime()
            return tB - tA
          })
          setRows(sorted)
        } else {
          setRows([])
        }
      } catch {
        setRows([])
      } finally {
        setLoading(false)
      }
    }
    fetchRows()
  }, [customerId])

  // Group by date key — Map preserves insertion order (already sorted desc)
  const groupedByDate = useMemo(() => {
    const map = new Map<string, CallbackRow[]>()
    rows.forEach((row) => {
      const key = toDateKey(row.enquiry_date || row.createdAt)
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(row)
    })
    return map
  }, [rows])

  return (
    <div className="content">
      <div className="pad">
        <div className="row align-items-center d-flex mb-4">
          <div className="col-md-12">
            <h3 className="text-start text-theme mb-0">Callback Requests</h3>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5 text-muted">Loading...</div>
        ) : groupedByDate.size === 0 ? (
          <div className="text-center py-5 text-muted">No callback requests found.</div>
        ) : (
          Array.from(groupedByDate.entries()).map(([dateKey, items]) => {
            const firstCity = items.find((i) => i.city_name)?.city_name
            const serviceName = items[0]?.service?.name || 'Services'
            const displayDate = formatDisplayDate(dateKey)

            return (
              <div className="enboxx" key={dateKey}>
                {/* ── Date group header ── */}
                <p className="enquiry-text2">
                  {firstCity
                    ? <>{serviceName} from <span>{firstCity} at {displayDate}</span></>
                    : <>Callback Requests on <span>{displayDate}</span></>
                  }
                </p>

                {/* ── One card per callback row (each row = 1 package-specific callback) ── */}
                {items.map((row) => {
                  // Each callback row has exactly one assigned_vendor (the package owner)
                  const vendor = row.assigned_vendors?.[0]

                  const profileImg = toProxy(vendor?.profile_image || vendor?.vendor_profile_image)
                    || '/images/common/cart_img.jpg'
                  const profileName = vendor?.profile_name || vendor?.vendor_name || 'Business'
                  const mobileRaw = vendor?.vendor_mobile || ''
                  const mobileDisplay = mobileRaw.length === 10
                    ? `${mobileRaw.slice(0, 5)} ${mobileRaw.slice(5)}`
                    : mobileRaw
                  const waLink = mobileRaw
                    ? `https://api.whatsapp.com/send/?phone=91${mobileRaw}&text&type=letmeknowcostbsfye`
                    : '#'
                  const profileLink = vendor?.profile_id ? `/services/d/${vendor.profile_id}` : null
                  const offerPrice = vendor?.min_offer_price || 0
                  const discountPct = vendor?.discount_percent || 0

                  // Package info for this specific callback
                  const pkg = row.package
                  const packageImg = toProxy(pkg?.image) || '/images/common/cart_img.jpg'
                  const packageName = pkg?.packageName || ''

                  return (
                    <div className="enquiry-bx wishlist mb-2" key={row._id}>
                      <div className="row d-flex align-items-center">

                        {/* ── Profile / cover image with discount tag ── */}
                        <div className="col-12 col-sm-6 col-lg-3 position-relative">
                          {discountPct > 0 && (
                            <div className="discount col-sm-12 float-end">
                              <Image
                                src="/images/common/tag.png"
                                alt=""
                                width={70}
                                height={70}
                                style={{ padding: 10 }}
                              />
                            </div>
                          )}
                          <img
                            src={profileImg}
                            alt={profileName}
                            className="photo2"
                            onError={(e) => { e.currentTarget.src = '/images/common/cart_img.jpg' }}
                          />
                        </div>

                        {/* ── Business name + pricing + package ── */}
                        <div className="col-12 col-sm-6 col-lg-4 inhead">
                          <h5>
                            {profileName}&nbsp;
                            <Image
                              src="/images/icons/order-status_01.png"
                              alt=""
                              width={20}
                              height={20}
                            />
                          </h5>

                          {offerPrice > 0 && (
                            <h6>
                              ₹ {formatPrice(offerPrice)}
                              <span style={{ fontSize: 12 }}> /Onwards</span>
                              {discountPct > 0 && (
                                <span style={{ fontSize: 12 }} className="diso">
                                  &nbsp;{discountPct}% Off
                                </span>
                              )}
                            </h6>
                          )}

                          {/* Package block — unique to callback */}
                          {packageName && (
                            <div className="d-flex align-items-center gap-2 mt-2">
                              <img
                                src={packageImg}
                                alt={packageName}
                                style={{ width: 36, height: 36, borderRadius: 6, objectFit: 'cover' }}
                                onError={(e) => { e.currentTarget.src = '/images/common/cart_img.jpg' }}
                              />
                              <span style={{ fontSize: 12, color: '#555' }}>
                                📦 {packageName}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* ── WhatsApp / mobile ── */}
                        <div className="col-12 col-sm-7 col-lg-3">
                          {mobileDisplay && (
                            <p className="mb-0">
                              <a
                                href={waLink}
                                className="px-4"
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Image
                                  src="/images/icons/whatsapp.png"
                                  alt=""
                                  width={20}
                                  height={20}
                                />
                                &nbsp;{mobileDisplay}
                              </a>
                            </p>
                          )}
                        </div>

                        {/* ── Profile button → new tab ── */}
                        <div className="col-12 col-sm-5 col-lg-2 text-end">
                          {profileLink && (
                            <Link
                              href={profileLink}
                              className="btn btn-secondary py-2 px-3"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Profile
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default CallbackRequestList
