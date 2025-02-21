import React from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";

const Directory = () => {
  return (
    <div className="directory">
      <div className="flex h-100">
        <Sidebar current={"Directory"} />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="common-back">
              <table
                style={{
                  width: "100%",
                  color: "#fff",
                  textAlign: "left",
                }}
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Birthday</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="flex al-center">
                        <i className="fa-regular fa-circle-user"></i>
                        <p>Michael</p>
                      </div>
                    </td>
                    <td>customer@email.com</td>
                    <td>+91-999999999</td>
                    <td>03/19/2000</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex al-center">
                        <i className="fa-regular fa-circle-user"></i>
                        <p>Michael</p>
                      </div>
                    </td>
                    <td>customer@email.com</td>
                    <td>+91-999999999</td>
                    <td>03/19/2000</td>
                  </tr>
                  <tr>
                    <td>
                      <div className="flex al-center">
                        <i className="fa-regular fa-circle-user"></i>
                        <p>Michael</p>
                      </div>
                    </td>
                    <td>customer@email.com</td>
                    <td>+91-999999999</td>
                    <td>03/19/2000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
