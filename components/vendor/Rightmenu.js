import React from 'react'
import Link from 'next/link'

const Rightmenu = () => {
  return (
    <ul className="d-flex align-items-center">
        <li className="nav-item2" style={{ margin: "0px 13px 0px 13px" }}>
            <Link href="leads-management.php" className="nav-link">
            <span className="d-block d-lg-block pstatus_active"> Active</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link href="leads-management.php" className="nav-link">
            <img src="/assets/vendor/img/clipboard.png" alt="" />
            <span className="d-block d-lg-block"> 200</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link href="notifications.php" className="nav-link">
            <img src="/assets/vendor/img/icon-notifications.png" alt="" />
            <span className="d-block d-lg-block"> 3 No's </span>
            </Link>
        </li>
        <li className="nav-item d-block d-lg-block">
            <Link
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            >
            <img
                src="/assets/vendor/img/profile-img.jpg"
                alt=""
                style={{ borderRadius: 40 }}
            />
            <span> Profile</span>
            </Link>
            <ul className="dropdown-menu">
            <li>
                <Link className="dropdown-item" href="account-settings.php">
                My Profile
                </Link>
            </li>
            <li>
                <Link className="dropdown-item" href="../login.php">
                Logout
                </Link>
            </li>
            </ul>
        </li>
        </ul>

  )
}

export default Rightmenu
