import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

import logo from '../../public/images/common/footer-logo.png';



const Footer = () => {
    const socialLinks = [
        { href: 'https://facebook.com/', imgSrc: '/images/icons/footer-facebook.png', alt: 'Facebook' },
        { href: 'https://instagram.com/', imgSrc: '/images/icons/footer-insta.png', alt: 'Instagram' },
        { href: 'https://www.youtube.com/', imgSrc: '/images/icons/footer-youtube.png', alt: 'YouTube' },
        { href: 'https://wa.me/+919999999999', imgSrc: '/images/icons/footer-whatsapp.png', alt: 'WhatsApp' },
    ];

    const QuickLinks = [
        { href: '/', text: 'Home' , imgSrc: '/images/icons/right-arrow.png' },
        { href: '/about-us', text: 'About Us', imgSrc: '/images/icons/right-arrow.png' },
        { href: '/services', text: 'Services', imgSrc: '/images/icons/right-arrow.png' },
        { href: '/blog', text: 'Blog', imgSrc: '/images/icons/right-arrow.png' },
        { href: '/contact', text: 'Contact Us', imgSrc: '/images/icons/right-arrow.png' },
    ];

    const GetInTouch = [
        { href: '#', text: 'Hyderabad, Telangana', imgSrc: '/images/icons/footer-location.png' },
        { href: 'mailto:info@example.com', text: 'info@example.com', imgSrc: '/images/icons/footer-email.png' },
        { href: 'tel:+919999999999', text: '+91 99999 99999', imgSrc: '/images/icons/footer-call.png' },
    ];

  return (
    <footer>
        <div className="links-footer">
            <div className="container">
            <div className="row">
                <div className="col-md-12 mb-4">
                <h5>Wedding Vendors in over 100 cities :-</h5>
                <div className="mt-2">
                    <Link href="#">Caterers</Link>
                    <Link href="#">Wedding Invitations</Link>
                    <Link href="#">Wedding Gifts</Link>
                    <Link href="#">Wedding Photographers</Link>
                    <Link href="#">Wedding Music</Link>
                    <Link href="#">Wedding Transportation</Link>
                    <Link href="#">Tent House</Link>
                    <Link href="#">Wedding Entertainment</Link>
                    <Link href="#">Florists</Link>
                    <Link href="#">Wedding Videography</Link>
                    <Link href="#">Honeymoon</Link>
                    <Link href="#">Wedding Decorators</Link>
                    <Link href="#">Wedding Cakes</Link>
                    <Link href="#">Wedding DJ</Link>
                    <Link href="#">Pandits</Link>
                    <Link href="#">Photobooth</Link>
                    <Link href="#">Astrologers</Link>
                    <Link href="#">Party Places</Link>
                    <Link href="#">Wedding Choreographers</Link>
                </div>
                </div>
                <div className="col-md-12 mb-4">
                <h5>Wedding Vendors in over 100 cities :-</h5>
                <div className="mt-2">
                    <Link href="#">Caterers</Link>
                    <Link href="#">Wedding Invitations</Link>
                    <Link href="#">Wedding Gifts</Link>
                    <Link href="#">Wedding Photographers</Link>
                    <Link href="#">Wedding Music</Link>
                    <Link href="#">Wedding Transportation</Link>
                    <Link href="#">Tent House</Link>
                    <Link href="#">Wedding Entertainment</Link>
                    <Link href="#">Florists</Link>
                    <Link href="#">Wedding Videography</Link>
                    <Link href="#">Honeymoon</Link>
                    <Link href="#">Wedding Decorators</Link>
                    <Link href="#">Wedding Cakes</Link>
                    <Link href="#">Wedding DJ</Link>
                    <Link href="#">Pandits</Link>
                    <Link href="#">Photobooth</Link>
                    <Link href="#">Astrologers</Link>
                    <Link href="#">Party Places</Link>
                    <Link href="#">Wedding Choreographers</Link>
                </div>
                </div>
                <div className="col-md-12">
                <h5>Wedding Vendors in over 100 cities :-</h5>
                <div className="mt-2">
                    <Link href="#">Caterers</Link>
                    <Link href="#">Wedding Invitations</Link>
                    <Link href="#">Wedding Gifts</Link>
                    <Link href="#">Wedding Photographers</Link>
                    <Link href="#">Wedding Music</Link>
                    <Link href="#">Wedding Transportation</Link>
                    <Link href="#">Tent House</Link>
                    <Link href="#">Wedding Entertainment</Link>
                    <Link href="#">Florists</Link>
                    <Link href="#">Wedding Videography</Link>
                    <Link href="#">Honeymoon</Link>
                    <Link href="#">Wedding Decorators</Link>
                    <Link href="#">Wedding Cakes</Link>
                    <Link href="#">Wedding DJ</Link>
                    <Link href="#">Pandits</Link>
                    <Link href="#">Photobooth</Link>
                    <Link href="#">Astrologers</Link>
                    <Link href="#">Party Places</Link>
                    <Link href="#">Wedding Choreographers</Link>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="main-footer">
            <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-3 mb-5 mb-sm-5">
                <Link href="index.php">
                    <Image src={logo} alt="" width={150} />
                </Link>
                </div>
                <div className="col-md-3 col-lg-3 mb-5 mb-sm-0">
                <h4>Quick Links</h4>
                <ul>
                    {QuickLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href}>
                                <Image src={link.imgSrc} alt=""  width={17} height={17}/> {link.text}
                            </Link>
                        </li>
                    ))}
                </ul>
                </div>
                <div className="col-md-5 col-lg-3 mb-5 mb-sm-0">
                <h4>Get In Touch</h4>
                <div className="address">
                    <ul>
                        {GetInTouch.map((item, index) => (
                            <li key={index}>
                                <Link href={item.href}>
                                    <img src={item.imgSrc} alt=""  width={34} height={35}/> {item.text}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
                <div className="col-md-4 col-lg-3">
                <h4>Follow Us</h4>
                <div className="social">
                    <ul>
                    {socialLinks.map((link, index) => (
                        <li key={index}>
                            <Link href={link.href} target="_blank">
                                <Image src={link.imgSrc} alt={link.alt} width={40} height={40} />
                            </Link>
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="copyrights">
            <div className="container">
            <div className="row">
                <div className="col-md-6 text-center text-md-start">
                <p>Copyrights 2024 Bsfye. All Rights Reserved.</p>
                </div>
                <div className="col-md-6 text-center text-md-end">
                <p>
                    <Link href="terms_conditions.php">Terms &amp; Conditions</Link> |{" "}
                    <Link href="privacy_policy.php">Privacy Policy</Link>
                </p>
                </div>
            </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer
