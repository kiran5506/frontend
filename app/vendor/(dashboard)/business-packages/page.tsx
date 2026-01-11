import Link from 'next/link';
import React from 'react'

const businessPackagesData = [
  {
    id: 1,
    eventName: "Marriage Event",
    cities: [
      { name: "Visakhapatnam", count: 2 },
      { name: "Srikakulam", count: 4 },
      { name: "Hyderabad", count: 3 },
    ],
    cta: "Edit / Delete"
  },
  {
    id: 2,
    eventName: "Birthday Event",
    cities: [
      { name: "Chennai", count: 1 },
      { name: "Bangalore", count: 5 },
    ],
    cta: "Edit / Delete"
  },
];
const BusinessPackages = () => {
    return (
        <div className="pad">
            <div className="row mb-3 mb-md-0">
                <div className="col-12 col-md-8">
                    <h2 className="page-title">Business Packages</h2>
                </div>
                <div className="col-12 col-md-4">
                    <Link
                        href="add-business-packages.php"
                        className="btn orange-btn btn-xs float-right"
                    >
                        Add New Package{" "}
                    </Link>
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
                                    <th className="largee">CITY</th>
                                    <th className="midd">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="minn">1</td>
                                    <td className="midd">Marriage Event</td>
                                    <td className="largee">
                                        Visakhapatnam - 2 Packages <br /> Srikakulam - 4 Packages <br />{" "}
                                        Hyderabad - 3 Packages
                                    </td>
                                    <td className="midd">
                                        <Link
                                            href="add-business-packages.php"
                                            className="btn btn-primary py-2 px-2"
                                            style={{
                                                fontSize: 15,
                                                paddingLeft: "10px !important",
                                                paddingRight: "10px !important"
                                            }}
                                        >
                                            {" "}
                                            Edit / Delete{" "}
                                            <img src="assets/img/btn-arrow.png" alt="" width={10} />
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="minn">1</td>
                                    <td className="midd">Marriage Event</td>
                                    <td className="largee">
                                        Visakhapatnam - 2 Packages <br /> Srikakulam - 4 Packages <br />{" "}
                                        Hyderabad - 3 Packages
                                    </td>
                                    <td className="midd">
                                        <Link
                                            href="add-business-packages.php"
                                            className="btn btn-primary py-2 px-2"
                                            style={{
                                                fontSize: 15,
                                                paddingLeft: "10px !important",
                                                paddingRight: "10px !important"
                                            }}
                                        >
                                            {" "}
                                            Edit / Delete{" "}
                                            <img src="assets/img/btn-arrow.png" alt="" width={10} />
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="minn">1</td>
                                    <td className="midd">Marriage Event</td>
                                    <td className="largee">
                                        Visakhapatnam - 2 Packages <br /> Srikakulam - 4 Packages <br />{" "}
                                        Hyderabad - 3 Packages
                                    </td>
                                    <td className="midd">
                                        <Link
                                            href="add-business-packages.php"
                                            className="btn btn-primary py-2 px-2"
                                            style={{
                                                fontSize: 15,
                                                paddingLeft: "10px !important",
                                                paddingRight: "10px !important"
                                            }}
                                        >
                                            {" "}
                                            Edit / Delete{" "}
                                            <img src="assets/img/btn-arrow.png" alt="" width={10} />
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="minn">1</td>
                                    <td className="midd">Marriage Event</td>
                                    <td className="largee">
                                        Visakhapatnam - 2 Packages <br /> Srikakulam - 4 Packages <br />{" "}
                                        Hyderabad - 3 Packages
                                    </td>
                                    <td className="midd">
                                        <Link
                                            href="add-business-packages.php"
                                            className="btn btn-primary py-2 px-2"
                                            style={{
                                                fontSize: 15,
                                                paddingLeft: "10px !important",
                                                paddingRight: "10px !important"
                                            }}
                                        >
                                            {" "}
                                            Edit / Delete{" "}
                                            <img src="assets/img/btn-arrow.png" alt="" width={10} />
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BusinessPackages