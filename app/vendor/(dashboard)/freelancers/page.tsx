"use client";
import React, { useEffect, useState } from 'react'
import FreelanceCard from '../../../../components/vendor/FreelanceCard'
import Link from 'next/link'
import { fetchFreelancers } from '@/services/freelancer-api'

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    let isMounted = true
    const params = searchTerm.trim() ? { q: searchTerm.trim() } : {}

    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchFreelancers(params)
        if (!response?.status) {
          if (isMounted) {
            setFreelancers([])
            setError(response?.message || 'Unable to load freelancers.')
          }
          return
        }
        if (isMounted) {
          setFreelancers(response?.data || [])
        }
      } catch (err: any) {
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              'Failed to load freelancers.'
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }, 400)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [searchTerm])
  return (
    <>
      <div className="row justify-content-between align-items-center freelance-bx">
        <div className="col-md-3">
          <h2 className="page-title mb-0">Freelancers</h2>
        </div>
        <div className="col-md-6">
          <div className="searchbox">
            <div className="row row-cols-1 d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, city, skills, or type"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <Link
            href="/vendor/freelancers/new"
            className="btn orange-btn btn-xs float-right"
          >
            Join as a Freelancer
          </Link>
        </div>
      </div>

      <section id="reviews-section">
        <div className="row justify-content-between freelancer-portfolio">
          {loading && (
            <div className="col-12">
              <p>Loading freelancers...</p>
            </div>
          )}
          {!loading && error && (
            <div className="col-12">
              <div className="alert alert-warning mb-0" role="alert">
                {error}
              </div>
            </div>
          )}
          {!loading && !error && freelancers.length === 0 && (
            <div className="col-12">
              <p className="mb-0">No freelancers found.</p>
            </div>
          )}
          {!loading && !error &&
            freelancers.map((freelancer, index) => (
              <FreelanceCard
                key={freelancer?._id || index}
                index={index}
                freelancer={freelancer}
              />
            ))}
        </div>
      </section>

    </>
  )
}

export default Freelancers
