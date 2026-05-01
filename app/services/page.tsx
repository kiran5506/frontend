"use client";

import React, { useEffect, useMemo } from 'react';
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

  const serviceLinks = useMemo(() => {
    return (Services || []).map((service: any) => {
      const slug = createSlug(service?.serviceName || 'service');
      const query = new URLSearchParams();
      if (cityId) query.set('city_id', cityId);
  if (cityName) query.set('city_name', cityName);
  query.set('query_text', service?.serviceName || '');
  query.set('query_type', 'Service');

      return {
        id: service?._id,
        name: service?.serviceName,
        href: `/services/${slug}-${service?._id}${query.toString() ? `?${query.toString()}` : ''}`,
      };
    });
  }, [Services, cityId, cityName]);

  return (
    <section className="services-section py-3">
      <div className="container">
        <div className="main-title d-flex justify-content-between align-items-center mb-3">
          <h2>{cityId ? 'Select Service for Your Location' : 'Select Service'}</h2>
        </div>

        {loading ? (
          <p>Loading services...</p>
        ) : serviceLinks.length > 0 ? (
          <div className="row">
            {serviceLinks.map((item: any) => (
              <div className="col-12 col-md-6 col-lg-4 mb-3" key={item.id}>
                <Link href={item.href} className="btn btn-light w-100 text-start">
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">No services found.</p>
        )}
      </div>
    </section>
  );
};

export default WithLayout(ServicesLanding, 'frontend');
