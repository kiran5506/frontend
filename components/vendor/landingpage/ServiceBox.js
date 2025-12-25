import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ServiceBox = ({service}) => {
  return (
    <div className="item text-center">
        <Link href={service.link}>
            <div className="box" >
              <Image src={service.image} alt="pandit" width={100} height={100}/>
              <h5>{service.title}</h5>
              <p>({service.count})</p>
            </div>
        </Link>
    </div>
  )
}

export default ServiceBox
