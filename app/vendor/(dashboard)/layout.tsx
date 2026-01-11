"use client";
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import "../../../public/assets/vendor/vendor_layout.css"
import "../../../public/assets/vendor/vendor_layout_new.css"

const SidePanel = React.lazy(() => import("../../../components/vendor/SidePanel"));
const Rightmenu = React.lazy(() => import("../../../components/vendor/Rightmenu"));
const Footer = React.lazy(() => import("../../../components/vendor/Footer"));

export default function VendorBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // read vendor auth safely (keep selector pure)
  const isAuthenticated = useSelector((state: any) => !!state?.vendorAuth?.isAuthenticated);
  const router = useRouter();

  // if not authenticated, clear vendor tokens (if any) and redirect to vendor login
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/vendor"); // adjust path if your vendor login is different
    }
  }, [isAuthenticated, router]);

  // do not render dashboard layout/children if not authenticated
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
          <a href="dashboard.php" className="d-block d-lg-none dash-logo">
            <img src="assets/img/m-logo.png" alt="" width={120} />
          </a>
          <nav className="d-none d-lg-block">
            <ol className="breadcrumb m-0">
              <li className="breadcrumb-item">
                <a href="dashboard.php">Home</a>
              </li>
              <li className="breadcrumb-item active">Dashboard</li>
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
          {children}
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
