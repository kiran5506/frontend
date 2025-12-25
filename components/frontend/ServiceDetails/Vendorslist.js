import React from 'react'
import Service from '../Service'

const Vendorslist = ({title}) => {
  return (
    <section className="services-section2 py-5 bg-gray-color">
        <div className="container">
            <div className="main-title d-flex justify-content-between align-items-center">
                <h3>{title}</h3>
            </div>
            <div className="row d-flex justify-content-center">
                <Service />
                <Service />
                <Service />
                <Service />
            </div>
        </div>
    </section>
  )
}

export default Vendorslist
