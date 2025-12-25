import React from 'react'

const AdSidebar = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link " href="dashboard.php">
            <i className="bi bi-grid" />
            <span>Dashboard</span>
          </a>
        </li>
      </ul>
    </aside>

  )
}

export default AdSidebar
