import Link from 'next/link'
import React from 'react'

const LeadsManagement = () => {
  return (
    <div className="pad">
      <div className="row align-items-center d-flex mb-4">
        <div className="col-md-4">
          <h2 className="page-title">Leads Management</h2>
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <div className="col-md-4">
          <div className="d-block d-md-flex align-items-center justify-content-end">
            <input
              type="date"
              className="form-control mt-3 mt-md-0"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="row align-items-center">
          {/* Leads Section */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <i className="bi bi-person-lines-fill fs-3 text-primary" />
              </div>
              <div>
                <div className="text-muted small">Leads Used</div>
                <div className="h5 mb-0">200 / 500</div>
                <div className="progress mt-1" style={{ height: 6 }}>
                  <div
                    className="progress-bar bg-success"
                    style={{ width: "40%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Replace Credits Section */}
          <div className="col-md-4">
            <div className="bg-light rounded p-2 d-inline-block myll">
              <i className="bi bi-arrow-repeat text-warning me-1" />
              <strong className="text-dark">10</strong>
              <span className="text-muted small">Replace Credits</span>
            </div>
          </div>
          <div className="col-12 col-md-5 text-end two-btns">
            <Link
              href="lead-packages.php"
              className="btn orange-btn btn-xs float-right"
            >
              Recharge
            </Link>
            <a
              href="transactions.php"
              className="btn orange-btn btn-xs float-right"
            >
              Transactions
            </a>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="responsive-table-new table table-bordered text-start wallet-table">
          <thead>
            <tr>
              <th className="minn">S.No</th>
              <th className="midd">DATE</th>
              <th className="midd">MOBILE</th>
              <th className="largee">LEAD ABOUT</th>
              <th className="midd">LOCATION</th>
              <th className="midd">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="minn">1</td>
              <td className="midd">15-04-2025</td>
              <td className="midd">
                <Link
                  href="https://api.whatsapp.com/send/?phone=919985886393&text&type=letmeknowcostbsfye"
                  target="_blank"
                  style={{ color: "#000" }}
                >
                  <img src="assets/img/whatsapp.png" alt="" width={25} /> 9999999999
                </Link>
              </td>
              <td className="largee">Enquiry for Advertising Agencies</td>
              <td className="midd">Vizag</td>
              <td className="midd">
                <Link href="#" className="btn btn-success">
                  <i className="bi bi-hand-thumbs-up" />
                </Link>
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#negative-review"
                  className="btn btn-danger"
                >
                  <i className="bi bi-hand-thumbs-down" />
                </Link>
              </td>
            </tr>
            <tr className="activecolor">
              <td className="minn ">1</td>
              <td className="midd">15-04-2025</td>
              <td className="midd">
                <Link
                  href="https://api.whatsapp.com/send/?phone=919985886393&text&type=letmeknowcostbsfye"
                  target="_blank"
                  style={{ color: "#000" }}
                >
                  <img src="assets/img/whatsapp.png" alt="" width={25} /> 9999999999
                </Link>
              </td>
              <td className="largee">Enquiry for Advertising Agencies</td>
              <td className="midd">Vizag</td>
              <td className="midd">
                <Link href="#" className="btn btn-success">
                  <i className="bi bi-hand-thumbs-up" />
                </Link>
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#negative-review"
                  className="btn btn-danger"
                >
                  <i className="bi bi-hand-thumbs-down" />
                </Link>
              </td>
            </tr>
            <tr>
              <td className="minn">1</td>
              <td className="midd">15-04-2025</td>
              <td className="midd">
                <Link
                  href="https://api.whatsapp.com/send/?phone=919985886393&text&type=letmeknowcostbsfye"
                  target="_blank"
                  style={{ color: "#000" }}
                >
                  <img src="assets/img/whatsapp.png" alt="" width={25} /> 9999999999
                </Link>
              </td>
              <td className="largee">Enquiry for Advertising Agencies</td>
              <td className="midd">Vizag</td>
              <td className="midd">
                <Link href="#" className="btn btn-success">
                  <i className="bi bi-hand-thumbs-up" />
                </Link>
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#negative-review"
                  className="btn btn-danger"
                >
                  <i className="bi bi-hand-thumbs-down" />
                </Link>
              </td>
            </tr>
            <tr>
              <td className="minn">1</td>
              <td className="midd">15-04-2025</td>
              <td className="midd">
                <Link
                  href="https://api.whatsapp.com/send/?phone=919985886393&text&type=letmeknowcostbsfye"
                  target="_blank"
                  style={{ color: "#000" }}
                >
                  <img src="assets/img/whatsapp.png" alt="" width={25} /> 9999999999
                </Link>
              </td>
              <td className="largee">Enquiry for Advertising Agencies</td>
              <td className="midd">Vizag</td>
              <td className="midd">
                <Link href="#" className="btn btn-success">
                  <i className="bi bi-hand-thumbs-up" />
                </Link>
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#negative-review"
                  className="btn btn-danger"
                >
                  <i className="bi bi-hand-thumbs-down" />
                </Link>
              </td>
            </tr>
            <tr>
              <td className="minn">1</td>
              <td className="midd">15-04-2025</td>
              <td className="midd">
                <Link
                  href="https://api.whatsapp.com/send/?phone=919985886393&text&type=letmeknowcostbsfye"
                  target="_blank"
                  style={{ color: "#000" }}
                >
                  <img src="assets/img/whatsapp.png" alt="" width={25} /> 9999999999
                </Link>
              </td>
              <td className="largee">Enquiry for Advertising Agencies</td>
              <td className="midd">Vizag</td>
              <td className="midd">
                <Link href="#" className="btn btn-success">
                  <i className="bi bi-hand-thumbs-up" />
                </Link>
                <Link
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#negative-review"
                  className="btn btn-danger"
                >
                  <i className="bi bi-hand-thumbs-down" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LeadsManagement