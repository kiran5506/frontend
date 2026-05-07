"use client";

import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import WithLayout from '@/hoc/WithLayout';
import { serviceList } from '@/services/service-api';

const createSlug = (name = '') => name.toLowerCase().trim().replace(/\s+/g, '-');

const ServicesLanding = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const cityId = searchParams?.get('city_id') || '';
  const cityName = searchParams?.get('city_name') || '';
  const { Services, loading } = useSelector((state: any) => state.service);

  useEffect(() => {
    (dispatch as any)(serviceList());
  }, [dispatch]);

  const serviceImageStyle = {
    width: '100%',
    height: 'clamp(180px, 52vw, 243px)',
    objectFit: 'cover' as const,
  };

  const servicesByType = useMemo(() => {
    const mappedServices = (Services || []).map((service: any) => {
      const slug = createSlug(service?.serviceName || 'service');
      const query = new URLSearchParams();

      if (cityId) query.set('city_id', cityId);
      if (cityName) query.set('city_name', cityName);
      query.set('query_text', service?.serviceName || '');
      query.set('query_type', 'Service');

      return {
        id: service?._id,
        name: service?.serviceName,
        imagePath: service?.imagePath,
        serviceType: service?.serviceType,
        href: `/services/${slug}-${service?._id}${query.toString() ? `?${query.toString()}` : ''}`,
      };
    });

    return {
      primary: mappedServices.filter((service: any) => service.serviceType === 'Primary'),
      secondary: mappedServices.filter((service: any) => service.serviceType === 'Secondary'),
    };
  }, [Services, cityId, cityName]);

  return (
    <section className="services-section bg-gray-color py-3">
      <div className="container">
        {/* <div className="main-title d-flex justify-content-between align-items-center mb-3">
          <h2>Select Service From {cityName}</h2>
        </div> */}
        {loading ? (
          <p>Loading services...</p>
        ) : (servicesByType.primary.length > 0 || servicesByType.secondary.length > 0) ? (
          <>
            <div className="services-list pt-2 pb-3">
              <div className="main-title d-flex justify-content-between align-items-center mb-3">
                <h2>{cityId ? `Main Services from ${cityName}` : 'Main Services'}</h2>
              </div>
              <div className="services-list-sec pdtopp">
                {servicesByType.primary.length > 0 ? (
                  <div className="row g-3">
                    {servicesByType.primary.map((service: any) => (
                      <div className="col-6 col-md-4 col-lg-3 col-xl-2" key={service.id}>
                        <div className="item text-center">
                          <Link href={service.href}>
                            <div className="box2">
                              <Image
                                src={service.imagePath ? `/api/image-proxy?url=${encodeURIComponent(service.imagePath)}` : '/images/common/noimage.jpg'}
                                alt={service.name || 'Service'}
                                width={196}
                                height={243}
                                style={serviceImageStyle}
                              />
                              <span className="service-name">{service.name}</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted mb-0">No main services found.</p>
                )}
              </div>
            </div>

            <div className="services-list pt-2 pb-4">
              <div className="main-title d-flex justify-content-between align-items-center mb-3">
                <h2>{cityId ? `Secondary Services form ${cityName}` : 'Secondary Services'}</h2>
              </div>
              <div className="services-list-sec pdtopp">
                {servicesByType.secondary.length > 0 ? (
                  <div className="row g-3">
                    {servicesByType.secondary.map((service: any) => (
                      <div className="col-6 col-md-4 col-lg-3 col-xl-2" key={service.id}>
                        <div className="item text-center">
                          <Link href={service.href}>
                            <div className="box2">
                              <Image
                                src={service.imagePath ? `/api/image-proxy?url=${encodeURIComponent(service.imagePath)}` : '/images/common/noimage.jpg'}
                                alt={service.name || 'Service'}
                                width={196}
                                height={243}
                                style={serviceImageStyle}
                              />
                              <span className="service-name">{service.name}</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted mb-0">No secondary services found.</p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-muted">No services found.</p>
        )}
      </div>
    </section>
  );
};

export default WithLayout(ServicesLanding, 'frontend');
