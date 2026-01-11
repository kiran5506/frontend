import React from "react";

const BusinessPortfolio = () => {
  return (
    <>
      <div className="pad">
        <div className="row mb-3 mb-md-0">
          <div className="col-12 col-md-8">
            <h2 className="page-title">Business Portfolio</h2>
          </div>
          <div className="col-12 col-md-4">
            {" "}
            <span style={{ margin: 3 }}>
              {" "}
              <a href="#" className="btn orange-btn btn-xs ">
                {" "}
                + Add Videos{" "}
              </a>{" "}
            </span>{" "}
            <span style={{ margin: 3 }}>
              {" "}
              <a href="#" className="btn orange-btn btn-xs ">
                {" "}
                + Add Photos{" "}
              </a>{" "}
            </span>
          </div>
        </div>
        <div className="row package-row">
          <div className="col-sm-12">
            <div className="table-responsive">
              <table className="responsive-table-new table table-bordered text-start wallet-table">
                <thead>
                  <tr>
                    <th className="minn">S.No</th>
                    <th className="midd">EVENT NAME</th>
                    <th className="midd">Items</th>
                    <th className="midd">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="minn">1</td>
                    <td className="midd">Marriage Event</td>
                    <td className="midd">
                      Photos - 2 <br /> Videos - 4{" "}
                    </td>
                    <td className="midd">
                      <a
                        href="add-business-portfolio.php"
                        className="btn btn-primary py-2 px-2"
                        style={{
                          fontSize: 15,
                          paddingLeft: "10px !important",
                          paddingRight: "10px !important",
                        }}
                      >
                        {" "}
                        Edit / Delete{" "}
                        <img src="assets/img/btn-arrow.png" alt="" width={10} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="minn">1</td>
                    <td className="midd">Marriage Event</td>
                    <td className="midd">
                      Photos - 2 <br /> Videos - 4{" "}
                    </td>
                    <td className="midd">
                      <a
                        href="add-business-portfolio.php"
                        className="btn btn-primary py-2 px-2"
                        style={{
                          fontSize: 15,
                          paddingLeft: "10px !important",
                          paddingRight: "10px !important",
                        }}
                      >
                        {" "}
                        Edit / Delete{" "}
                        <img src="assets/img/btn-arrow.png" alt="" width={10} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="minn">1</td>
                    <td className="midd">Marriage Event</td>
                    <td className="midd">
                      Photos - 2 <br /> Videos - 4{" "}
                    </td>
                    <td className="midd">
                      <a
                        href="add-business-portfolio.php"
                        className="btn btn-primary py-2 px-2"
                        style={{
                          fontSize: 15,
                          paddingLeft: "10px !important",
                          paddingRight: "10px !important",
                        }}
                      >
                        {" "}
                        Edit / Delete{" "}
                        <img src="assets/img/btn-arrow.png" alt="" width={10} />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="minn">1</td>
                    <td className="midd">Marriage Event</td>
                    <td className="midd">
                      Photos - 2 <br /> Videos - 4{" "}
                    </td>
                    <td className="midd">
                      <a
                        href="add-business-portfolio.php"
                        className="btn btn-primary py-2 px-2"
                        style={{
                          fontSize: 15,
                          paddingLeft: "10px !important",
                          paddingRight: "10px !important",
                        }}
                      >
                        {" "}
                        Edit / Delete{" "}
                        <img src="assets/img/btn-arrow.png" alt="" width={10} />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessPortfolio;
