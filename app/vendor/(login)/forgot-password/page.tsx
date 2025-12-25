import React from 'react'

const ForgotPassword = () => {
  return (
    <section className="register-section py-5  d-flex align-items-center">
        <div className="container">
            <div className="row d-flex justify-content-center">
            <div className="col-md-5">
                <div className="form-sec">
                <div className="row">
                    <div className="col-md-12">
                    <div className="content">
                        <center>
                        <img
                            src="/assets/vendor/images/common/logo.png"
                            alt="logo"
                            className="logo pb-4"
                        />
                        </center>
                        <h3 className="secondary-color text-center">Forgot Password</h3>
                        <p className="text-center">You can reset your password here.</p>
                        <form className="mt-5">
                        <div className="mb-3">
                            <label className="form-label">
                            Mobile or Email Address*
                            </label>
                            <input
                            type="text"
                            className="form-control py-2 px-4 rounded-5"
                            placeholder="Enter Mobile Number / Valid Email Id"
                            />
                        </div>
                        <div className="row d-flex align-items-center">
                            <div className="col-md-12">
                            <button
                                type="button"
                                className="btn btn-secondary rounded-5 px-4"
                            >
                                Reset Password
                            </button>
                            </div>
                        </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                <p className="text-center py-3 text-white">
                Copyrights 2024 Bsfye. All Rights Reserved.
                </p>
            </div>
            </div>
        </div>
    </section>
  )
}

export default ForgotPassword
