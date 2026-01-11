import Link from "next/link";
import React from "react";
// callbackRequestsData.js
const callbackRequests = [
  {
    id: 1,
    date: "15-04-2025",
    name: "Ramesh",
    mobile: "9999999999",
    whatsappNumber: "919985886393",
    leadAbout: "Enquiry for Advertising Agencies"
  },
  {
    id: 2,
    date: "15-04-2025",
    name: "Ramesh",
    mobile: "9999999999",
    whatsappNumber: "919985886393",
    leadAbout: "Enquiry for Advertising Agencies"
  },
  {
    id: 3,
    date: "15-04-2025",
    name: "Ramesh",
    mobile: "9999999999",
    whatsappNumber: "919985886393",
    leadAbout: "Enquiry for Advertising Agencies"
  },
   {
    id: 4,
    date: "15-04-2025",
    name: "Ramesh",
    mobile: "9999999999",
    whatsappNumber: "919985886393",
    leadAbout: "Enquiry for Advertising Agencies"
  },
  {
    id: 5,
    date: "15-04-2025",
    name: "Ramesh",
    mobile: "9999999999",
    whatsappNumber: "919985886393",
    leadAbout: "Enquiry for Advertising Agencies"
  },
  {
    id: 6,
    date: "15-04-2025",
    name: "Ramesh",
    mobile: "9999999999",
    whatsappNumber: "919985886393",
    leadAbout: "Enquiry for Advertising Agencies"
  }
];


const CallbackRequests = () => {
  return (
    <div className="pad">
      <div className="row align-items-center d-flex mb-4">
        <div className="col-md-4">
          <h2 className="page-title">Callback Requests</h2>
        </div>
        <div className="col-md-4">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <div className="col-md-4">
          <div className="d-block d-md-flex align-items-center justify-content-end">
            <input type="date" className="form-control mt-3 mt-md-0" />
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
              <th className="midd">NAME</th>
              <th className="largee">LEAD ABOUT</th>
            </tr>
          </thead>

          <tbody>
            {callbackRequests.map((item) => (
              <tr key={item.id}>
                <td className="minn">{item.id}</td>
                <td className="midd">{item.date}</td>
                <td className="midd">
                  <Link
                    href={`https://api.whatsapp.com/send/?phone=${item.whatsappNumber}&text&type=letmeknowcostbsfye`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#000" }}
                  >
                    <img
                      src="assets/img/whatsapp.png"
                      alt="WhatsApp"
                      width={25}
                    />
                    {` ${item.mobile}`}
                  </Link>
                </td>
                <td className="midd">{item.name}</td>
                <td className="largee">{item.leadAbout}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
};

export default CallbackRequests;
