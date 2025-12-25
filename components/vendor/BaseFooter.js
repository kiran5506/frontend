import Link from 'next/link'
import React from 'react'

const BaseFooter = () => {
  return (
    <>
      <section id="cta-section" className="py-5">
        <div className="container">
          <div className="row text-center">
            <h2>2X Your Orders with Bsfye Vendorship</h2>
            <div className="row text-center two-btns mt-4">
              <div className="col-1 col-lg-3" />
              <div className="col-5 col-lg-3">
                <Link href={'/vendor/register'} className="btn btn-primary btn-lg me-3">
                  <img
                    src="/assets/vendor/images/icons/register-icon-light.png"
                    style={{ width: 20, height: 20 }}
                  />
                  Register
                </Link>
              </div>
              <div className="col-5 col-lg-3">
                <Link href={'/vendor/login'} className="btn btn-secondary btn-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    version="1.1"
                    width={25}
                    height={25}
                    x={0}
                    y={0}
                    viewBox="0 0 24 24"
                    style={{ enableBackground: "new 0 0 512 512" }}
                    xmlSpace="preserve"
                    fillRule="evenodd"
                    className=""
                  >
                    <g>
                      <path
                        d="M12 12.5a2.25 2.25 0 1 0 .002 4.502A2.25 2.25 0 0 0 12 12.5zm0 1.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5z"
                        fill="#000000"
                        opacity={1}
                        data-original="#000000"
                      />
                      <path
                        d="M11.25 16.25v2.5a.75.75 0 0 0 1.5 0v-2.5a.75.75 0 0 0-1.5 0z"
                        fill="#000000"
                        opacity={1}
                        data-original="#000000"
                      />
                      <path
                        d="M20.118 12a2.75 2.75 0 0 0-2.75-2.75H6.632A2.75 2.75 0 0 0 3.882 12v8a2.75 2.75 0 0 0 2.75 2.75h10.736a2.75 2.75 0 0 0 2.75-2.75zm-1.5 0v8c0 .69-.559 1.25-1.25 1.25H6.632A1.25 1.25 0 0 1 5.382 20v-8c0-.69.559-1.25 1.25-1.25h10.736c.691 0 1.25.56 1.25 1.25z"
                        fill="#000000"
                        opacity={1}
                        data-original="#000000"
                      />
                      <path
                        d="M12 1.25A5.751 5.751 0 0 0 6.25 7v3c0 .414.336.75.75.75h10a.75.75 0 0 0 .75-.75V7A5.751 5.751 0 0 0 12 1.25zm0 1.5A4.25 4.25 0 0 1 16.25 7v2.25h-8.5V7A4.25 4.25 0 0 1 12 2.75z"
                        fill="#000000"
                        opacity={1}
                        data-original="#000000"
                      />
                    </g>
                  </svg>
                  Login
                </Link>
              </div>
              <div className="col-1 col-lg-3" />
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container">
          <div className="vcopyrights">
            <div className="row">
              <div className="col-md-6 text-start">
                <p>Copyrights 2024 Bsfye. All Rights Reserved.</p>
              </div>
              <div className="col-md-6 text-end">
                <p>
                  <a href="terms_conditions.php">Terms &amp; Conditions</a> |{" "}
                  <a href="privacy_policy.php">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default BaseFooter
