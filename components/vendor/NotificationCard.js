import Link from 'next/link'
import React from 'react'
import { BsChatLeftText } from 'react-icons/bs'

const NotificationCard = ({ notificationData, type = ""}) => {
  return (
    <div className="notification-box">
      <div className="row">
        <div className="col-3 col-md-1 text-center">
          <BsChatLeftText />
        </div>
        <div className="col-12 col-md-11">
          <h4>{notificationData.title}</h4>
          <p>{notificationData.content}</p>
          {type !== "details" && (
            <Link href={`/vendor/notifications/${notificationData.id}`} className="btn orange-btn mt-3">
              Read More
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default NotificationCard
