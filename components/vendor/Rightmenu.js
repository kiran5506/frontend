import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { logout } from '@/redux/features/vendor-auth-slice'
import { useDispatch, useSelector } from 'react-redux';

const Rightmenu = () => {
  const dispatch = useDispatch();
  const { registeredVendor } = useSelector((state) => state.vendorAuth || {});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const vendorDetailsRaw = useSelector((state) => state?.vendorAuth?.details);
  let vendorDetails = null;
  try {
      vendorDetails = vendorDetailsRaw ? JSON.parse(vendorDetailsRaw) : null;
  } catch {
      vendorDetails = null;
  }
  const canShowSidebarMenu =
      vendorDetails?.is_otp_verified === true &&
      vendorDetails?.is_profile_completed === true &&
      vendorDetails?.is_profile_verified === true;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

    const handleLogout = () => {
        dispatch(logout());
    };

  return (
    <ul className="d-flex align-items-center">
      {canShowSidebarMenu && (<>
        <li className="nav-item2" style={{ margin: "0px 13px 0px 13px" }}>
            <Link href="leads-management.php" className="nav-link">
            <span className="d-block d-lg-block pstatus_active"> Active</span>
            </Link>
        </li>
      
    <li className="nav-item">
            <Link href="leads-management.php" className="nav-link">
            <img src="/assets/vendor/img/clipboard.png" alt="" />
      <span className="d-block d-lg-block"> {registeredVendor?.credits ?? 0}</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link href="/vendor/notifications" className="nav-link">
            <img src="/assets/vendor/img/icon-notifications.png" alt="" />
            <span className="d-block d-lg-block"> 3 No's </span>
            </Link>
        </li></>
      )}
        <li className="nav-item d-block d-lg-block dropdown position-relative" ref={dropdownRef}>
            <button
                className="nav-link dropdown-toggle btn btn-link"
                type="button"
                id="profileDropdown"
                onClick={toggleDropdown}
                style={{ border: 'none', padding: '0.5rem', background: 'none' }}
                >
                <img
                    src="/assets/vendor/img/profile-img.jpg"
                    alt=""
                    style={{ borderRadius: 40 }}
                />
                <span> Profile</span>
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu dropdown-menu-end show" style={{ display: 'block', position: 'absolute', right: 0, top: '100%', minWidth: '200px', zIndex: 1000 }}>
                {canShowSidebarMenu && (
                <li>
                    <Link className="dropdown-item" href={'/vendor/account-settings'}>
                    My Profile
                    </Link>
                </li>
                )}
                <li>
                    <button type='button' className="nav-link" onClick={handleLogout} style={{ padding: '10px 15px' }}>
                        <span>Logout</span>
                    </button>
                </li>
              </ul>
            )}
        </li>
        </ul>

  )
}

export default Rightmenu
