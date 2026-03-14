"use client";
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname(); // current path
  const segments = pathname.split("/").filter(Boolean);

  // Helper function to extract title from service slug
  const extractTitle = (segment) => {
    // If it's a service with ID like "service-4-6958940145be8fa31a6b770e"
    // Extract only the title part (everything before the last ID)
    const parts = segment.split('-');
    if (parts.length > 1 && /^[a-f0-9]{24}$/.test(parts[parts.length - 1])) {
      // Remove the MongoDB ObjectId (last part) and rejoin
      return parts.slice(0, -1).join('-');
    }
    return segment;
  };

  return (
    <section className="breadcrumb-list">
        <div className="container">
            <div className="row">
              <div className="col-sm-12">
                  <p> 
                    <Link href={'/'}>Home</Link> &nbsp;
                    {segments.map((segment, index) => {
                      const isLast = index === segments.length - 1;
                      const href = "/" + segments.slice(0, index + 1).join("/");

                      // Extract clean title without ID
                      const cleanSegment = extractTitle(segment);

                      const label = decodeURIComponent(cleanSegment)
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase());
                      return (
                        isLast ? (
                          <span key={index}>
                            {' >'} {label}
                          </span>
                        ) : (
                          <span key={index}>
                            {'>'} <Link href={href}>{label}</Link>
                          </span>
                        )
                      );
                    })}
                  </p>
              </div>
            </div>
        </div>
    </section>
  )
}

export default Breadcrumb
