"use client";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import "../../../public/assets/vendor/vendor_layout.css"
import "../../../public/assets/vendor/vendor_layout_new.css"
import Link from "next/link";

const SidePanel = React.lazy(() => import("../../../components/vendor/SidePanel"));
const Rightmenu = React.lazy(() => import("../../../components/vendor/Rightmenu"));
const Footer = React.lazy(() => import("../../../components/vendor/Footer"));

export default function VendorBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = useSelector((state: any) => !!state?.vendorAuth?.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();
  
  // Extract page title from pathname
  const getPageTitle = () => {
    if (!pathname) return "Dashboard";
    
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1];
    
    if (!lastSegment) return "Dashboard";
    
    // Convert kebab-case or snake_case to Title Case
    return lastSegment
      .replace(/[-_]/g, " ")
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };
  
  const pageTitle = getPageTitle();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/vendor");
    }
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Suspense fallback={null}>
        <SidePanel />
      </Suspense>
      <main id="main" className="main">
        <header id="header" className="header d-flex align-items-center">
          <Link href={'/vendor/dashboard'} className="d-block d-lg-none dash-logo">
            <img src="assets/img/m-logo.png" alt="" width={120} />
          </Link>
          <nav className="d-none d-lg-block">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">
                <Link href={'/vendor/dashboard'}>Home</Link>
              </li>
              <li className="breadcrumb-item active">{pageTitle}</li>
            </ol>
          </nav>
          <nav className="header-nav ms-auto">
            <Suspense fallback={null}>
              <Rightmenu />
            </Suspense>
          </nav>
          {/* End Icons Navigation */}
          <ul className="mobile-menu">
            <li className="nav-item d-block d-lg-none">
              <i className="bi bi-list toggle-sidebar-btn" id="toggleSidebar" />
            </li>
          </ul>
        </header>

        {/* Content */}
        <section className="section dashboard dashboard-section p-0">
        <div className="content">
          <div className="pad" >
            {children}
            </div>
        </div>
      </section>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      </main>
    </>
  );
}
