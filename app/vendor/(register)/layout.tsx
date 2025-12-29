import React, { Suspense } from "react";
import "../../../public/assets/vendor/custom.css";
import "../../../public/assets/vendor/register.css";

export default function VendorBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="vendor-register-layout-bg">
      {children}
    </div>
  );
}
