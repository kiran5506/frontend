"use client";
import dynamic from 'next/dynamic';
import Image from 'next/image'
import React from 'react'

const MainServices = [
  {
    id: 1,
    title: "Photography",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 2,
    title: "Web Development",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 3,
    title: "Graphic Design",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 4,
    title: "Photography",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 5,
    title: "Web Development",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 6,
    title: "Graphic Design",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 7,
    title: "Photography",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 8,
    title: "Web Development",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 9,
    title: "Graphic Design",
    image: "/images/common/s2.jpg",
    link: "service.php"
  }
];

const SecondaryServices = [
  {
    id: 1,
    title: "Content Writing",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 2,
    title: "Digital Marketing",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 3,
    title: "SEO Services",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 4,
    title: "Photography",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 5,
    title: "Web Development",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 6,
    title: "Graphic Design",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 7,
    title: "Photography",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 8,
    title: "Web Development",
    image: "/images/common/s2.jpg",
    link: "service.php"
  },
  {
    id: 9,
    title: "Graphic Design",
    image: "/images/common/s2.jpg",
    link: "service.php"
  }
];  

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    //autoplay: true,
    autoplaySpeed: 4000, // 4 seconds
    pauseOnHover: false,
};

const Slider = dynamic(() => import("react-slick"), {
  ssr: false,
});

const ServiceSection = () => {
  return (
    <section className="services-section bg-gray-color" id="services">
        <div className="container">
            <div className="fun-facts px-0 px-lg-2 py-3 py-lg-5 d-none d-md-block">
            <div className="row d-flex align-items-center justify-content-center">
                <div className="col-lg-7">
                <div className="row text-center text-md-start">
                    <div className="col-4 col-sm-4 mb-3 mb-sm-0">
                    <div className="d-block d-sm-flex align-items-center item">
                        <div className="flex-shrink-0">
                        <Image src="/images/icons/fun-fact-cities.png" alt="" width={50} height={50}/>
                        </div>
                        <div className="flex-grow-1 ms-0 ms-md-3">
                        <h2>
                            <span
                            className="counter"
                            data-start={0}
                            data-end={800}
                            data-duration={500}
                            >
                            0
                            </span>
                        </h2>
                        <p>Cities</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-4 col-sm-4 mb-3 mb-sm-0">
                    <div className="d-block d-sm-flex align-items-center item">
                        <div className="flex-shrink-0">
                        <Image src="/images/icons/fun-fact-vendors.png" alt="" width={50} height={50}/>
                        </div>
                        <div className="flex-grow-1 ms-0 ms-md-3">
                        <h2>
                            <span
                            className="counter"
                            data-start={0}
                            data-end={1000}
                            data-duration={800}
                            >
                            0
                            </span>
                        </h2>
                        <p>Vendors</p>
                        </div>
                    </div>
                    </div>
                    <div className="col-4 col-sm-4 mb-3 mb-sm-0">
                    <div className="d-block d-sm-flex align-items-center item">
                        <div className="flex-shrink-0">
                        <Image
                            src="/images/icons/fun-fact-happy-customers.png"
                            alt=""
                            width={50} height={50}
                        />
                        </div>
                        <div className="flex-grow-1 ms-0 ms-md-3">
                        <h2>
                            <span
                            className="counter"
                            data-start={0}
                            data-end={1200}
                            data-duration={1000}
                            >
                            0
                            </span>
                        </h2>
                        <p>Happy Customers</p>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div className="services-list pt-4 pt-lg-0 pb-2">
                <div className="main-title d-flex justify-content-between align-items-center ">
                    <h2>Main Services</h2>
                </div>
                <div className="services-list-sec pdtopp" style={{width: '100%'}}> 
                    <Slider {...settings}>
                        {MainServices.map(service => (
                            <div className="item text-center" key={service.id}>
                                <a href={service.link}>
                                    <div className="box2">
                                        <Image src={service.image} alt={service.title} width={196} height={243} />
                                    </div>
                                </a>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
            
            <div className="services-list pt-3 pt-lg-0 pb-5">
                <div className="main-title d-flex justify-content-between align-items-center ">
                    <h2>Secondary Services</h2>
                </div>
                <div className="services-list-sec pdtopp">
                    <Slider {...settings}>
                        {SecondaryServices.map(service => (
                            <div className="item text-center" key={service.id}>
                                <a href={service.link}>
                                    <div className="box2">
                                        <Image src={service.image} alt={service.title} width={196} height={243}/>
                                    </div>
                                </a>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ServiceSection
