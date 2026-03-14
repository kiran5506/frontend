import WithLayout from '@/hoc/WithLayout'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Vendorslist from '@/components/frontend/ServiceDetails/Vendorslist'
import "./servicedetails.css"

const ServiceDetails = () => {
  return (
    <>
        <section className="main-banner">
            <div className="container">
                <div className="row">
                <div className="col-sm-12">
                    <Image
                    src="/images/services/banner_img.jpg"
                    alt=""
                    className="w-100 rounded-4"
                    width={1296}
                    height={421}
                    />
                </div>
                </div>
                <div className="row d-flex justify-content-center n-mt-30">
                <div className="col-12 col-md-12 col-lg-9">
                    <div className="item services-view featured-item">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-4 col-lg-3 text-center text-md-start top-img">
                        <Image
                            src="/images/services/profile-pic.jpg"
                            alt=""
                            className="profile-pic"
                            width={150}
                            height={150}
                        />
                        </div>
                        <div className="col-md-8 col-lg-9">
                        <div className="content-sec">
                            <div className="d-flex">
                            <small>Bridal Makeup</small>
                            </div>
                            <h1>
                            Shashikala Makeup Artist
                            <Image
                                src="/images/icons/order-status_01.png"
                                alt=""
                                width={30}
                                height={30}
                            />
                            </h1>
                            <h3>
                            
                            <span className="diso"> Verified ✓ </span> &nbsp; &nbsp;Vendor
                            from Visakhapatnam
                            </h3>
                            <ul>
                            <li>
                                <Image
                                src="/images/icons/suggestions-rating.png"
                                alt=""
                                width={15}
                                height={15}
                                />
                                4.8 Rating (200 Reviews)
                            </li>
                            </ul>
                            <div className="mydivdd">
                            <Link href="wishlist.php" className="wishlist_con">
                                <Image src="/images/icons/wishlist.svg" alt="" width={20} height={20} />
                            </Link>
                            <Link
                                href="https://api.whatsapp.com/send/?phone=919985886393&text&type=letmeknowcostbsfye"
                                target="_blank"
                                className="whatsapp_con"
                            >
                                <Image src="/images/icons/whatsapp.png" alt="" width={20} height={20} />
                            </Link>
                            <Link href="#" target="_blank" className="share_con">
                                <Image src="/images/icons/share.png" alt="" width={20} height={20} />
                            </Link>
                            </div>
                            <h2>
                            ₹ 6,000 <span style={{ fontSize: 12 }}>/Onwards</span>
                            <span style={{ fontSize: 12 }} className="diso">
                                
                                50% Off
                            </span>
                            </h2>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <section className="service-view content_sec ">
            <div id="sticky-wrapper">
                <div className="container" id="top-menu">
                <div className="item">
                    {/* Dropdown Toggle for Mobile */}
                    <div className="d-md-none mb-2 text-center">
                    <ul className="mobile-link-menu">
                        <li>
                        <Link className="d-flex align-items-center" href="#portfolio">
                            
                            Portfolio
                        </Link>
                        </li>
                        <li>
                        <Link className="d-flex align-items-center" href="#services">
                            Packages
                        </Link>
                        </li>
                        <li>
                        <Link
                            className="dropdown-item d-flex align-items-center"
                            href="#about"
                        >
                            
                            About
                        </Link>
                        </li>
                        <li>
                        <Link
                            className="dropdown-item d-flex align-items-center"
                            href="#reviews"
                        >
                            
                            Reviews
                        </Link>
                        </li>
                    </ul>
                    </div>
                    {/* Normal Horizontal Menu for Desktop */}
                    <div className="menu d-none d-md-block">
                        <ul className="d-flex justify-content-between align-items-center list-unstyled mb-0">
                            <li>
                            <Link href="#portfolio" className="d-flex align-items-center">
                                <Image
                                src="/images/icons/service-menu-icon2.png"
                                alt=""
                                className="me-2"
                                width={20}
                                height={20}
                                />
                                Portfolio
                            </Link>
                            </li>
                            <li>
                            <Link href="#services" className="d-flex align-items-center">
                                <Image
                                src="/images/icons/service-menu-icon1.png"
                                alt=""
                                className="me-2"
                                width={20}
                                height={20}
                                />
                                Packages
                            </Link>
                            </li>
                            <li>
                            <Link href="#about" className="d-flex align-items-center">
                                <Image
                                src="/images/icons/service-menu-icon3.png"
                                alt=""
                                className="me-2"
                                width={20}
                                height={20}
                                />
                                About Us
                            </Link>
                            </li>
                            <li>
                            <Link href="#reviews" className="d-flex align-items-center">
                                <Image
                                src="/images/icons/service-menu-icon4.png"
                                alt=""
                                className="me-2"
                                width={20}
                                height={20}
                                />
                                Reviews
                            </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="clearfix" />
                </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                <div className="col-sm-12" id="portfolio">
                    <div className="item mt-4">
                    <div className="row">
                        <div className="col-md-3 col-lg-3">
                        <h4 className="mb-3">
                            
                            <span> Portfolio &nbsp; &nbsp;</span>
                            <span style={{ fontSize: 13 }}>
                            
                            <Link href="#photos">Photos </Link> (30)
                            </span>
                            <span style={{ fontSize: 13 }}>
                            
                            <Link href="#videos">Videos </Link> (5)
                            </span>
                        </h4>
                        </div>
                        <div className="col-md-4 col-lg-3">
                        <form className="mb-4">
                            <div className="row gx-2 d-flex align-items-center">
                            <div className="col-18">
                                <div className="search-container">
                                <input
                                    type="text"
                                    id="search-package"
                                    className="search-package"
                                    placeholder="Choose Service"
                                />
                                <div className="search-icon">
                                    <i className="fas fa-search" />
                                </div>
                                <div
                                    id="package-suggestions"
                                    className="package-suggestions-box"
                                />
                                </div>
                            </div>
                            </div>
                        </form>
                        </div>
                    </div>


                    </div>
                    <div className="col-sm-12" id="services">
                    <div className="item mt-4">
                        <div className="row">
                        <div className="col-md-3 col-lg-3">
                            <h4 className="mb-3">
                            
                            <span> Packages &nbsp; &nbsp; </span>
                            <span style={{ fontSize: 13 }}>
                                
                                <Link href="#photos"> Packages </Link> (30)
                            </span>
                            </h4>
                        </div>
                        <div className="col-md-4 col-lg-3">
                            <form className="mb-4">
                            <div className="row gx-2 d-flex align-items-center">
                                <div className="col-18">
                                <div className="search-container">
                                    <input
                                    type="text"
                                    id="search-package"
                                    className="search-package"
                                    placeholder="Choose Service"
                                    />
                                    <div className="search-icon">
                                    <i className="fas fa-search" />
                                    </div>
                                    <div
                                    id="package-suggestions"
                                    className="package-suggestions-box"
                                    />
                                </div>
                                </div>
                            </div>
                            </form>
                        </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                        <div className="main_box service-bx mb-4 p-3 border rounded bg-white">
                            <div className="row align-items-center gy-3">
                            {/* Image & Discount */}
                            <div className="col-12 col-md-6 col-lg-2 position-relative text-center">
                                <Image
                                src="/images/common/cart_img.jpg"
                                alt="Package Image"
                                className="img-fluid photo rounded"
                                width={150}
                                height={150}
                                />
                                <div className="discount3">
                                <p className="mb-0 text-white">
                                    <span>Up-to</span> 50% Off
                                </p>
                                <Image
                                    src="/images/common/tag.png"
                                    alt="Tag"
                                    style={{ width: 90, padding: 10 }}
                                    width={90}
                                    height={90}
                                />
                                </div>
                            </div>
                            {/* Package Info */}
                            <div className="col-12 col-md-6 col-lg-4">
                                <h5 className="mb-1">Package Name 1 Here</h5>
                                <small className="d-block">
                                <Link
                                    href="service-view.php"
                                    className="text-decoration-none text-muted"
                                >
                                    Candid Photography, Marriage Video, Album, One Photo
                                    Frame, Candid Photography, Marriage Video, Album, One
                                    Photo Frame, Candid Photography, Marriage Video, Album,
                                    One Photo Frame
                                </Link>
                                </small>
                            </div>
                            {/* Market Price */}
                            <div className="col-6 col-md-3 col-lg-2 text-center">
                                <p className="mb-0 text-muted price">Market Price</p>
                                <h4 className="text-muted">
                                {/* <strike>₹8,000</strike> */}
                                </h4>
                            </div>
                            {/* Offer Price */}
                            <div className="col-6 col-md-3 col-lg-2 text-center">
                                <p className="mb-0 text-success price">Offer Price</p>
                                <h4 className="text-success">₹5,000</h4>
                            </div>
                            {/* Action Buttons */}
                            <div className="col-12 col-md-6 col-lg-2">
                                <Link
                                href="#"
                                className="btn btn-secondary whatsapp-icon d-block mb-2 text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#request-callback"
                                >
                                Call Back Request
                                </Link>
                            </div>
                            </div>
                        </div>
                        <div className="main_box service-bx mb-4 p-3 border rounded bg-white">
                            <div className="row align-items-center gy-3">
                            {/* Image & Discount */}
                            <div className="col-12 col-md-6 col-lg-2 position-relative text-center">
                                <Image
                                src="/images/common/cart_img.jpg"
                                alt="Package Image"
                                className="img-fluid photo rounded"
                                width={150}
                                height={150}
                                />
                                <div className="discount3">
                                <p className="mb-0 text-white">
                                    <span>Up-to</span> 50% Off
                                </p>
                                <Image
                                    src="/images/common/tag.png"
                                    alt="Tag"
                                    style={{ width: 90, padding: 10 }}
                                    width={90}
                                    height={90}
                                />
                                </div>
                            </div>
                            {/* Package Info */}
                            <div className="col-12 col-md-6 col-lg-4">
                                <h5 className="mb-1">Package Name 1 Here</h5>
                                <small className="d-block">
                                <Link
                                    href="service-view.php"
                                    className="text-decoration-none text-muted"
                                >
                                    Candid Photography, Marriage Video, Album, One Photo
                                    Frame, Candid Photography, Marriage Video, Album, One
                                    Photo Frame, Candid Photography, Marriage Video, Album,
                                    One Photo Frame
                                </Link>
                                </small>
                            </div>
                            {/* Market Price */}
                            <div className="col-6 col-md-3 col-lg-2 text-center">
                                <p className="mb-0 text-muted price">Market Price</p>
                                <h4 className="text-muted">
                                {/* <strike>₹8,000</strike> */}
                                </h4>
                            </div>
                            {/* Offer Price */}
                            <div className="col-6 col-md-3 col-lg-2 text-center">
                                <p className="mb-0 text-success price">Offer Price</p>
                                <h4 className="text-success">₹5,000</h4>
                            </div>
                            {/* Action Buttons */}
                            <div className="col-12 col-md-6 col-lg-2">
                                <Link
                                href="#"
                                className="btn btn-secondary whatsapp-icon d-block mb-2 text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#request-callback"
                                >
                                Call Back Request
                                </Link>
                            </div>
                            </div>
                        </div>
                        <div className="main_box service-bx mb-4 p-3 border rounded bg-white">
                            <div className="row align-items-center gy-3">
                            {/* Image & Discount */}
                            <div className="col-12 col-md-6 col-lg-2 position-relative text-center">
                                <Image
                                src="/images/common/cart_img.jpg"
                                alt="Package Image"
                                className="img-fluid photo rounded"
                                width={150}
                                height={150}
                                />
                                <div className="discount3">
                                <p className="mb-0 text-white">
                                    <span>Up-to</span> 50% Off
                                </p>
                                <Image
                                    src="/images/common/tag.png"
                                    alt="Tag"
                                    style={{ width: 90, padding: 10 }}
                                    width={90}
                                    height={90}
                                />
                                </div>
                            </div>
                            {/* Package Info */}
                            <div className="col-12 col-md-6 col-lg-4">
                                <h5 className="mb-1">Package Name 1 Here</h5>
                                <small className="d-block">
                                <Link
                                    href="service-view.php"
                                    className="text-decoration-none text-muted"
                                >
                                    Candid Photography, Marriage Video, Album, One Photo
                                    Frame, Candid Photography, Marriage Video, Album, One
                                    Photo Frame, Candid Photography, Marriage Video, Album,
                                    One Photo Frame
                                </Link>
                                </small>
                            </div>
                            {/* Market Price */}
                            <div className="col-6 col-md-3 col-lg-2 text-center">
                                <p className="mb-0 text-muted price">Market Price</p>
                                <h4 className="text-muted">
                                {/* <strike>₹8,000</strike> */}
                                </h4>
                            </div>
                            {/* Offer Price */}
                            <div className="col-6 col-md-3 col-lg-2 text-center">
                                <p className="mb-0 text-success price">Offer Price</p>
                                <h4 className="text-success">₹5,000</h4>
                            </div>
                            {/* Action Buttons */}
                            <div className="col-12 col-md-6 col-lg-2">
                                <Link
                                href="#"
                                className="btn btn-secondary whatsapp-icon d-block mb-2 text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#request-callback"
                                >
                                Call Back Request
                                </Link>
                            </div>
                            </div>
                        </div>
                        <div className="main_box service-bx mb-4 p-3 border rounded bg-white">
                            <div className="row align-items-center gy-3">
                            {/* Image & Discount */}
                            <div className="col-12 col-md-6 col-lg-2 position-relative text-center">
                                <Image
                                src="/images/common/cart_img.jpg"
                                alt="Package Image"
                                className="img-fluid photo rounded"
                                width={150}
                                height={150}
                                />
                                <div className="discount3">
                                <p className="mb-0 text-white">
                                    <span>Up-to</span> 50% Off
                                </p>
                                <Image
                                    src="/images/common/tag.png"
                                    alt="Tag"
                                    width={90}
                                    height={90}
                                    style={{ padding: 10 }}
                                />
                                </div>
                            </div>
                            {/* Package Info */}
                            <div className="col-12 col-md-6 col-lg-4">
                                <h5 className="mb-1">Package Name 1 Here</h5>
                                <small className="d-block">
                                <Link
                                    href="service-view.php"
                                    className="text-decoration-none text-muted"
                                >
                                    Candid Photography, Marriage Video, Album, One Photo
                                    Frame, Candid Photography, Marriage Video, Album, One
                                    Photo Frame, Candid Photography, Marriage Video, Album,
                                    One Photo Frame
                                </Link>
                                </small>
                            </div>
                            {/* Market Price */}
                            <div className="col-6 col-md-3 col-lg-2 text-center">
                                <p className="mb-0 text-muted price">Market Price</p>
                                <h4 className="text-muted">
                                {/* <strike>₹8,000</strike> */}
                                </h4>
                            </div>
                            {/* Offer Price */}
                            <div className="col-6 col-md-3 col-lg-2 text-center">
                                <p className="mb-0 text-success price">Offer Price</p>
                                <h4 className="text-success">₹5,000</h4>
                            </div>
                            {/* Action Buttons */}
                            <div className="col-12 col-md-6 col-lg-2">
                                <Link
                                href="#"
                                className="btn btn-secondary whatsapp-icon d-block mb-2 text-white"
                                data-bs-toggle="modal"
                                data-bs-target="#request-callback"
                                >
                                Call Back Request
                                </Link>
                            </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-2">
                            
                            <Link
                            href="#"
                            className="btn btn-secondary d-block text-white py-2"
                            data-bs-toggle="modal"
                            data-bs-target="#request-callback"
                            >
                            ... Load More &gt;&gt;
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-12" id="about">
                    <div className="item mt-4">
                        <div className="row">
                        <h4 className=" mb-3">About Us</h4>
                        <p className="mb-3">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a
                            sem ut magna vestibulum rhoncus nec sed diam. Donec tristique
                            placerat erat in pulvinar. Integer quis luctus est. Maecenas
                            consequat in massa ut elementum. Duis condimentum gravida purus,
                            a posuere risus cursus vel. Class aptent taciti sociosqu ad
                            litora torquent per conubia nostra, per inceptos himenaeos.
                            Quisque justo sapien, dictum eu sagittis id, porttitor eu leo.
                            Phasellus porttitor quam odio. Suspendisse ex augue, convallis
                            non rhoncus id, varius et magna. Nam id faucibus elit. Fusce
                            venenatis nisi nunc, ac dictum nibh viverra ut. Phasellus est
                            eros, tincidunt pellentesque ipsum et, rutrum sollicitudin nisl.
                            Proin dictum mi a neque dapibus, sit amet sodales tortor cursus.
                            Vestibulum vitae tristique sapien, et lobortis diam.
                        </p>
                        </div>
                        <div className="row">
                        <div className="col-12 col-md-6 col-lg-2">
                            
                            <Link
                            href="#"
                            className="btn btn-secondary d-block text-white py-2"
                            data-bs-toggle="modal"
                            data-bs-target="#request-callback"
                            >
                            ... Load More
                            </Link>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="col-sm-12" id="reviews">
                    <div className="item mt-4">
                        <div className="row">
                        <div className="col-8 col-md-6 col-lg-3">
                            <h4 className=" mb-3">Reviews </h4>
                        </div>
                        <div className="col-4 col-md-6 col-lg-9">
                            <ul className="scroll-media review-link">
                            <li>
                                <Link href="#add-your-review">Add Review</Link>
                            </li>
                            </ul>
                        </div>
                        <div className="sdf ">
                            <div className="col-md-12">
                            <div className="row testimonials-carousal">
                                <div className="col-12 col-md-12 col-lg-6">
                                <div className="row testm-box">
                                    <h3>
                                    
                                    <Image
                                        src="/images/common/testimonials_pic.jpg"
                                        alt=""
                                        width={150}
                                        height={150}
                                    />
                                    &nbsp; Name Here
                                    </h3>
                                    <p>
                                    
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Phasellus lacinia ante quis aliquet bibendum.
                                    Lorem ipsum
                                    </p>
                                </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-6">
                                <div className="row testm-box">
                                    <h3>
                                    
                                    <Image
                                        src="/images/common/testimonials_pic.jpg"
                                        alt=""
                                        width={150}
                                        height={150}
                                    />
                                    &nbsp; Name Here
                                    </h3>
                                    <p>
                                    
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Phasellus lacinia ante quis aliquet bibendum.
                                    Lorem ipsum
                                    </p>
                                </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-6">
                                <div className="row testm-box">
                                    <h3>
                                    
                                    <Image
                                        src="/images/common/testimonials_pic.jpg"
                                        alt=""
                                        width={150}
                                        height={150}
                                    />
                                    &nbsp; Name Here
                                    </h3>
                                    <p>
                                    
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Phasellus lacinia ante quis aliquet bibendum.
                                    Lorem ipsum
                                    </p>
                                </div>
                                </div>
                                <div className="col-12 col-md-12 col-lg-6">
                                <div className="row testm-box">
                                    <h3>
                                    
                                    <Image
                                        src="/images/common/testimonials_pic.jpg"
                                        alt=""
                                        width={150}
                                        height={150}
                                    />
                                    &nbsp; Name Here
                                    </h3>
                                    <p>
                                    
                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                    elit. Phasellus lacinia ante quis aliquet bibendum.
                                    Lorem ipsum
                                    </p>
                                </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-2 mt-3">
                                
                                <Link
                                href="#"
                                className="btn btn-secondary d-block text-white py-2"
                                data-bs-toggle="modal"
                                data-bs-target="#request-callback"
                                >
                                ... Load More &gt;&gt;
                                </Link>
                            </div>
                            </div>
                        </div>
                        {/* <div className="text-start mt-3" id="add-your-review">
                            <h4 className="mt-3">Add Your Ratings &amp; Reviews</h4>
                            <form>
                            <div className="mt-2">
                                <div className="rating">
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={5}
                                    id={5}
                                />
                                <label htmlFor={5}>☆</label>
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={4}
                                    id={4}
                                />
                                <label htmlFor={4}>☆</label>
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={3}
                                    id={3}
                                />
                                <label htmlFor={3}>☆</label>
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={2}
                                    id={2}
                                />
                                <label htmlFor={2}>☆</label>
                                <input
                                    type="radio"
                                    name="rating"
                                    defaultValue={1}
                                    id={1}
                                />
                                <label htmlFor={1}>☆</label>
                                </div>
                            </div>
                            <div className="mt-2 col-12 col-md-12 col-lg-6">
                                <textarea
                                type="text"
                                className="form-control py-2 px-4 rounded-5"
                                rows={7}
                                defaultValue={""}
                                />
                            </div>
                            <div className="mt-2 col-12 col-md-12 col-lg-6">
                                <button type="submit" className="btn btn-secondary px-4">
                                Add Review
                                <Image
                                    src="/images/icons/btn-arrow.png"
                                    alt=""
                                    width={10}
                                />
                                </button>
                            </div>
                            </form>
                        </div> */}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <Vendorslist title="Top Suggestions" />
        <Vendorslist title="Similar Vendors" />
    </>
  )
}

export default WithLayout(ServiceDetails, 'frontend')
