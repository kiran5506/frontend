"use client";
import React from "react";
import "@/public/assets/frontend/custom.css";

const Header = React.lazy(() => import("../../../components/frontend/Header"));
const Footer = React.lazy(() => import("../../../components/frontend/Footer"));
const SideMenu = React.lazy(() => import("../../../components/customer/SideMenu"));

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <section className="dashboard-section py-5">
        <div className="container">
          <div className="row d-flex">
            <SideMenu />
            <div className="col-md-9 mb-3">
              {children}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

