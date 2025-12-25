"use client";
import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb = () => {
  const pathname = usePathname(); // current path
  const segments = pathname.split("/").filter(Boolean);
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

                      const label = decodeURIComponent(segment)
                        .replace(/-/g, " ")
                        .replace(/\b\w/g, (c) => c.toUpperCase());
                      return (
                        isLast ? (
                          <span key={index}>
                            {'>'} {label}
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
