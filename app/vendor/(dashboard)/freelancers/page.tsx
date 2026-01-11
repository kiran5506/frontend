import Link from "next/link";
import React from "react";

const Freelancers = () => {
  return (
    <section className="section dashboard dashboard-section p-0">
      <div className="content">
        <div className="pad .mysh">
          <div className="row justify-content-between align-items-center freelance-bx search-bar">
            <div className="col-md-3">
              <h2 className="page-title mb-0">Freelancers</h2>
            </div>
            <div className="col-md-6">
              <div className="searchbox">
                <div className="row row-cols-md-4 d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    placeholder=" City / Skill / Type"
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-md-3">
              <Link
                href="join-as-a-freelancer.php"
                className="btn orange-btn btn-xs float-right"
              >
                Join as a Freelancer
              </Link>
            </div>
            <section id="reviews-section">
              <div className="row justify-content-between freelancer-portfolio">
                <div className="col-md-6 lft">
                  <div className="review-bx">
                    <div className="row review-top freelance align-items-center">
                      <div className="col-2 col-lg-2">
                        <img
                          src="assets/img/profile-img.jpg"
                          alt="Profile"
                          className="rounded-circle w-100"
                        />
                      </div>
                      <div className="col-8 col-lg-10 text-start">
                        <h5>Govinda Rao</h5>
                        <p>
                          Verified by Bsfye&nbsp;&nbsp;
                          <i className="bi bi-check-circle-fill primary-color" />
                        </p>
                      </div>
                    </div>
                    <div className="review-center">
                      <table className="col-12 col-md-12 text-start">
                        <tbody>
                          <tr>
                            <td className="col-md-3">Services</td>
                            <td className="col-md-1">:</td>
                            <td className="col-md-7">
                              Photography, Videography
                            </td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>:</td>
                            <td>Visakhapatnam</td>
                          </tr>
                          <tr>
                            <td>Mobile</td>
                            <td>:</td>
                            <td>+91 999 999 9999</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>sample@gmail.com</td>
                          </tr>
                        </tbody>
                      </table>
                      <Link
                        href="freelance_view.php"
                        className="btn orange-btn mt-3"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 rght">
                  <div className="review-bx">
                    <div className="row review-top freelance align-items-center">
                      <div className="col-2 col-lg-2">
                        <img
                          src="assets/img/profile-img.jpg"
                          alt="Profile"
                          className="rounded-circle w-100"
                        />
                      </div>
                      <div className="col-8 col-lg-10 text-start">
                        <h5>Govinda Rao</h5>
                        <p>
                          Verified by Bsfye&nbsp;&nbsp;
                          <i className="bi bi-check-circle-fill primary-color" />
                        </p>
                      </div>
                    </div>
                    <div className="review-center">
                      <table className="col-12 col-md-12 text-start">
                        <tbody>
                          <tr>
                            <td className="col-md-3">Services</td>
                            <td className="col-md-1">:</td>
                            <td className="col-md-7">
                              Photography, Videography
                            </td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>:</td>
                            <td>Visakhapatnam</td>
                          </tr>
                          <tr>
                            <td>Mobile</td>
                            <td>:</td>
                            <td>+91 999 999 9999</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>sample@gmail.com</td>
                          </tr>
                        </tbody>
                      </table>
                      <Link
                        href="freelance_view.php"
                        className="btn orange-btn mt-3"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row freelancer-portfolio">
                <div className="col-md-6 lft">
                  <div className="review-bx">
                    <div className="row review-top freelance align-items-center">
                      <div className="col-2 col-lg-2">
                        <img
                          src="assets/img/profile-img.jpg"
                          alt="Profile"
                          className="rounded-circle w-100"
                        />
                      </div>
                      <div className="col-8 col-lg-10 text-start">
                        <h5>Govinda Rao</h5>
                        <p>
                          Verified by Bsfye&nbsp;&nbsp;
                          <i className="bi bi-check-circle-fill primary-color" />
                        </p>
                      </div>
                    </div>
                    <div className="review-center">
                      <table className="col-12 col-md-12 text-start">
                        <tbody>
                          <tr>
                            <td className="col-md-3">Services</td>
                            <td className="col-md-1">:</td>
                            <td className="col-md-7">
                              Photography, Videography
                            </td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>:</td>
                            <td>Visakhapatnam</td>
                          </tr>
                          <tr>
                            <td>Mobile</td>
                            <td>:</td>
                            <td>+91 999 999 9999</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>sample@gmail.com</td>
                          </tr>
                        </tbody>
                      </table>
                      <Link
                        href="freelance_view.php"
                        className="btn orange-btn mt-3"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 rght">
                  <div className="review-bx">
                    <div className="row review-top freelance align-items-center">
                      <div className="col-2 col-lg-2">
                        <img
                          src="assets/img/profile-img.jpg"
                          alt="Profile"
                          className="rounded-circle w-100"
                        />
                      </div>
                      <div className="col-8 col-lg-10 text-start">
                        <h5>Govinda Rao</h5>
                        <p>
                          Verified by Bsfye&nbsp;&nbsp;
                          <i className="bi bi-check-circle-fill primary-color" />
                        </p>
                      </div>
                    </div>
                    <div className="review-center">
                      <table className="col-12 col-md-12 text-start">
                        <tbody>
                          <tr>
                            <td className="col-md-3">Services</td>
                            <td className="col-md-1">:</td>
                            <td className="col-md-7">
                              Photography, Videography
                            </td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>:</td>
                            <td>Visakhapatnam</td>
                          </tr>
                          <tr>
                            <td>Mobile</td>
                            <td>:</td>
                            <td>+91 999 999 9999</td>
                          </tr>
                          <tr>
                            <td>Email</td>
                            <td>:</td>
                            <td>sample@gmail.com</td>
                          </tr>
                        </tbody>
                      </table>
                      <Link
                        href="freelance_view.php"
                        className="btn orange-btn mt-3"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Freelancers;
