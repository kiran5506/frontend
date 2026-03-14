import Link from 'next/link'
import React from 'react'

const FreelanceCard = ({index}) => {
  return (
    <div className={`col-md-6 ${index % 2 === 0 ? 'right' : 'left'}`} style={{ marginBottom: '30px' }}>
        <div className="review-bx">
            <div className="row review-top freelance align-items-center">
            <div className="col-2 col-lg-2">
                <img
                src="assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle w-100"
                />
            </div>
            <div className="col-8 col-lg-10 text-start">
                <h5>Govinda Rao</h5>
                <p>
                Verified by Bsfye&nbsp;&nbsp;
                <i className="bi bi-check-circle-fill primary-color" />
                </p>
            </div>
            </div>
            <div className="review-center">
            <table className="col-12 col-md-12 text-start">
                <tbody>
                <tr>
                    <td className="col-md-3">Services</td>
                    <td className="col-md-1">:</td>
                    <td className="col-md-7">Photography, Videography</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>:</td>
                    <td>Visakhapatnam</td>
                </tr>
                <tr>
                    <td>Mobile</td>
                    <td>:</td>
                    <td>+91 999 999 9999</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>sample@gmail.com</td>
                </tr>
                </tbody>
            </table>
            <Link href={`/vendor/freelancers/view/${index}`} className="btn orange-btn mt-3">
                View Details
            </Link>
            </div>
        </div>
    </div>
  )
}

export default FreelanceCard
