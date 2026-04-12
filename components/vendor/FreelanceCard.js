import Link from 'next/link'
import React from 'react'

/**
 * @param {{ index: number, freelancer: any }} props
 */
const FreelanceCard = ({ index, freelancer }) => {
    const rawServices = freelancer?.services
    const services = Array.isArray(rawServices)
        ? rawServices
                .map((service) =>
                    typeof service === 'string' ? service : service?.serviceName
                )
                .filter(Boolean)
                .join(', ')
        : typeof rawServices === 'string'
        ? rawServices
        : rawServices?.serviceName || 'N/A'
        const profileImage = freelancer?.profileImage || 'assets/img/profile-img.jpg'
        const getProxyUrl = (url) =>
            url && url.startsWith('http')
                ? `/api/image-proxy?url=${encodeURIComponent(url)}`
                : url
    const name = freelancer?.name || 'Unknown Freelancer'
        const city =
            typeof freelancer?.city === 'string'
                ? freelancer.city
                : freelancer?.city?.cityName || 'N/A'
    const mobile = freelancer?.mobile || 'N/A'
    const email = freelancer?.email || 'N/A'
    const freelancerId = freelancer?._id || index

    return (
        <div
            className={`col-md-6 ${index % 2 === 0 ? 'right' : 'left'}`}
            style={{ marginBottom: '30px' }}
        >
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
                        <h5>{name}</h5>
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
                                <td className="col-md-7">{services}</td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>:</td>
                                <td>{city}</td>
                            </tr>
                            <tr>
                                <td>Mobile</td>
                                <td>:</td>
                                <td>{mobile}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>:</td>
                                <td>{email}</td>
                            </tr>
                        </tbody>
                    </table>
                    <Link
                        href={`/vendor/freelancers/view/${freelancerId}`}
                        className="btn orange-btn mt-3"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default FreelanceCard
