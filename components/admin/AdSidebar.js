"use client"
import { adminLogout } from '@/redux/features/admin-auth-slice'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { BsBoxArrowRight, BsBoxes, BsChevronDown, BsChevronUp, BsCircle, BsFillPersonVcardFill, BsGrid, BsLaptop, BsPerson, BsPersonCheck, BsTools } from 'react-icons/bs'
import { useDispatch } from 'react-redux'

const AdSidebar = () => {
  const pathname = usePathname();
  const [expandedMenus, setExpandedMenus] = useState({});
  console.log('Current Pathname:', pathname); // Debugging line
  
  const toggleMenu = (index) => {
    setExpandedMenus(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  const sidebarData = [
    { name: 'Dashboard', icon: <BsGrid />, link: '/admin/dashboard' },
    { name: 'Leads Management', icon: <BsPersonCheck />, link: '#', subMenu: [
        { name: 'Leads Collaborations', icon: <BsCircle />, link: '/admin/collaborations' },
        { name: 'Leads Reports', icon: <BsCircle />, link: '/admin/reports' },
    ]},
    { name: 'Approval Manager', icon: <BsPersonCheck />, link: '#', subMenu: [
        { name: 'Vendor Request', icon: <BsCircle />, link: '/admin/vendor-requests' },
        { name: 'Vendor Approved', icon: <BsCircle />, link: '/admin/vendor-approved' },
        { name: 'Rejected Vendors', icon: <BsCircle />, link: '/admin/vendor-rejected' },
    ]},
    { name: 'Feedbacks', icon: <BsBoxes />, link: '#', subMenu: [
        { name: 'Customers', icon: <BsCircle />, link: '/admin/feedbacks?type=customer' },
        { name: 'Vendors', icon: <BsCircle />, link: '/admin/feedbacks?type=vendor' },
    ]},
    { name: 'HR Manager', icon: <BsFillPersonVcardFill />, link: '#', subMenu: [
        { name: 'Vendor', icon: <BsCircle />, link: '/admin/vendors' },
        { name: 'Customers', icon: <BsCircle />, link: '/admin/customers' },
        { name: 'Employees', icon: <BsCircle />, link: '/admin/employees' },
    ]},
    { name: 'Site Manager', icon: <BsLaptop />, link: '#', subMenu: [
        { name: 'Sliders', icon: <BsCircle />, link: '/admin/sliders' },
        { name: 'Services', icon: <BsCircle />, link: '/admin/services' },
    { name: 'Videos', icon: <BsCircle />, link: '/admin/videos' },
        
        { name: 'Events', icon: <BsCircle />, link: '/admin/events' },
        { name: 'Cities', icon: <BsCircle />, link: '/admin/cities' },
        { name: 'Suggestions', icon: <BsCircle />, link: '/admin/suggestions' },
        { name: 'Languages', icon: <BsCircle />, link: '/admin/languages' },
        { name: 'Lead Packages', icon: <BsCircle />, link: '/admin/leadpackages' },
        { name: 'Skills', icon: <BsCircle />, link: '/admin/skills' },
        { name: 'Tutorials', icon: <BsCircle />, link: '/admin/tutorials' },
        { name: 'Testimonials', icon: <BsCircle />, link: '/admin/testimonials' },
      ]
    },
    { name: 'Site Settings', icon: <BsTools />, link: '/admin/site-settings' },
    { name: 'My Profile', icon: <BsPerson />, link: '/admin/profile' },
    // Add more sidebar items here as needed
  ];

  const dispatch = useDispatch();
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        {sidebarData.map((item, index) => (
          item?.subMenu ? (
            <li key={index} className="nav-item">
              <Link 
                className={`nav-link ${expandedMenus[index] ? '' : 'collapsed'}`}
                onClick={(e) => {
                  e.preventDefault();
                  toggleMenu(index);
                }}
                href="#"
                role="button"
                style={{ cursor: 'pointer' }}
              >
                {item.icon}<span>{item.name}</span> {expandedMenus[index] ? <BsChevronUp className="ms-auto" /> : <BsChevronDown className="ms-auto" />}
              </Link>
              <ul 
                id={`submenu-${index}`} 
                className={`nav-content ${expandedMenus[index] ? 'show' : 'collapse'}`}
              >
                {item?.subMenu?.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link className={`${pathname === subItem.link ? 'active' : ''}`} href={subItem.link}>
                      {subItem.icon}<span>{subItem.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li key={index} className="nav-item">
              <Link className={`nav-link ${pathname === item.link ? 'active' : ''}`} href={item.link}>
                {item.icon}
                <span>{item.name}</span>
              </Link>
            </li>
          )
        ))}
        <li className="nav-item">
          <button type='button' className="nav-link " onClick={() => dispatch(adminLogout())}>
            <BsBoxArrowRight />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </aside>

  )
}

export default AdSidebar
