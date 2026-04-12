"use client";
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { fetchFreelancerById } from '@/services/freelancer-api'

type Freelancer = {
  _id?: string
  name?: string
  mobile?: string
  email?: string
  city?: string | { cityName?: string }
  services?: Array<string | { serviceName?: string }>
  skills?: string[] | string
  languages?: string[] | string
  profileImage?: string
  images?: string[]
  videos?: string[]
}

const ViewFreelancer = () => {
  const params = useParams()
  const freelancerId = Array.isArray(params?.id) ? params.id[0] : params?.id
  const [freelancer, setFreelancer] = useState<Freelancer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!freelancerId) {
      setLoading(false)
      setError('Freelancer ID is missing.')
      return
    }

    let isMounted = true
    const loadFreelancer = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchFreelancerById(freelancerId)
        if (!response?.status) {
          if (isMounted) {
            setFreelancer(null)
            setError(response?.message || 'Unable to load freelancer.')
          }
          return
        }
        if (isMounted) {
          setFreelancer(response?.data || null)
        }
      } catch (err) {
        if (isMounted) {
          let message = 'Failed to load freelancer.'
          if (err && typeof err === 'object') {
            const maybeResponse = err as { response?: { data?: { message?: string } } }
            message =
              maybeResponse.response?.data?.message ||
              (err as Error).message ||
              message
          }
          setError(message)
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadFreelancer()
    return () => {
      isMounted = false
    }
  }, [freelancerId])

  const services = Array.isArray(freelancer?.services)
    ? freelancer.services.join(', ')
    : freelancer?.services || 'N/A'
  const skills = Array.isArray(freelancer?.skills)
    ? freelancer.skills.join(', ')
    : freelancer?.skills || 'N/A'
  const languages = Array.isArray(freelancer?.languages)
    ? freelancer.languages.join(', ')
    : freelancer?.languages || 'N/A'
  const city =
    typeof freelancer?.city === 'string'
      ? freelancer.city
      : freelancer?.city?.cityName || 'N/A'
  const profileImage = freelancer?.profileImage || 'assets/img/profile-img.jpg'
  const images = freelancer?.images || []
  const videos = freelancer?.videos || []
  const getProxyUrl = (url?: string) =>
    url && url.startsWith('http')
      ? `/api/image-proxy?url=${encodeURIComponent(url)}`
      : url || ''

  return (
    <>
      <div className="row justify-content-between freelance-bx">
        <div className="col-md-4">
          <h2 className="page-title mb-0">Freelancer View</h2>
        </div>
        <div className="col-md-8">&nbsp;</div>
      </div>
      <section id="reviews-section">
        <div className="row justify-content-between freelancer-portfolio">
          {loading && (
            <div className="col-12">
              <p>Loading freelancer...</p>
            </div>
          )}
          {!loading && error && (
            <div className="col-12">
              <div className="alert alert-warning mb-0" role="alert">
                {error}
              </div>
            </div>
          )}
          {!loading && !error && freelancer && (
            <div className="col-md-12 lft">
              <div className="review-bx">
                <div className="row review-top freelance align-items-center">
                  <div className="col-2 col-lg-2">
                    <img
                      src={getProxyUrl(profileImage)}
                      alt="Profile"
                      className="rounded-circle w-100"
                    />
                  </div>
                  <div className="col-8 col-lg-10 text-start">
                    <h5>{freelancer?.name || 'Unknown Freelancer'}</h5>
                    <p>
                      Verified by Bsfye&nbsp;&nbsp;
                      <i className="bi bi-check-circle-fill primary-color" />
                    </p>
                  </div>
                </div>
                <div className="review-center">
                  <table className="col-12 col-md-12 text-start mytliri">
                    <tbody>
                      <tr>
                        <td>Services</td>
                        <td>: {services}</td>
                      </tr>
                      <tr>
                        <td>City</td>
                        <td>: {city}</td>
                      </tr>
                      <tr>
                        <td>Mobile</td>
                        <td>: {freelancer?.mobile || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>: {freelancer?.email || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td>Skills</td>
                        <td>: {skills}</td>
                      </tr>
                      <tr>
                        <td>Languages</td>
                        <td>: {languages}</td>
                      </tr>
                    </tbody>
                  </table>
                  {(images.length > 0 || videos.length > 0) && (
                    <div className="mt-3">
                      {images.length > 0 && (
                        <div className="mb-3">
                          <h6 className="mb-2">Images</h6>
                          <div className="d-flex flex-wrap gap-2">
                            {images.map((img, idx) => (
                              <img
                                key={`${img}-${idx}`}
                                src={getProxyUrl(img)}
                                alt={`Freelancer image ${idx + 1}`}
                                style={{
                                  width: 120,
                                  height: 120,
                                  objectFit: 'cover',
                                  borderRadius: 8,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {videos.length > 0 && (
                        <div>
                          <h6 className="mb-2">Videos</h6>
                          <div className="d-flex flex-wrap gap-3">
                            {videos.map((vid, idx) => (
                              <video
                                key={`${vid}-${idx}`}
                                src={getProxyUrl(vid)}
                                controls
                                preload="metadata"
                                style={{ width: 220, borderRadius: 8 }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {!loading && !error && !freelancer && (
            <div className="col-12">
              <p className="mb-0">Freelancer not found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default ViewFreelancer
