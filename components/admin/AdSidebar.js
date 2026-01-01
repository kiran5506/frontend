"use client"
import { adminLogout } from '@/redux/features/admin-auth-slice'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import { BsChevronDown, BsChevronUp, BsCircle, BsGrid, BsLaptop, BsTools } from 'react-icons/bs'
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
    { name: 'Site Manager', icon: <BsLaptop />, link: '#', subMenu: [
        { name: 'Sliders', icon: <BsCircle />, link: '/admin/sliders' },
        { name: 'Services', icon: <BsCircle />, link: '/admin/services' },
        { name: 'Cities', icon: <BsCircle />, link: '/admin/cities' },
        { name: 'Events', icon: <BsCircle />, link: '/admin/events' },
        { name: 'Languages', icon: <BsCircle />, link: '/admin/languages' },
        { name: 'Lead Packages', icon: <BsCircle />, link: '/admin/leadpackages' },
        { name: 'Skills', icon: <BsCircle />, link: '/admin/skills' },
        { name: 'Tutorials', icon: <BsCircle />, link: '/admin/tutorials' },
      ]
    },
    { name: 'Site Settings', icon: <BsTools />, link: '/admin/site-settings' },
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
            <i className="bi bi-grid" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </aside>

  )
}

export default AdSidebar
