import Link from "next/link";
import React, { ReactNode } from "react";
import { FaPlus } from "react-icons/fa6";

interface FilterOption {
  name: string;
  value: string;
}

interface AdPageLayoutProps {
  children: ReactNode;
  iscreate?: boolean;
  title: string;
  linkHref?: string;
  name?: string;
  isfilter?: boolean;
  filterOptions?: FilterOption[];
  handleFilter?: (value: string) => void;
}

const ListLayout = ({
  children,
  iscreate,
  title,
  linkHref,
  name,
  isfilter,
  filterOptions,
  handleFilter
}: AdPageLayoutProps) => {
  

  return (
    <section className="section">
      <div className="row">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title d-block d-sm-flex align-items-center justify-content-between">
              {title}
              <div className="col-12 col-sm-6">
                <div className="d-flex align-items-center justify-content-start justify-content-sm-end">
                  {isfilter && (
                    <div className="col-sm-5">
                      <span>Filter by :</span>
                      <select className="form-select" onChange={(e) => handleFilter && handleFilter(e.target.value)}>
                        { filterOptions && filterOptions.map((item: FilterOption, index: number) => {
                          return <option value={item.value} key={index}>{item.name}</option>
                        })}
                      </select>
                    </div>
                  )}
                  <div className="col-sm-5 ms-3 ms-sm-0 mt-4">
                    {iscreate && linkHref && (
                      <Link
                        href={linkHref}
                        className="btn btn-success btn-sm"
                        style={{ float: "right" }}
                      >
                        <FaPlus /> Create {name}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </h5>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListLayout;
