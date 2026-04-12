import React from 'react'
import WithLayout from '@/hoc/WithLayout'

const TermsAndConditions = () => {
  return (
    <section className="about-section py-3">
        <div className="container">
            <div className="row gx-4 pb-5 d-flex align-items-center">
                <h1>Terms and Conditions</h1>
                <p>Welcome to our Terms and Conditions page. Please read these terms carefully before using our services.</p>
                <h2>Acceptance of Terms</h2>
                <p>By accessing or using our services, you agree to be bound by these terms and conditions.</p>
                <h2>Changes to Terms</h2>
                <p>We may update these terms from time to time. We will notify you of any changes by posting the new terms on our website.</p>
                <h2>Governing Law</h2>
                <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate.</p>
                </div>
        </div>
    </section>
  )
}

export default WithLayout(TermsAndConditions, 'frontend');
