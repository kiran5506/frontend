"use client";
import { logout } from '@/redux/features/vendor-auth-slice';
import Link from 'next/link';
import React from 'react'
import { useDispatch } from 'react-redux';

const sidebarMenu = [
  { name: 'Dashboard', link: '/vendor/dashboard' },
  { name: 'Callback Requests', link: '/vendor/callbackrequests' },
  { name: 'Leads Management', link: '/vendor/leads-management' },
  { name: 'Business Profile', link: '/vendor/business-profile-details' },
  { name: 'Business Portfolio', link: '/vendor/business-portfolio' },
  { name: 'Business Packages', link: '/vendor/business-packages' },
  { name: 'Reviews Management', link: '/vendor/reviews-management' },
  { name: 'Freelancers', link: '/vendor/freelancers' },
  { name: 'Account Settings', link: '/vendor/account-settings' },
  { name: 'Tutorials', link: '/vendor/tutorials' },
  { name: 'Feedbacks', link: '/vendor/feedback' },
];

const SidePanel = () => {
    const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <aside id="sidebar" className="sidebar">
        <button
            id="closeSidebar"
            type='button'
            className="close-sidebar-btn d-block d-lg-none"
            aria-label="Close Sidebar"
        >
            <i className="bi bi-x-lg" />
        </button>
        <div className="mb-4">
            <Link href="/vendor/dashboard">
            <img src="/assets/vendor/img/logo.png" alt="" />
            </Link>
        </div>
        <ul className="sidebar-nav mb-4" id="sidebar-nav">
            {sidebarMenu.map((item) => (
                <li className="nav-item" key={item.link}>
                    <Link className="nav-link" href={item.link}>
                        <span>{item.name}</span>
                    </Link>
                </li>
            ))}

            <li className="nav-item">
                <button type='button' className="nav-link" onClick={handleLogout}>
                    <span>Logout</span>
                </button>
            </li>
        </ul>
    </aside>
  )
}

export default SidePanel
