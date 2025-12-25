"use client";
import React from 'react'
import ServiceBox from './ServiceBox'
import dynamic from 'next/dynamic';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    //autoplay: true,
    autoplaySpeed: 1000, // 4 seconds
    pauseOnHover: false,
};

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const Vservices = ({title, services}) => {
  return (
    <div className="services-list pt-4 pt-lg-0 pb-5">
        <div className="main-title d-flex justify-content-between align-items-center px-3">
            <h2>{title}</h2>
        </div>
        <div className="services-list-sec">
          <Slider {...settings}>
            {services && services.map((service, index) => {
                return <ServiceBox service={service} key={index}/>
            })}
          </Slider>
        </div>
    </div>

  )
}

export default Vservices
