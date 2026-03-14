"use client";
import React, { Suspense, useEffect } from "react";
import "../../../public/assets/admin/style.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/dist/client/components/navigation";
const AdHeader = React.lazy(() => import("../../../components/admin/AdHeader"));
const AdSidebar = React.lazy(() => import("../../../components/admin/AdSidebar"));
const AdFooter = React.lazy(() => import("../../../components/admin/AdFooter"));

export default function AdminBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isAuthenticated = useSelector((state: any) => !!state?.adminAuth?.isAuthenticated);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/admin");
    }
  }, [isAuthenticated, router]);
  
  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
        <AdHeader />
        <AdSidebar />
        <main id="main" className="main">{children}</main>
        <AdFooter />
    </>
  );
}
