import React from 'react'

const AccountSettings = () => {
  return (
    <div className="pad">
      <h2 className="page-title">Account Settings</h2>
      <form>
        <div className="row">
          <div className="col-md-8">
            <div className="row mb-4">
              <div className="col-md-12">
                <img src="assets/img/profile-img.jpg" alt="" width="200px" />
              </div>
              <div className="col-md-6">
                <label htmlFor="account-name" className="form-label">
                  Name*
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="account-name"
                  id="account-name"
                  defaultValue="Name Here"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="account-mobile" className="form-label">
                  Mobile Number*
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="account-mobile"
                  id="account-mobile"
                  defaultValue={9876543210}
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="account-email" className="form-label">
                  Email ID*
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="account-email"
                  id="account-email"
                  defaultValue="sample@gmail.com"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="account-password" className="form-label">
                  Change Password*
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="account-password"
                  id="account-password"
                  defaultValue="Brandesk"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="account-password" className="form-label">
                  Re-Password*
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="account-password"
                  id="account-password"
                  defaultValue="Brandesk"
                />
              </div>
              <div className="col-md-12 mt-4">
                <div className="col-md-12 mt-4">
                  {" "}
                  <h2 className="page-title">Address</h2>{" "}
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Door Number or Flat Number*</label>
                <input type="text" className="form-control py-2 px-4 rounded-5" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Area</label>
                <input type="text" className="form-control py-2 px-4 rounded-5" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Landmark</label>
                <input type="text" className="form-control py-2 px-4 rounded-5" />
              </div>
              <div className="col-md-6">
                <label className="form-label">City*</label>
                <input type="text" className="form-control py-2 px-4 rounded-5" />
              </div>
              <div className="col-md-6">
                <label className="form-label">State*</label>
                <input type="text" className="form-control py-2 px-4 rounded-5" />
              </div>
              <div className="col-md-6">
                <label className="form-label">Pincode*</label>
                <input type="text" className="form-control py-2 px-4 rounded-5" />
              </div>
              <div className="col-md-12 mt-3 text-left">
                <button type="submit" className="btn orange-btn">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

  )
}

export default AccountSettings