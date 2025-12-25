"use client";
import dynamic from 'next/dynamic';
import Image from 'next/image'
import React from 'react'

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // 3 seconds
    pauseOnHover: false,
    arrows: false,
};

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const Testimonials = () => {
  return (
    <section className="testimonials-sec bg-gray-color py-5">
        <div className="container">
            <div className="main-title text-center ">
                <h2>Testimonials</h2>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="testimonials-carousal-home">
                        <Slider {...settings}>
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div className="item" key={i}>
                                    <div className="box">
                                        <div className="content text-center">
                                            <Image src="/images/common/testimonials_pic.jpg" alt="" className="main-image" width={90} height={90} />
                                            <h3>Name Here</h3>
                                            <Image src="/images/common/stars.png" alt="" className="stars" width={100} height={18} />
                                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                            Phasellus lacinia ante quis aliquet bibendum. </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonials
