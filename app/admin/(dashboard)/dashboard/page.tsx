"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsBox, BsCart, BsMap, BsPeople, BsShop, BsTools, BsTranslate } from 'react-icons/bs'
import { useDispatch } from 'react-redux';
import { getAdminDashboardCounts } from '@/services/admin-api';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const [dashboardCounts, setDashboardCounts] = useState({
    leads: 0,
    packages: 0,
    vendors: 0,
    customers: 0,
    cities: 0,
    languages: 0,
    skills: 0,
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await (dispatch as any)(getAdminDashboardCounts()).unwrap();
        if (response?.status && response?.data) {
          setDashboardCounts((prev) => ({ ...prev, ...response.data }));
        }
      } catch (error) {
        console.error('Failed to fetch dashboard counts', error);
      }
    })();
  }, [dispatch]);

  const  dashboardData = [
    { title: 'Leads', icon: <BsCart />, count: dashboardCounts.leads, link: '/admin/leads-collaborations' },
    { title: 'Packages', icon: <BsBox />, count: dashboardCounts.packages, link: '/admin/leadpackages' },
    { title: 'Vendors', icon: <BsShop />, count: dashboardCounts.vendors, link: '/admin/vendor-approved' },
    { title: 'Customers', icon: <BsPeople />, count: dashboardCounts.customers, link: '/admin/customers' },
    { title: 'Cities', icon: <BsMap />, count: dashboardCounts.cities, link: '/admin/cities' },
    { title: 'Languages', icon: <BsTranslate />, count: dashboardCounts.languages, link: '/admin/languages' },
    { title: 'Skills', icon: <BsTools />, count: dashboardCounts.skills, link: '/admin/skills' },
  ]

  return (
    <section className="section dashboard">
      <div className="row">
        {dashboardData && dashboardData.map((item, index) => (
          <div className="col-xxl-4 col-md-6" key={index}>
            <Link href={item.link}>
              <div className={`card info-card ${index % 2 === 0 ? 'customers-card' : 'revenue-card'} text-center`}>
                <div className="card-body">
                  <h5 className="card-title mt-3">{item.title}</h5>
                <div className="d-block">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center mx-auto">
                    {item.icon}
                  </div>
                  <div className="py-3">
                    <h6>{item.count}</h6>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        ))}
      </div>
    </section>

  )
}

export default DashboardPage
