import Link from 'next/link'
import React from 'react'
import { BsBox, BsCart, BsMap, BsPeople, BsShop, BsTools, BsTranslate } from 'react-icons/bs'

const DashboardPage = () => {
  const  dashboardData = [
    { title: 'Leads', icon: <BsCart />, count: '500+', link: 'leads.php' },
    { title: 'Packages', icon: <BsBox />, count: '150', link: 'services.php' },
    { title: 'Vendors', icon: <BsShop />, count: '145', link: 'vendors.php' },
    { title: 'Customers', icon: <BsPeople />, count: '1500', link: 'customers-list.php' },
    { title: 'Cities', icon: <BsMap />, count: '10+', link: 'cities.php' },
    { title: 'Languages', icon: <BsTranslate />, count: '10+', link: '#' },
    { title: 'Skills', icon: <BsTools />, count: '10+', link: '#' },
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
