import Link from 'next/link'
import React from 'react'

const AdHeader = () => {
  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <Link href="index.php" className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" alt="" />
        </Link>
        <i className="bi bi-list toggle-sidebar-btn" />
      </div>
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          <li className="nav-item dropdown pe-3">
            <Link
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src="assets/img/profile-img.jpg"
                alt="Profile"
                className="rounded-circle"
              />
              <span className="d-none d-md-block dropdown-toggle ps-2">Admin</span>
            </Link>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                <h6>Admin</h6>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center"
                  href="my_profile.php"
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
                  href="index.php"
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
