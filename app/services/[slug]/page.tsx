"use client";
import WithLayout from '@/hoc/WithLayout'
import Service from '@/components/frontend/Service'
import Pagination from '@/components/Pagination'
import RequestCallbackModal from '@/components/frontend/RequestCallbackModal'
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const Services = () => {
    const pathname = usePathname();
    const slug = pathname?.split('/').pop() || '';
    const serviceId = slug.split('-').pop();
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    console.log('Service ID:', serviceId);

    useEffect(() => {
        // Open modal automatically when page loads
        const timer = setTimeout(() => {
            setIsModalOpen(true);
        }, 500); // Small delay for better UX

        return () => clearTimeout(timer);
    }, []);

  return (
    <>
        <RequestCallbackModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
        />
        <section className="inner-search-section2">
            <h1 className="text-center py-3 ">Bridal Makeup Artists in Vizag - {serviceId}</h1>
        </section>
        <section className="inner-search-section" id="filterBy">
            <div className="container">
                <div className="main-title row d-flex justify-content-center align-items-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <form>
                    <div className="row gx-2 d-flex justify-content-between align-items-center">
                        <div className="col-2 text-left text-md-end nomb">
                        <label>Filter by :</label>
                        </div>
                        <div className="col-3 myfill">
                        <select className="form-select">
                            <option>Budget</option>
                            <option>Low to High</option>
                            <option>High to Low</option>
                        </select>
                        </div>
                        <div className="col-3 myfill">
                        <select className="form-select">
                            <option>Discount</option>
                            <option>Low to High</option>
                            <option>High to Low</option>
                        </select>
                        </div>
                        <div className="col-3 myfill">
                        <select className="form-select">
                            <option>Ratings</option>
                            <option>4.0 Above</option>
                            <option>3.0 Above</option>
                            <option>2.0 Above</option>
                        </select>
                        </div>
                    </div>
                    </form>
                </div>
                </div>
            </div>
        </section>
        
        <section className="services-section py-2 pt-0">
            <div className="container">
                <div className="main-title d-flex justify-content-between align-items-center">
                    <h3>Top Suggestions</h3>
                </div>
                <div className="row d-flex justify-content-center">
                    <Service />
                    <Service />
                    <Service />
                    <Service />
                </div>
                <Pagination />
            </div>
        </section>

    </>
  )
}

export default  WithLayout(Services, 'frontend')
