import React, { Suspense } from "react";
import "../../../public/assets/admin/style.css";
const AdHeader = React.lazy(() => import("../../../components/admin/AdHeader"));
const AdSidebar = React.lazy(() => import("../../../components/admin/AdSidebar"));
const AdFooter = React.lazy(() => import("../../../components/admin/AdFooter"));

export default function AdminBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <AdHeader />
        <AdSidebar />
        <main id="main" className="main">{children}</main>
        <AdFooter />
    </>
  );
}
