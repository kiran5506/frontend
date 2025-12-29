import React, { ReactNode } from 'react'

interface CreateLayoutProps {
  children: ReactNode;
  title: string;
}

const CreateLayout = ({ children, title }: CreateLayoutProps) => {
  return (
    <section className="section">
        <div className="row">
            <div className="col-lg-8">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default CreateLayout