"use client"
import React from 'react'
import "../public/assets/vendor/new.css";
import "../public/assets/vendor/style.css";
const Header = React.lazy(() => import('../components/vendor/Header'))
const Footer = React.lazy(() => import('../components/vendor/Footer'))

const VendorPanelTheme = ({children}) => {
  return (
    <>
    <Header />
    {children}
    <Footer />
    </>
  )
}

export default VendorPanelTheme
