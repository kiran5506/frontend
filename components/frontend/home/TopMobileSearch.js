import React from 'react'
import { FaSearch } from 'react-icons/fa'

const TopMobileSearch = () => {
  return (
    <div className="row mobile-search">
        <div className="col-md-12">
            <div className="search-container">
                <input
                type="text"
                id="service-search"
                className="service-search-bar"
                placeholder="Select Service / Vendor"
                />
                <div className="service-search-icon">
                <FaSearch />
                </div>
                <div id="service-suggestions" className="service-suggestions-box" />
            </div>
        </div>
    </div>
  )
}

export default TopMobileSearch
