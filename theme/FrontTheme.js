"use client"
import React from 'react'
import "../public/assets/frontend/custom.css"
import Breadcrumb from '@/components/frontend/Breadcrumb'
import { usePathname } from 'next/navigation'
const Header = React.lazy(() => import('../components/frontend/Header'))
const Footer = React.lazy(() => import('../components/frontend/Footer'))

const FrontTheme = ({children}) => {
  const pathname = usePathname();
  return (
    <>
      <Header />
      {pathname !== '/' && <Breadcrumb />}
      {children}
      <Footer />
    </>
  )
}

export default FrontTheme
