
"use client";
import WithLayout from '@/hoc/WithLayout'
import React, { useEffect } from 'react'
import Vservice from '@/components/vendor/landingpage/Vservices'
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { serviceList } from '@/services/service-api';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplaySpeed: 4000,
    pauseOnHover: false,
};

const Slider: any = dynamic(() => import("react-slick"), {
  ssr: false,
});

// Service type based on service-slice.js
interface ServiceType {
    _id: string;
    serviceName: string;
    serviceType: string;
    imagePath: string;
    link?: string;
}

interface ServiceState {
    Services: ServiceType[];
    currentService: any;
    loading: boolean;
    error: string | null;
}

interface RootState {
    service: ServiceState;
}

const VendorLandingPage = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        (dispatch as any)(serviceList());
    }, [dispatch]);

    const { Services, loading, error } = useSelector((state: RootState) => state.service);

    // Helper function to create slug from service name
    const createSlug = (name: string) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

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
                    <Link
                    href={'/vendor/register'}
                    className="btn btn-secondary btn-lg abt-btn mt-2 mt-md-4 py-2 px-3 rounded-5 text-white"
                    >
                    <img
                        src="assets/vendor/images/icons/register-icon.png"
                        style={{ width: 20, height: 20, marginRight:'5px' }}
                    />
                    Let's Start
                    </Link>
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
                    <div className="main-title d-flex justify-content-between align-items-center px-3">
                        <h2>Main Services</h2>
                    </div>
                    <div className="services-list-sec" > 
                        {loading ? (
                        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#e0e0e0">
                            <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '10px' }}>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} width={196} height={243} />
                            ))}
                            </div>
                        </SkeletonTheme>
                        ) : (
                        <Slider {...settings}>
                            {Services.filter((service: ServiceType) => service.serviceType === 'Primary').map((service: ServiceType) => (
                                <div className="item text-center" key={service._id}>
                                    <Link href={`services/${createSlug(service.serviceName)}-${service._id}`}>
                                        <div className="box">
                                            <Image src={`/api/image-proxy?url=${encodeURIComponent(service.imagePath)}`} alt={service.serviceName} width={196} height={243} />
                                            <h5>{service.serviceName}</h5>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                        )}
                    </div>

                    <div className="main-title d-flex justify-content-between align-items-center px-3" style={{marginTop:'80px'}}>
                        <h2>Secondary Services</h2>
                    </div>
                    <div className="services-list-sec">
                        {loading ? (
                        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#e0e0e0">
                            <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', padding: '10px' }}>
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Skeleton key={index} width={196} height={243} />
                            ))}
                            </div>
                        </SkeletonTheme>
                        ) : (
                        <Slider {...settings}>
                            {Services.filter((service: ServiceType) => service.serviceType === 'Secondary').map((service: ServiceType) => (
                                <div className="item text-center" key={service._id}>
                                    <Link href={service.link || '/'}>
                                        <div className="box">
                                            <Image src={`/api/image-proxy?url=${encodeURIComponent(service.imagePath)}`} alt={service.serviceName} width={196} height={243} />
                                            <h5>{service.serviceName}</h5>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </Slider>
                        )}
                    </div>
                </div>     
            </div>
        </section>
    </>
  )
}

export default VendorLandingPage
