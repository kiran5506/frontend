import React, { Suspense } from "react";
import "../../../public/assets/vendor/custom.css";
import "../../../public/assets/vendor/register.css";
import { ToastContainer } from "react-toastify/unstyled";

export default function VendorBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="vendor-register-layout-bg">
      <ToastContainer />
      {children}
    </div>
  );
}
