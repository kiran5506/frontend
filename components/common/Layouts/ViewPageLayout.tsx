import Link from 'next/link'
import React, { ReactNode } from 'react'
import { BsArrowLeft } from 'react-icons/bs';

interface ViewPageLayoutProps {
  children: ReactNode;
  title: string;
  linkHref?: string;
}

const ViewPageLayout = ({ children, linkHref, title }: ViewPageLayoutProps) => {
  return (
    <section className="section">
        <div className="row">
            <div className="col-lg-8">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        {title}
                        {linkHref && (
                            <Link
                                href={linkHref}
                                className="btn btn-success btn-sm"
                                style={{ float: "right" }}
                            >
                               <BsArrowLeft /> Back
                            </Link>
                        )}
                    </h5>
                    {children}
                </div>
            </div>
            </div>
        </div>
    </section>
  )
}

export default ViewPageLayout
