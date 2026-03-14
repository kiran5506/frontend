import React, { Suspense } from "react";
import "../../../public/assets/vendor/custom.css";
import "../../../public/assets/vendor/otp.css";

export default function VendorBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="vendor-otp-layout-bg">
      {children}
    </div>
  );
}
