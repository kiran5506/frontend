import Link from 'next/link'
import React from 'react'

const BusinessProfile = () => {
  const defaultValue = true;
  return (
   <div className="pad">
  <h2 className="page-title">View/Edit Business</h2>
  <div className="col-12 col-lg-12">
    <form className="row g-3">
      <div className="accordion" id="accordionProfile">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="false"
              aria-controls="collapseOne"
            >
              <span className="p-3"> 1. Business Info</span>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show "
            aria-labelledby="headingOne"
            data-bs-parent="#accordionProfile"
          >
            <div className="accordion-body">
              <div className="row ">
                <div className="col-12 col-md-8 ">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label">
                        Select Service Category*
                      </label>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option >Choose</option>
                        <option value={1}>One</option>
                        <option value={2}>Two</option>
                        <option value={3}>Three</option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label htmlFor="business-name" className="form-label">
                        Business Name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="business-name"
                        id="business-name"
                        placeholder="Enter Your Business Name"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  <img src="assets/img/business_pic.png" alt="" />
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-md-8">
                  <label htmlFor="registered-Address" className="form-label">
                    Registered Address* (Same as registered document)
                  </label>
                  <textarea
                    name="registered-Address"
                    className="form-control rounded-4"
                    placeholder="Write Address"
                    style={{ height: 100 }}
                    defaultValue={""}
                  />
                </div>
                <div className="col-12 col-md-8">
                  <label htmlFor="business-skills" className="form-label">
                    Business Skills*
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                      defaultChecked={true}
                    />
                    <label className="form-check-label" htmlFor="gridCheck1">
                      Skill Name
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck2"
                    />
                    <label className="form-check-label" htmlFor="gridCheck2">
                      Skill Name
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck3"
                      defaultChecked={true}
                    />
                    <label className="form-check-label" htmlFor="gridCheck3">
                      Skill Name
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck4"
                    />
                    <label className="form-check-label" htmlFor="gridCheck4">
                      Skill Name
                    </label>
                  </div>
                </div>
                <div className="col-12 col-md-8">
                  <label htmlFor="languages-known" className="form-label">
                    Languages Known*
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="english-language"
                      defaultChecked={false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="english-language"
                    >
                      English
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="hindi-language"
                      defaultChecked={false}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="hindi-language"
                    >
                      Hindi
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="telugu-language"
                      defaultChecked={true}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="telugu-language"
                    >
                      Telugu
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="tamil-language"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="tamil-language"
                    >
                      Tamil
                    </label>
                  </div>
                </div>
                <div className="col-md-8 mt-0">
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="account-number" className="form-label">
                        Mobile Number*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="account-number"
                        id="account-number"
                        placeholder="+91 999 999 9999"
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="account-name" className="form-label">
                        Email ID*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="account-name"
                        id="account-name"
                        placeholder="sample@gmail.com"
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="ifsc-code" className="form-label">
                        About Us
                      </label>
                      <textarea
                        className="form-control rounded-4"
                        rows={5}
                        defaultValue={
                          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.\n                              "
                        }
                      />
                    </div>
                    <div className="col-md-12">
                      <label htmlFor="ifsc-code" className="form-label">
                        Communication Address
                      </label>
                      <textarea
                        className="form-control rounded-4"
                        rows={4}
                        defaultValue={
                          "Beside Apple Dental, 3rd Lane, Dwarakanagar, Visakhapatnam - 530016, Andhrapradesh, India.\n                              "
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="account-nickname" className="form-label">
                        Cover Images* (Upto 3 Images)
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        name="account-nickname"
                        id="account-nickname"
                        placeholder="Enter Nickname"
                      />
                    </div>
                    <div className="col-md-6 d-none d-md-block">&nbsp;</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              <span className="p-3">2. Documents</span>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#accordionProfile"
          >
            <div className="accordion-body pb-5 pt-0">
              <div className="row mt-0">
                <div className="col-md-4">
                  <label htmlFor="upload-aadhar" className="form-label">
                    Aadhar Front*
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="aadhar-front"
                    id="formFile"
                  />
                  <br />
                  <label htmlFor="upload-aadhar" className="form-label">
                    Aadhar Back*
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="aadhar-back"
                    id="formFile"
                  />
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <Link
                        href="assets/img/aadhar_front.jpg"
                        data-fancybox="gallery"
                      >
                        <img
                          src="assets/img/aadhar_front.jpg"
                          alt=""
                          className="zoom w-100"
                        />
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <Link
                        href="assets/img/aadhar_back.jpg"
                        data-fancybox="gallery"
                      >
                        <img
                          src="assets/img/aadhar_back.jpg"
                          alt=""
                          className="zoom w-100"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <label htmlFor="registration-copy" className="form-label">
                    Registration Copy (Optional)
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="registration-front"
                    id="formFile"
                  />
                  <br />
                  <label htmlFor="registration-copy" className="form-label">
                    GST (Optional)
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    name="registration-back"
                    id="formFile"
                  />
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <Link
                        href="assets/img/certificate.jpg"
                        data-fancybox="gallery"
                      >
                        <img
                          src="assets/img/certificate.jpg"
                          alt=""
                          className="zoom w-100
                        "
                        />
                      </Link>
                    </div>
                    <div className="col-md-6">
                      <Link
                        href="assets/img/certificate.jpg"
                        data-fancybox="gallery"
                      >
                        <img
                          src="assets/img/certificate.jpg"
                          alt=""
                          className="zoom w-100
                        "
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 mt-12">
          <p className="mt-3 mb-3">
            {" "}
            By clicking Update, your profile will be reviewed. Until approval,
            your old profile stays visible{" "}
          </p>
          <button type="submit" className="btn orange-btn">
            Update
          </button>
        </div>
      </div>
    </form>
  </div>
</div>

  )
}

export default BusinessProfile