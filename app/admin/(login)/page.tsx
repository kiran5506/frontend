"use client";
import React from 'react'

const AdminLoginPage = () => {
  return (
    <main>
        <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
                <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex justify-content-center py-4">
                    <a href="#" className="logo d-flex align-items-center w-auto">
                        <img
                        src="/assets/admin/img/logo.png"
                        alt=""
                        style={{ maxHeight: 70 }}
                        />
                        {/* <span class="d-none d-lg-block">NiceAdmin</span> */}
                    </a>
                    </div>
                    {/* End Logo */}
                    <div className="card mb-3">
                    <div className="card-body">
                        <div className="pt-4 pb-2">
                            <h5 className="card-title text-center pb-0 fs-4">Login</h5>
                        </div>
                        <form className="row g-3" action="#" method="post">
                            <div className="col-12">
                                <label htmlFor="yourUsername" className="form-label">
                                Username
                                </label>
                                <div className="input-group has-validation">
                                <input
                                    type="text"
                                    name="username"
                                    className="form-control"
                                    id="yourUsername"
                                />
                                <div className="invalid-feedback">
                                    Please enter your username.
                                </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <label htmlFor="yourPassword" className="form-label">
                                Password
                                </label>
                                <input
                                type="password"
                                name="password"
                                className="form-control"
                                id="yourPassword"
                                />
                                <div className="invalid-feedback">
                                Please enter your password!
                                </div>
                            </div>
                            <div className="col-12">
                                <button
                                className="btn btn-primary w-100"
                                type="button"
                                onClick={() => location.href='/admin/dashboard'}
                                >
                                Login
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
        </div>
        </main>

  )
}

export default AdminLoginPage
