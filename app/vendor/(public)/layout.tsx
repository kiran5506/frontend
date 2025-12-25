import React, { Suspense } from "react";
import "../../../public/assets/vendor/custom.css"

const BaseHeader = React.lazy(() => import("../../../components/vendor/BaseHeader"));
const BaseFooter = React.lazy(() => import("../../../components/vendor/BaseFooter"));

export default function VendorBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={null}>
        <BaseHeader />
      </Suspense>

      {children}

      <Suspense fallback={null}>
        <BaseFooter />
      </Suspense>
    </>
  );
}
