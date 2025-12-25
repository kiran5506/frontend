import React from 'react'
import Link from 'next/link'

const Tutorials = () => {
  return (
    <div className="tutorials-bx mt-4">
        <div className="row ">
            <div className="col-12 col-lg-3 tut-img">
                <img
                src="/assets/vendor/images/common/tutorial.jpg"
                className="d-block w-100 m-auto"
                />
            </div>
            <div className="col-12 col-lg-9">
                <div className=" tut-cnt">
                    <h3>Title Comes Here</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
                        commodo ligula eget dolor. Aenean massa. Cum sociis natoque
                        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    </p>
                    <Link href="tutorials-read-more.php" className="btn btn-secondary">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tutorials
