import React from "react";
import PageBanner from "../Components/PageBanner";

const OrderHistory = () => {
  return (
    <>
      <PageBanner title={"Orders History"} />
      <div className="Orderhistory table-responsive canvas">
          <table className="table  mt-10 bg-white rounded shadow">
            <div className="filters"></div>
            <thead className="text-white bg-dark">
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">02/03/2023</th>
                <td>Mark</td>
                <td>$50,000</td>
                <td>
                  <p className="badge rounded-pill py-2 px-3 pending">
                    Pending
                  </p>
                </td>
                <td>
                  <button className="continue w-auto mt-0 fs-6 py-1 mx-auto">
                    View Receipt
                  </button>
                </td>
              </tr>

              <tr>
                <th scope="row">15/02/2023</th>
                <td>Muhammad hasnain</td>
                <td>$10,000</td>
                <td>
                  <p className="badge rounded-pill py-2 px-3 success">
                    Transferred
                  </p>
                </td>
                <td>
                  <button className="continue w-auto mt-0 fs-6 py-1 mx-auto">
                    View Receipt
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>
    </>
  );
};

export default OrderHistory;
