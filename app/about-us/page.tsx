import React from 'react'
import Breadcrumb from '@/components/frontend/Breadcrumb'
import Image from 'next/image'
import WithLayout from '@/hoc/WithLayout'

const AboutUs = () => {
  return (
    <section className="about-section py-3">
        <div className="container">
            <div className="row gx-4 pb-5 d-flex align-items-center">
                <div className="col-md-7">
                    <div className="main-title">
                    <h2>About Company</h2>
                    </div>
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                    gravida placerat dictum. Aliquam eu pellentesque diam. Vivamus mauris
                    urna, dictum vel elit a, tristique posuere quam. Integer faucibus non
                    nisl id ullamcorper. Fusce efficitur, sapien vitae pharetra fermentum,
                    massa nisl dictum leo, et ullamcorper nisl magna in massa. Maecenas
                    tempus neque in turpis sollicitudin, eget interdum nibh condimentum.
                    Ut vel lectus viverra, laoreet lorem quis, imperdiet dolor.
                    Suspendisse non est in risus pellentesque tristique. Duis lacinia eros
                    sit amet pharetra scelerisque. Nam ut finibus risus, non volutpat
                    nunc.
                    </p>
                    <ul className="mt-3 list">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div>
                <div className="col-md-5">
                    <Image src="/images/common/about_img01.jpg" alt="" className="w-100" width={526} height={339} />
                </div>
            </div>
            <div className="row gx-4 py-5 d-flex align-items-center">
                <div className="col-md-7  order-sm-1">
                    <div className="main-title">
                        <h2>About Company</h2>
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                        gravida placerat dictum. Aliquam eu pellentesque diam. Vivamus mauris
                        urna, dictum vel elit a, tristique posuere quam. Integer faucibus non
                        nisl id ullamcorper. Fusce efficitur, sapien vitae pharetra fermentum,
                        massa nisl dictum leo, et ullamcorper nisl magna in massa. Maecenas
                        tempus neque in turpis sollicitudin, eget interdum nibh condimentum.
                        Ut vel lectus viverra, laoreet lorem quis, imperdiet dolor.
                        Suspendisse non est in risus pellentesque tristique. Duis lacinia eros
                        sit amet pharetra scelerisque. Nam ut finibus risus, non volutpat
                        nunc.
                    </p>
                    <ul className="mt-3 list">
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur.</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing.</li>
                        <li>Lorem ipsum dolor sit amet.</li>
                    </ul>
                </div>
                <div className="col-md-5">
                    <Image src="/images/common/about_img01.jpg" alt="" className="w-100" width={526} height={339} />
                </div>
            </div>
        </div>
    </section>
  )
}

export default WithLayout(AboutUs, 'frontend')
