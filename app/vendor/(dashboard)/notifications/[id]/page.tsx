import NotificationCard from '@/components/vendor/NotificationCard'
import React from 'react'

const NotificationDetails = () => {
  return (
    <div>
       <h2 className="page-title">Notifications</h2>
      <NotificationCard notificationData={{ id: 1, title: "New Message", content: "You have received a new message." }} type="details" />
    </div>
  )
}

export default NotificationDetails
