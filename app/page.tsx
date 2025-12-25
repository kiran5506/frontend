import React from 'react'
import WithLayout from "@/hoc/WithLayout";
import ServiceSection from '@/components/frontend/home/ServiceSection';
import HeroSlider from '@/components/frontend/home/HeroSlider';
import HowitWorks from '@/components/frontend/home/HowitWorks';
import CommercialAd from '@/components/frontend/home/CommercialAd';
import Testimonials from '@/components/frontend/home/Testimonials';


const Home = () => {
  return (
    <div>
      <HeroSlider />
      <ServiceSection />
      <HowitWorks />
      <CommercialAd />
      <Testimonials />
    </div>
  )
}

export default WithLayout(Home, 'frontend');
