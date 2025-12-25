import Link from 'next/link'
import React from 'react'
import Tutorials from '@/components/vendor/Tutorials';
import Pagination from '@/components/Pagination';

const TutorialsVendor = () => {
  return (
    <>
      <section className="breadcrumb-banner">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-12 col-xl-12">
              <h2>About Us</h2>
            </div>
          </div>
        </div>
      </section>
      <section className="about-section py-5 bg-gray-color">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-9">
              <div className="search-bar-container pb-5">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control mb-0 mb-md-0"
                    placeholder="How can i Create package?"
                    aria-label="Search"
                  />
                  <button
                    className="btn btn-light dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  > Language </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <li>
                      <Link className="dropdown-item" href="#">
                        English
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="#">
                        Telugu
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="#">
                        Tamil
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" href="#">
                        Hindi
                      </Link>
                    </li>
                  </ul>
                  <button className="btn btn-secondary mysubd" type="button">
                    Search
                  </button>
                </div>
              </div>

              <div className="tutorials-main-bx mt-4 mt-md-0" style={{ marginTop: 30 }}>
                <Tutorials />
                <Tutorials />
              </div>
              <Pagination />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default TutorialsVendor
