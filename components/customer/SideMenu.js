import { customerLogout } from '@/redux/features/customer-auth-slice';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react'
import { BsList } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const SideMenu = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const SideMenuLinks = [
    { href: '/c/dashboard', text: 'Dashboard' },
    { href: '/c/profile', text: 'My Profile' },
    { href: '/c/callbackrequests', text: 'Callback Requests' },
    { href: '/c/enquiries', text: 'Enquiries' },
    { href: '/c/wishlist', text: 'Favorites' },
    { href: '/c/change-password', text: 'Change Password' },
    { href: '/c/contact-support', text: 'Submit Feedback' },
  ];

  const handleLogout = () => {
      dispatch(customerLogout());
      toast.success('Logged out successfully!');
      router.push('/');
  }

  const customer =  JSON.parse(typeof window !== 'undefined' && localStorage.getItem('customerDetails'));

  return (
    <div className="col-md-3">
        <div className="content mb-4">
          <div className="py-3 px-4">
            <div className="d-flex align-items-center">
              <div className="flex-shrink-0">
                <img src="assets/images/common/user.png" alt="" width={75} />
              </div>
              <div className="flex-grow-1 ms-3">
                <p>Hello!</p>
                <h5>{customer ? customer.name : 'Guest'}</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="content mb-4">
          <div className="py-md-3 px-md-4">
            <ul className="dashboard-menu d-none d-md-block">
              {SideMenuLinks.map((link, index) => (
                <li key={index} className={link.href === pathname ? 'active' : ''}>
                  <Link href={link.href}>{link.text}</Link>
                </li>
              ))}
              <li>
                <button style={{ backgroundColor: 'white', color: 'black', border: 'none', padding: '15px' }} onClick={handleLogout}>Logout</button>
              </li>
            </ul>
            <Link
              className="btn btn-primary d-none d-md-none py-3"
              data-bs-toggle="collapse"
              href="#multiCollapseExample1"
              style={{ fontSize: 20 }}
            >
             <BsList /> Dashboard Menu
            </Link>
            <div
              className="collapse multi-collapse "
              id="multiCollapseExample1"
            >
              <ul className="dashboard-menu">
                {SideMenuLinks.map((link, index) => (
                  <li key={index} className={link.href === pathname ? 'active' : ''}>
                    <Link href={link.href}>{link.text}</Link>
                  </li>
                ))}
                <li>
                  <button style={{ backgroundColor: 'white', color: 'black', border: 'none', hover: { backgroundColor: 'lightgray' }, padding: '15px' }} onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}

export default SideMenu
