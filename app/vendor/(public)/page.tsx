import WithLayout from '@/hoc/WithLayout'
import React from 'react'
import Vservice from '@/components/vendor/landingpage/Vservices'

const MainServices = [
  {
    id: 1,
    title: "Photography",
    image: "/assets/vendor/images/services/sannai-melam.png",
    link: "/service",
    count: 10
  },
  {
    id: 2,
    title: "Web Development",
    image: "/assets/vendor/images/services/sannai-melam.png",
    link: "/service",
    count: 10
  },
  {
    id: 3,
    title: "Graphic Design",
    image: "/assets/vendor/images/services/sannai-melam.png",
    link: "/service",
    count: 10
  },
  {
    id: 4,
    title: "Photography",
    image: "/assets/vendor/images/services/sannai-melam.png",
    link: "/service",
    count: 10
  },
  {
    id: 5,
    title: "Web Development",
    image: "/assets/vendor/images/services/sannai-melam.png",
    link: "/service",
    count: 10
  },
  {
    id: 6,
    title: "Graphic Design",
    image: "/assets/vendor/images/services/sannai-melam.png",
    link: "/service",
    count: 10
  },
  {
    id: 7,
    title: "Photography",
    image: "/assets/vendor/images/services/sannai-melam.png",
    link: "/service",
    count: 10
  },
  {
    id: 8,
    title: "Web Development",
    image: "/assets/vendor/images/services/sannai-melam.png",
    link: "/service",
    count: 10
  },
  {
    id: 9,
    title: "Graphic Design",
    image: "/assets/vendor/images/services/sannai-melam.png",
    link: "/service",
    count: 10
  }
];

