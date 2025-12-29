"use client";
import React from 'react'

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { sliderList } from '@/services/slider-api';

var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, // 3 seconds
    pauseOnHover: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
};

const arrowIcon = "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e";

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="arrow next" onClick={onClick}>
      <Image src={arrowIcon} width={40} height={40} alt=''/>
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className="arrow prev" onClick={onClick}>
      <Image src={arrowIcon} width={40} height={40} style={{ transform: "rotate(180deg)" }}  alt=''/>
    </div>
  );
}

const HeroSlider = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (dispatch)(sliderList());
  }, [dispatch]); 

  const { Sliders, loading, error } = useSelector((state) => state.slider);
  console.log("Sliders Data:", Sliders);
  
  return (
    <>
      {loading ? <p>Loading sliders...</p> : (
        <Slider {...settings}>
          {Sliders.map((simage, index) => (
            <div key={index}>
              <Image
                src={`/api/image-proxy?url=${encodeURIComponent(simage.bannerDesktopPath)}`}
                className="d-block w-100"
                alt={simage.alt || "Slider"}
                width={1464}
                height={450}
                style={{ maxHeight: '450px' }}
                unoptimized
              />
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}

export default HeroSlider
