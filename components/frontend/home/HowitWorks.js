import Image from 'next/image'
import React from 'react'

const HowitWorks = () => {
  return (
    <section className="services-section py-3 d-none d-md-block" id="how-it-works">
        <div className="container">
            <div className="main-title text-center">
            <h2>How it works</h2>
            </div>
            <div className="row d-flex justify-content-center">
            <div className="col-md-10">
                <div className="how-it-works px-2 py-0 py-lg-5">
                <div className="row text-md-start">
                    <div className="col-6 col-sm-3 mb-3 mb-sm-0 text-center">
                    <div className="icon search">
                        <Image
                        src="/images/icons/how-it-works-1.png"
                        alt="Search Vendor"
                        width={40} height={40}
                        />
                    </div>
                    <h5>Search Vendor</h5>
                    </div>
                    <div className="col-6 col-sm-3 mb-3 mb-sm-0 text-center">
                    <div className="icon">
                        <Image
                        src="/images/icons/how-it-works-2.png"
                        alt="Search Vendor"
                        width={40} height={40}
                        />
                    </div>
                    <h5>Select Package</h5>
                    </div>
                    <div className="col-6 col-sm-3 mb-3 mb-sm-0 text-center">
                    <div className="icon">
                        <Image
                        src="/images/icons/how-it-works-3.png"
                        alt="Search Vendor"
                        width={40} height={40}
                        />
                    </div>
                    <h5>Confirm Booking</h5>
                    </div>
                    <div className="col-6 col-sm-3 mb-3 mb-sm-0 text-center">
                    <div className="icon">
                        <Image
                        src="/images/icons/how-it-works-4.png"
                        alt="Search Vendor"
                        width={40} height={40}
                        />
                    </div>
                    <h5>Let’s Celebrate</h5>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
    </section>

  )
}

export default HowitWorks
