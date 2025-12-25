import type { Metadata } from "next";
import ReduxProvider from "@/redux/provider";
import { Suspense } from "react";
import Loader from "@/components/Loader";
import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../app/globals.css";
import Providers from "./providers";


export const metadata: Metadata = {
  title: "Bsfye",
  description: "Bsfye",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers />
        <ReduxProvider>
          <Suspense fallback={<Loader />}>
            {children}
          </Suspense>
        </ReduxProvider>
      </body>
    </html>
  );
}
