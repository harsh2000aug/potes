import React, { useState } from "react";

import user from "../images/user.png";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";

const Dashboard = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleNotifications = (index: any) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="dashboard">
      <div className="flex h-100">
        <Sidebar current={"Home"} />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="flex space-bw">
              <div className="col-50 common-back">
                <h3>Reminders</h3>
                <ul>
                  {/* Today */}
                  <li
                    className="p-relate"
                    onClick={() => toggleNotifications(0)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex space-bw al-center">
                      <div className="p-relate">
                        <p>Today</p>
                        <div className="number-list">
                          <p>3</p>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-down"
                        style={{
                          color: "#fff",
                          fontSize: "14px"
                        }}
                      ></i>
                    </div>
                    {openIndex === 0 && (
                      <div className="openNoti">
                        <div className="notifications-pannel flex space-bw al-center">
                          <img src={user} alt="" />
                          <p>
                            <b>Lorem Ipsum</b> Placeholder text commonly used in
                            design.
                          </p>
                        </div>
                        <div className="notifications-pannel flex space-bw al-center">
                          <img src={user} alt="" />
                          <p>
                            <b>Lorem Ipsum</b> Placeholder text commonly used in
                            design.
                          </p>
                        </div>
                        <div className="notifications-pannel flex space-bw al-center">
                          <img src={user} alt="" />
                          <p>
                            <b>Lorem Ipsum</b> Placeholder text commonly used in
                            design.
                          </p>
                        </div>
                      </div>
                    )}
                  </li>

                  {/* Tomorrow */}
                  <li
                    className="p-relate"
                    onClick={() => toggleNotifications(1)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex space-bw al-center">
                      <div className="p-relate">
                        <p>Tomorrow</p>
                        <div className="number-list">
                          <p>3</p>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-down"
                        style={{
                          color: "#fff",
                          fontSize: "14px"
                        }}
                      ></i>
                    </div>
                    {openIndex === 1 && (
                      <div className="openNoti">
                        <div className="notifications-pannel flex space-bw">
                          <img src={user} alt="" />
                          <p>
                            <b>Lorem Ipsum</b> Placeholder text commonly used in
                            design.
                          </p>
                        </div>
                        <div className="notifications-pannel flex space-bw">
                          <img src={user} alt="" />
                          <p>
                            <b>Lorem Ipsum</b> Placeholder text commonly used in
                            design.
                          </p>
                        </div>
                        <div className="notifications-pannel flex space-bw">
                          <img src={user} alt="" />
                          <p>
                            <b>Lorem Ipsum</b> Placeholder text commonly used in
                            design.
                          </p>
                        </div>
                      </div>
                    )}
                  </li>

                  {/* Upcoming */}
                  <li
                    className="p-relate"
                    onClick={() => toggleNotifications(2)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="flex space-bw al-center">
                      <div className="p-relate">
                        <p>Upcoming</p>
                        <div className="number-list">
                          <p>10</p>
                        </div>
                      </div>
                      <i className="fa-solid fa-chevron-down"
                        style={{
                          color: "#fff",
                          fontSize: "14px"
                        }}
                      ></i>
                    </div>
                    {openIndex === 2 && (
                      <div className="openNoti">
                        <div className="notifications-pannel flex space-bw">
                          <img src={user} alt="" />
                          <p>
                            <b>Lorem Ipsum</b> Placeholder text commonly used in
                            design.
                          </p>
                        </div>
                        <div className="notifications-pannel flex space-bw">
                          <img src={user} alt="" />
                          <p>
                            <b>Lorem Ipsum</b> Placeholder text commonly used in
                            design.
                          </p>
                        </div>
                        <div className="notifications-pannel flex space-bw">
                          <img src={user} alt="" />
                          <p>
                            <b>Lorem Ipsum</b> Placeholder text commonly used in
                            design.
                          </p>
                        </div>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
              <div className="col-50">
                <div className="common-back mb-15">
                  <h3>This Happened an days ago</h3>
                  <ul>
                    <li>
                      <p>Garvit made ui</p>
                    </li>
                  </ul>
                </div>
                <div className="common-back">
                  <h3>Birthdays & Anniversary</h3>
                  <ul>
                    <li>
                      <div className="flex space-bw al-center">
                        <div className="flex al-center">
                          <img src={user} alt="" />
                          <p>Michael</p>
                        </div>
                        <p>MM/DD/YYYY</p>
                      </div>
                    </li>
                    <li>
                      <div className="flex space-bw al-center">
                        <div className="flex al-center">
                          <img src={user} alt="" />
                          <p>Jordan</p>
                        </div>
                        <p>MM/DD/YYYY</p>
                      </div>
                    </li>
                    <li>
                      <div className="flex space-bw al-center">
                        <div className="flex al-center">
                          <img src={user} alt="" />
                          <p>Harish Chaudhary</p>
                        </div>
                        <p>MM/DD/YYYY</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