const VendorLandingPage = () => {

  return (
    <>
        {/* Hero Banner */}
        <section className="slider-section">
            <div className="container">
                <div className="row content d-flex align-items-center">
                <div className="col-12 col-lg-6">
                    <h1>
                    A Platform to
                    <br /> <span>Sell</span> Event Services <br />
                    as Packages
                    </h1>
                    <h6>
                    Register India's Leading Service Booking Platform and Grow your
                    Business Today.
                    </h6>
                    <a
                    href="register.php"
                    className="btn btn-secondary btn-lg abt-btn mt-2 mt-md-4 py-2 px-3 rounded-5 text-white"
                    >
                    <img
                        src="assets/vendor/images/icons/register-icon.png"
                        style={{ width: 20, height: 20 }}
                    />
                    Let's Start
                    </a>
                </div>
                <div className="col-12 col-lg-6 text-center text-md-end">
                    <img
                    src="assets/vendor/images/banners/slider-img1.png"
                    alt=""
                    className="image"
                    />
                </div>
                </div>
            </div>
        </section>

        {/* How it works */}
        <section className="services-section py-5 bg-gray-color">
            <div className="container">
                <div className="main-title text-center">
                    <h2>How it works</h2>
                </div>
                <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="how-it-works px-2 py-0 py-lg-2 ">
                    <div className="row text-md-start">
                        <div className="col-12 col-lg-4 col-sm-4 mb-3 mb-sm-2 text-center">
                        <div className="side-bx">
                            <img
                            src="assets/vendor/images/common/how-it-works1.png"
                            className="d-block w-80 m-auto"
                            />
                            <h5>Register</h5>
                            <p>Register your business on Bsfye Portal.</p>
                        </div>
                        </div>
                        <div className="col-12 col-lg-4 col-sm-4 mb-3 mb-sm-0 text-center">
                        <div className="blue-bx side-bx">
                            <img
                            src="assets/vendor/images/common/how-it-works2.png"
                            className="d-block w-80 m-auto"
                            />
                            <h5>Verify</h5>
                            <p>
                            Our Business Verification team will verify your account and
                            release to public.
                            </p>
                        </div>
                        </div>
                        <div className="col-12 col-lg-4 col-sm-4 mb-3 mb-sm-0 text-center">
                        <div className="side-bx">
                            <img
                            src="assets/vendor/images/common/how-it-works3.png"
                            className="d-block w-80 m-auto"
                            />
                            <h5>Sell Packages</h5>
                            <p>Create packages and grow your business.</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="main-title text-center">
                <h2 className="py-3 pt-4">Already 200+ Vendors Registered</h2>
                <button
                    type="button"
                    className="btn btn-secondary btn-lg py-2 px-2 rounded-5 mybttn"
                >
                    Build your Profile
                </button>
                </div>
            </div>
        </section>

        {/* Benefits */}
        <section className="services-section py-5">
            <div className="container">
                <div className="main-title text-center">
                <h2>Benefits of Bsfye Vendor Ship</h2>
                </div>
                <div className="fun-facts benefits_sec px-0 px-lg-2 py-3 py-lg-2">
                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-lg-8">
                    <div className="row text-center text-md-start">
                        <div className="col-12 col-sm-6 mb-3">
                        <div className="d-block d-sm-flex align-items-center img">
                            <div className="flex-shrink-0">
                            <img src="assets/vendor/images/icons/benefits_01.png" alt="" />
                            </div>
                            <div className="flex-grow-1 ms-0 ms-md-3">
                            <p>Receive Orders directly from customers</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3 ">
                        <div className="d-block d-sm-flex align-items-center img">
                            <div className="flex-shrink-0">
                            <img src="assets/vendor/images/icons/benefits_02.png" alt="" />
                            </div>
                            <div className="flex-grow-1 ms-0 ms-md-3">
                            <p>Access to Orders within your city limits</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                        <div className="d-block d-sm-flex align-items-center img">
                            <div className="flex-shrink-0">
                            <img src="assets/vendor/images/icons/benefits_03.png" alt="" />
                            </div>
                            <div className="flex-grow-1 ms-0 ms-md-3">
                            <p>Boost your online business by 3x</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3 ">
                        <div className="d-block d-sm-flex align-items-center img">
                            <div className="flex-shrink-0">
                            <img src="assets/vendor/images/icons/benefits_04.png" alt="" />
                            </div>
                            <div className="flex-grow-1 ms-0 ms-md-3">
                            <p>Enjoy a 0% commission fee.</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                        <div className="d-block d-sm-flex align-items-center img">
                            <div className="flex-shrink-0">
                            <img src="assets/vendor/images/icons/benefits_05.png" alt="" />
                            </div>
                            <div className="flex-grow-1 ms-0 ms-md-3">
                            <p>Build a Professional Fee.</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                        <div className="d-block d-sm-flex align-items-center img">
                            <div className="flex-shrink-0">
                            <img src="assets/vendor/images/icons/benefits_06.png" alt="" />
                            </div>
                            <div className="flex-grow-1 ms-0 ms-md-3">
                            <p>Enhance your Brand Recognition.</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                        <div className="d-block d-sm-flex align-items-center img">
                            <div className="flex-shrink-0">
                            <img src="assets/vendor/images/icons/benefits_07.png" alt="" />
                            </div>
                            <div className="flex-grow-1 ms-0 ms-md-3">
                            <p>Work with a dedicated relationship manager.</p>
                            </div>
                        </div>
                        </div>
                        <div className="col-12 col-sm-6 mb-3">
                        <div className="d-block d-sm-flex align-items-center img">
                            <div className="flex-shrink-0">
                            <img src="assets/vendor/images/icons/benefits_08.png" alt="" />
                            </div>
                            <div className="flex-grow-1 ms-0 ms-md-3">
                            <p>Benefit from weekly payments.</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>


        <section className="services-section py-5 bg-gray-color">
            <div className="container">
                <div className="services-list pt-0  pt-lg-0 pb-5">
                    <div className="main-title text-center">
                        <h2>Who can register as Vendor?</h2>
                    </div>

                    {/* Main Services */}
                    <Vservice title={'Main Services'} services={MainServices} />


                    {/* Secondary Services */}
                    <Vservice title={'Secondary Services'} services={MainServices} />
                </div>
            </div>
        </section>

        
    </>
  )
}

export default VendorLandingPage
