import Link from 'next/link'
import React from 'react'

const DashboardCards = [
  {
    id: 1,
    title: "Callback Requests",
    icon: "",
    link: "callbackrequests.php",
    color: "bg5"
  },
  {
    id: 2,
    title: "Leads Management",
    icon: "/assets/vendor/img/dashboard-icon6.png",
    link: "leads-management.php",
    color: "bg6"
  },
  {
    id: 3,
    title: "Business Profile",
    icon: "/assets/vendor/img/dashboard-icon1.png",
    link: "business-profile-details.php",
    color: "bg1"
  },
  {
    id: 4,
    title: "Business Portfolio",
    icon: "/images/common/s2.jpg",
    link: "business-portfolio.php",
    color: "bg7"
  },
  {
    id: 5,
    title: "Transactions",
    icon: "/assets/vendor/img/dashboard-icon2.png",
    link: "transactions.php",
    color: "bg2"
  },
  {
    id: 6,
    title: "Reviews",
    icon: "/assets/vendor/img/dashboard-icon4.png",
    link: "reviews-management.php",
    color: "bg4"
  },
  {
    id: 7,
    title: "Freelancers",
    icon: "/assets/vendor/img/dashboard-icon5.png",
    link: "freelancers.php",
    color: "bg3"
  }
];

const Dashboard = () => {
  return (
    <>
      <h2 className="page-title">Dashboard</h2>
      <div className="row">
        {DashboardCards.map((card) => (
              <div
                key={card?.id}
                className="col-xxl-4 col-md-6 mb-3"
              >
                <Link href={card?.link}>
                  <div className={`info-card ${card?.color}`}>
                    <i className={card?.icon} />
                    <h5>{card?.title}</h5>
                  </div>
                </Link>
              </div>
            ))}
      </div>
    </>

  )
}

export default Dashboard
