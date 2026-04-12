import React from 'react'
import WithLayout from '@/hoc/WithLayout'

const PrivacyPolicy = () => {
  return (
   <section className="about-section py-3">
        <div className="container">
            <div className="row gx-4 pb-5 d-flex align-items-center">
                <h1>Privacy Policy</h1>
                <p>Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p>
                <h2>Information We Collect</h2>
                <p>We may collect personal information such as your name, email address, and payment information when you use our services.</p>
                <h2>How We Use Your Information</h2>
                <p>We use your information to provide and improve our services, process transactions, and communicate with you.</p>
                <h2>Data Security</h2>
                <p>We take data security seriously and implement measures to protect your information from unauthorized access.</p>
                <h2>Changes to This Policy</h2>
                <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on our website.</p>
            </div>
        </div>
  </section>
  )
}

export default WithLayout(PrivacyPolicy, 'frontend');
