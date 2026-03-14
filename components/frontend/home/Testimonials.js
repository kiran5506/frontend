"use client";
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { testimonialList } from '@/services/testimonial-api';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  useEffect(() => {
    dispatch(testimonialList());
  }, [dispatch]);

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
                            <Slider {...settings}>
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
