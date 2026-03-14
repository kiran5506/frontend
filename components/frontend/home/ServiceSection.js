"use client";
import { serviceList } from '@/services/service-api';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux';

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    //autoplay: true,
    autoplaySpeed: 4000, // 4 seconds
    pauseOnHover: false,
};

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const ServiceSection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(serviceList());
  }, [dispatch]);

  const { Services, loading, error } = useSelector((state) => state.service);

  console.log("Services data:", Services);

  // Helper function to create slug from service name
  const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <section className="services-section bg-gray-color" id="services">
        <div className="container">
            <div className="fun-facts px-0 px-lg-2 py-3 py-lg-5 d-none d-md-block">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-7">
                <div className="row text-center text-md-start">
                    <div className="col-4 col-sm-4 mb-3 mb-sm-0">
                    <div className="d-block d-sm-flex align-items-center item">
                        <div className="flex-shrink-0">
                        <Image src="/images/icons/fun-fact-cities.png" alt="" width={50} height={50}/>
                        </div>
                        <div className="flex-grow-1 ms-0 ms-md-3">
                        <h2>
                            <span
                            className="counter"
                            data-start={0}
                            data-end={800}
                            data-duration={500}
                            >
                            0
                            </span>
                        </h2>
                        <p>Cities</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-4 col-sm-4 mb-3 mb-sm-0">
                    <div className="d-block d-sm-flex align-items-center item">
                        <div className="flex-shrink-0">
                        <Image src="/images/icons/fun-fact-vendors.png" alt="" width={50} height={50}/>
                        </div>
                        <div className="flex-grow-1 ms-0 ms-md-3">
                        <h2>
                            <span
                            className="counter"
                            data-start={0}
                            data-end={1000}
                            data-duration={800}
                            >
                            0
                            </span>
                        </h2>
                        <p>Vendors</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-4 col-sm-4 mb-3 mb-sm-0">
                    <div className="d-block d-sm-flex align-items-center item">
                        <div className="flex-shrink-0">
                        <Image
                            src="/images/icons/fun-fact-happy-customers.png"
                            alt=""
                            width={50} height={50}
                        />
                        </div>
                        <div className="flex-grow-1 ms-0 ms-md-3">
                        <h2>
                            <span
                            className="counter"
                            data-start={0}
                            data-end={1200}
                            data-duration={1000}
                            >
                            0
                            </span>
                        </h2>
                        <p>Happy Customers</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="services-list pt-4 pt-lg-0 pb-2">
                <div className="main-title d-flex justify-content-between align-items-center ">
                    <h2>Main Services</h2>
                </div>
                <div className="services-list-sec pdtopp" style={{width: '100%'}}> 
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
                        {Services.map(service => service.serviceType === 'Primary' && (
                            <div className="item text-center" key={service._id}>
                                <Link href={`services/${createSlug(service.serviceName)}-${service._id}`}>
                                    <div className="box2">
                                        <Image src={`/api/image-proxy?url=${encodeURIComponent(service.imagePath)}`} alt={service.serviceName} width={196} height={243} />
                                        <span className="service-name">{service.serviceName}</span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                  )}
                </div>
            </div>
            
            <div className="services-list pt-3 pt-lg-0 pb-5">
                <div className="main-title d-flex justify-content-between align-items-center ">
                    <h2>Secondary Services</h2>
                </div>
                <div className="services-list-sec pdtopp">
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
                        {Services.map(service => service.serviceType === 'Secondary' && (
                            <div className="item text-center" key={service._id}>
                                <Link href={service.link || '/'}>
                                    <div className="box2">
                                        <Image src={`/api/image-proxy?url=${encodeURIComponent(service.imagePath)}`} alt={service.serviceName} width={196} height={243} />
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
  )
}

export default ServiceSection
