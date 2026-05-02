"use client";
import Link from 'next/link'
import React, { useCallback } from 'react'
import { BsList } from 'react-icons/bs'
import styles from '../../public/assets/admin/AdHeader.module.css';
import { useSelector } from 'react-redux';

const AdHeader = () => {
  const details = useSelector((state) => state?.adminAuth?.details);

  let adminDetails = null;
  try {
    adminDetails = details ? JSON.parse(details) : null;
  } catch {
    adminDetails = null;
  }

  const adminName = adminDetails
    ? `${adminDetails.first_name || ''} ${adminDetails.last_name || ''}`.trim()
    : 'Admin';

  const profileImage = adminDetails?.profile_image
    ? `/api/image-proxy?url=${encodeURIComponent(adminDetails.profile_image)}`
    : '/assets/admin/img/profile-img.jpg';

  // Toggle sidebar visibility: add/remove a stable class on the sidebar element (id="sidebar")
  // and dispatch a custom event so other parts of the app can react if needed.
  const toggleSidebar = useCallback(() => {
    try {
      const sidebarEl = document.getElementById("sidebar");
      if (sidebarEl) {
        sidebarEl.classList.toggle("collapsed");
      } else {
        // fallback: toggle a class on body if sidebar element isn't present during initial render
        document.body.classList.toggle("sidebar-collapsed");
      }
      // emit an event other components can listen to
      window.dispatchEvent(new CustomEvent("vendor:toggleSidebar"));
    } catch {
      // ignore in non-browser environments
    }
  }, []);

  const handlemenu = useCallback(() => {
    try {
      const dropdowns = document.querySelectorAll('.nav-item.dropdown');
      dropdowns.forEach((dropdown) => {
        dropdown.classList.toggle('show');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
          menu.classList.toggle('show');
        }
      });
    } catch {
      // ignore in non-browser environments
    }
  }, []);

  return (
    <header id="header" className={`header fixed-top d-flex align-items-center ${styles.adHeader}`}>
      <div className="d-flex align-items-center justify-content-between">
        <Link href="/admin/dashboard" className="logo d-flex align-items-center">
          <img className={styles.logoImg} src="/assets/admin/img/logo.png" alt="" />
        </Link>
        <button
          type="button"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
          className={`btn btn-icon p-0 ms-2 ${styles.toggleBtn}`}
        >
          <BsList style={{fontSize: '1.5rem'}}/>
        </button>
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <Link
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              onClick={(event) => {
                event.preventDefault();
                handlemenu();
              }}
            >
              <img
                src={profileImage}
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">{adminName || 'Admin'}</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>{adminName || 'Admin'}</h6>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/admin/my-profile"
                >
                  <i className="bi bi-person" />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="/admin"
                >
                  <i className="bi bi-box-arrow-right" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>

  )
}

export default AdHeader
