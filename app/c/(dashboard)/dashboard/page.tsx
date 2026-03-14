import Link from 'next/link';
import Image from 'next/image';
import React from 'react'

const CustomerDashboard = () => {

    const itemData = [
        { href: '/c/profile', imgSrc: '/images/icons/dashboard-icon1.png', title: 'My Profile' },
        { href: '/c/callbackrequests', imgSrc: '/images/icons/dashboard-icon6.png', title: 'Callback Requests' },
        { href: '/c/enquiries', imgSrc: '/images/icons/dashboard-icon3.png', title: 'Enquiries' },
        { href: '/c/wishlist', imgSrc: '/images/icons/dashboard-icon4.png', title: 'My Favorites' },
        { href: '/c/change-password', imgSrc: '/images/icons/dashboard-icon5.png', title: 'Change Password' },
        { href: '/c/contact-support', imgSrc: '/images/icons/dashboard-icon6.png', title: 'Feedback' },
    ];

    const renderItem = (item: any) => (
        <div className="col-sm-6 col-md-4 mb-4" key={item.href}>
            <Link href={item.href}>
                <div className="item text-center">
                    <img src={item.imgSrc} alt={item.title} />
                    <h5>{item.title}</h5>
                </div>
            </Link>
        </div>
    );

  return (
    <div className="content">
        <div className="pad">
            <h3 className="text-start text-theme mb-3">Dashboard</h3>
            <div className="row">
                {itemData.map(item => renderItem(item))}
            </div>
        </div>
    </div>
  )
}

export default CustomerDashboard;
