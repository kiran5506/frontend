import React from 'react'
import FreelanceCard from '../../../../components/vendor/FreelanceCard'
import Link from 'next/link'

const Freelancers = () => {
  return (
    <>
      <div className="row justify-content-between align-items-center freelance-bx">
        <div className="col-md-3">
          <h2 className="page-title mb-0">Freelancers</h2>
        </div>
        <div className="col-md-6">
          <div className="searchbox">
            <div className="row row-cols-md-4 d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder=" City / Skill / Type"
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
          <FreelanceCard index={0} />
          <FreelanceCard index={1} />
          <FreelanceCard index={2} />
          <FreelanceCard index={3} />
        </div>
      </section>

    </>
  )
}

export default Freelancers
