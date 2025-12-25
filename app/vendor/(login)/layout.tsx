import React, { Suspense } from "react";
import "../../../public/assets/vendor/custom.css";
import "../../../public/assets/vendor/login.css";

export default function VendorBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="vendor-login-layout-bg">
      {children}
    </div>
  );
}
