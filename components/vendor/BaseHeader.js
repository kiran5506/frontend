"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const BaseHeader = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => {
        setScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    
  return (
    <header>
        <div className="main-header">
            <nav className={`navbar fixed-top navbar-expand-lg ${scrolled ? "scrolled" : ""}`}>
            <div className="container">
                <a className="navbar-brand" href="index.php">
                <img
                    src="/assets/vendor/images/common/logo-light.png"
                    alt="logo"
                    className="logo-light"
                />
                <img
                    src="/assets/vendor/images/common/logo.png"
                    alt="logo"
                    className="logo"
                />
                </a>
                <div className="menu-btn">
                <i className="fas fa-bars" />
                </div>
                <div
                className="collapse navbar-collapse  hidden-mobile"
                id="navbarNavDropdown"
                >
                <ul className="navbar-nav mx-lg-5">
                    <li className="nav-item">
                    <Link className="nav-link" aria-current="page" href={'/vendor'}>
                        Home
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" href={'/vendor/about'}>
                        About Us
                    </Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" href={'/vendor/tutorials'}>
                        Tutorials
                    </Link>
                    </li>
                </ul>
                </div>
                <div className="text-end d-none d-lg-block">
                <Link href={'/vendor/login'} className="btn btn-secondary me-2">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width={25}
                    height={25}
                    x={0}
                    y={0}
                    viewBox="0 0 24 24"
                    style={{ enableBackground: "new 0 0 512 512" }}
                    xmlSpace="preserve"
                    fillRule="evenodd"
                    className=""
                    >
                    <g>
                        <path
                        d="M12 12.5a2.25 2.25 0 1 0 .002 4.502A2.25 2.25 0 0 0 12 12.5zm0 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"
                        fill="#000000"
                        opacity={1}
                        data-original="#000000"
                        />
                        <path
                        d="M11.25 16.25v2.5a.75.75 0 0 0 1.5 0v-2.5a.75.75 0 0 0-1.5 0z"
                        fill="#000000"
                        opacity={1}
                        data-original="#000000"
                        />
                        <path
                        d="M20.118 12a2.75 2.75 0 0 0-2.75-2.75H6.632A2.75 2.75 0 0 0 3.882 12v8a2.75 2.75 0 0 0 2.75 2.75h10.736a2.75 2.75 0 0 0 2.75-2.75zm-1.5 0v8c0 .69-.559 1.25-1.25 1.25H6.632A1.25 1.25 0 0 1 5.382 20v-8c0-.69.559-1.25 1.25-1.25h10.736c.691 0 1.25.56 1.25 1.25z"
                        fill="#000000"
                        opacity={1}
                        data-original="#000000"
                        />
                        <path
                        d="M12 1.25A5.751 5.751 0 0 0 6.25 7v3c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75V7A5.751 5.751 0 0 0 12 1.25zm0 1.5A4.25 4.25 0 0 1 16.25 7v2.25h-8.5V7A4.25 4.25 0 0 1 12 2.75z"
                        fill="#000000"
                        opacity={1}
                        data-original="#000000"
                        />
                    </g>
                    </svg>
                    Login
                </Link>
                <Link href={'/vendor/register'} className="btn btn-primary">
                    <img
                    src="/assets/vendor/images/icons/register-icon-light.png"
                    style={{ width: 20, height: 20 }}
                    />
                    Register
                </Link>
                </div>
            </div>
            </nav>
            <div className="side-bar">
            <div className="menu-close-btn">
                <i className="fa-solid fa-xmark" />
            </div>
            <div className="menu">
                <div className="item">
                <Link href={'/vendor'}>Home</Link>
                </div>
                <div className="item">
                <Link href={'/vendor/about'}>About Us</Link>
                </div>
                <div className="item">
                <Link href={'/vendor/tutorials'}>Tutorials</Link>
                </div>
                <div className="item">
                <Link href={'/vendor/login'}>Login</Link>
                </div>
                <div className="item">
                <Link href={'/vendor/register'}>Register</Link>
                </div>
            </div>
            </div>
        </div>
        </header>

  )
}

export default BaseHeader
