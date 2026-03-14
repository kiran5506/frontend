import React from 'react'

/**
 * Render star rating component
 * @param {number} rating - Rating value (1-5)
 * @returns {JSX} Star elements
 */
export const renderStars = (rating) => {
  const stars = []
  const ratingNum = Math.round(rating)

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <li key={i}>
        <i className={i <= ratingNum ? 'bi bi-star-fill' : 'bi bi-star'} />
      </li>
    )
  }
  return stars
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated text
 */
export const truncateText = (text, length = 250) => {
  if (!text) return ''
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

/**
 * Format date to readable string
 * @param {string} date - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Get status badge color
 * @param {string} status - Status value
 * @returns {string} Bootstrap badge class
 */
export const getStatusBadgeClass = (status) => {
  switch (status?.toLowerCase()) {
    case 'accepted':
      return 'bg-success'
    case 'rejected':
      return 'bg-danger'
    case 'pending':
      return 'bg-warning'
    default:
      return 'bg-secondary'
  }
}
