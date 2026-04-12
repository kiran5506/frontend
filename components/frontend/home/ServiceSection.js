"use client";
import { serviceList } from '@/services/service-api';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatsCounts } from '@/services/stats-api';

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
  const [stats, setStats] = useState({ cities: 0, vendors: 0, customers: 0 });
  useEffect(() => {
    dispatch(serviceList());
  }, [dispatch]);

  useEffect(() => {
    let isMounted = true;
    const loadStats = async () => {
      try {
        const response = await fetchStatsCounts();
        if (isMounted && response?.status) {
          setStats({
            cities: response.data?.cities ?? 0,
            vendors: response.data?.vendors ?? 0,
            customers: response.data?.customers ?? 0,
          });
        }
      } catch (error) {
        // Keep default stats on error
      }
    };

    loadStats();
    return () => {
      isMounted = false;
    };
  }, []);

  const { Services, loading, error } = useSelector((state) => state.service);

  console.log("Services data:", Services);

  const funFacts = useMemo(() => ({
    cities: stats.cities,
    vendors: stats.vendors,
    customers: stats.customers,
  }), [stats]);

  // Helper function to create slug from service name
  const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const countItems = [
    { icon: '/images/icons/fun-fact-cities.png', label: 'Cities', start: 0, end: 800, value: funFacts.cities, duration: 500 },
    { icon: '/images/icons/fun-fact-vendors.png', label: 'Vendors', start: 0, end: 1000, value: funFacts.vendors, duration: 800 },
    { icon: '/images/icons/fun-fact-happy-customers.png', label: 'Happy Customers', start: 0, end: 1200, value: funFacts.customers, duration: 1000 },
  ];

  return (
    <section className="services-section bg-gray-color" id="services">
        <div className="container">
            <div className="fun-facts px-0 px-lg-2 py-3 py-lg-5 d-none d-md-block">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-7">
                    <div className="row text-center text-md-start">
                      {countItems.map((item, index) => (
                        <div className="col-4 col-sm-4 mb-3 mb-sm-0" key={index}>
                          <div className="d-block d-sm-flex align-items-center item">
                              <div className="flex-shrink-0">
                                  <Image src={item.icon} alt="" width={50} height={50}/>
                              </div>
                              <div className="flex-grow-1 ms-0 ms-md-3">
                                  <h2>
                                      <span className="counter" data-start={item.start} data-end={item.value} data-duration={item.duration}>
                                      {item.value}
                                      </span>
                                  </h2>
                                  <p>{item.label}</p>
                              </div>
                          </div>
                        </div>
                      ))}
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
