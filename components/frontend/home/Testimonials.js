"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { testimonialList } from '@/services/testimonial-api';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

// const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     pauseOnHover: false,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 576,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//     ],
// };
const baseSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: false,
    arrows: false,
};
const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const Testimonials = () => {
  const dispatch = useDispatch();
  const [viewportWidth, setViewportWidth] = useState(
      typeof window !== 'undefined' ? window.innerWidth : 1200
    );

  useEffect(() => {
    dispatch(testimonialList());
  }, [dispatch]);

  useEffect(() => {
    const handleResize = () => {
    setViewportWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
}, []);

const sliderSettings = useMemo(() => {
    let slidesToShow = 3;
    let slidesToScroll = 1;

    if (viewportWidth < 576) {
      slidesToShow = 1;
      slidesToScroll = 1;
    } else if (viewportWidth < 768) {
      slidesToShow = 2;
      slidesToScroll = 1;
    } else if (viewportWidth < 992) {
      slidesToShow = 3;
      slidesToScroll = 1;
    } else if (viewportWidth < 1200) {
      slidesToShow = 3;
      slidesToScroll = 1;
    }

    return {
      ...baseSliderSettings,
      slidesToShow,
      slidesToScroll,
    };
  }, [viewportWidth]);

  const { Testimonials: testimonials, loading, error } = useSelector((state) => state.testimonial);

  return (
    <section className="testimonials-sec bg-gray-color py-5">
        <div className="container">
            <div className="main-title text-center ">
                <h2>Testimonials</h2>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="testimonials-carousal-home">
                        {loading ? (
                            <SkeletonTheme baseColor="#f3f3f3" highlightColor="#e0e0e0">
                                <Skeleton height={250} count={3} />
                            </SkeletonTheme>
                        ) : (
                            <Slider {...sliderSettings} >
                                {testimonials && testimonials.length > 0 ? (
                                    testimonials.map((testimonial) => (
                                        <div className="item" key={testimonial._id}>
                                            <div className="box">
                                                <div className="content text-center">
                                                    <img 
                                                        src={`/api/image-proxy?url=${encodeURIComponent(testimonial.imagePath || testimonial.image)}`}
                                                        alt={testimonial.title || "Testimonial"} 
                                                        className="main-image" 
                                                        width={90} 
                                                        height={90}
                                                        style={{ borderRadius: '50%', objectFit: 'cover', display: 'block', margin: '0 auto', marginBottom: '15px' }}
                                                    />
                                                    <h3>{testimonial.title}</h3>
                                                    <div className="stars" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', margin: '8px auto' }}>
                                                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                            <span key={i} style={{ color: '#ffc107', fontSize: '18px', lineHeight: '1' }}>★</span>
                                                        ))}
                                                    </div>
                                                    <p>{testimonial.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-5">
                                        <p>No testimonials available</p>
                                    </div>
                                )}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Testimonials
