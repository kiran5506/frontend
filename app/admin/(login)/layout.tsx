import React, { Suspense } from "react";
import "../../../public/assets/admin/style.css";


export default function AdminBaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
