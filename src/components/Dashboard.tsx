import React, { useEffect, useState } from "react";

import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import {
  showBirthdays,
  showReminders,
  yearsAgo,
} from "../store/Services/AllApi";
const Dashboard = () => {
  const [birthdays, setBirthdays]: any = useState([]);
  const [reminders, setReminders]: any = useState([]);
  const [remindersTomm, setRemindersTomm]: any = useState([]);
  const [remindersUpcoming, setRemindersUpcoming]: any = useState([]);
  const [today, setToday]: any = useState(false);
  const [tommorow, setTommorow]: any = useState(false);
  const [upcoming, setUpcoming]: any = useState(false);
  const [contactAndNotes, setContactAndNotes]: any = useState({});

  useEffect(() => {
    showBirthdays()
      .then((res: any) => {
        setBirthdays(res.birthdays);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
    showReminders()
      .then((res: any) => {
        setReminders(res.reminders.today);
        setRemindersTomm(res.reminders.tomorrow);
        setRemindersUpcoming(res.reminders.upcoming);
      })
      .catch((err: any) => {
        console.log("err", err);
      });

    yearsAgo()
      .then((res: any) => {
        setContactAndNotes(res);
      })
      .catch((err: any) => {
        console.log("err", err);
      });
  }, []);

  const handleToday = () => {
    setToday(!today);
  };

  const handleTommorow = () => {
    setTommorow(!tommorow);
  };

  const handleUpcoming = () => {
    setUpcoming(!upcoming);
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
                {/* today */}
                <div className="today mb-15">
                  <div
                    className="flex space-bw al-center"
                    onClick={handleToday}
                  >
                    <div className="p-relate">
                      <p>Today</p>
                      <div className="number-list">
                        <p>{reminders.length}</p>
                      </div>
                    </div>
                    <i
                      className={
                        today
                          ? "fa-solid fa-chevron-up"
                          : "fa-solid fa-chevron-down"
                      }
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    ></i>
                  </div>
                  <div
                    style={{
                      display: today ? "block" : "none",
                    }}
                  >
                    <ul>
                      {reminders?.map((itm: any) => (
                        <li
                          key={itm.id}
                          className="p-relate"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="openNoti">
                            <div className="notifications-pannel flex space-bw al-center">
                              <i className="fa-regular fa-circle-user"></i>
                              <p>{itm.note}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* tommorow */}
                <div className="tomorrow mb-15">
                  <div
                    className="flex space-bw al-center"
                    onClick={handleTommorow}
                  >
                    <div className="p-relate">
                      <p>Tommorow</p>
                      <div className="number-list">
                        <p>{remindersTomm.length}</p>
                      </div>
                    </div>
                    <i
                      className={
                        tommorow
                          ? "fa-solid fa-chevron-up"
                          : "fa-solid fa-chevron-down"
                      }
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    ></i>
                  </div>
                  <div
                    style={{
                      display: tommorow ? "block" : "none",
                    }}
                  >
                    <ul>
                      {remindersTomm?.map((itm: any) => (
                        <li
                          key={itm.id}
                          className="p-relate"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="openNoti">
                            <div className="notifications-pannel flex space-bw al-center">
                              <i className="fa-regular fa-circle-user"></i>
                              <p>{itm.note}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* upcoming */}
                <div className="upcoming">
                  <div
                    className="flex space-bw al-center"
                    onClick={handleUpcoming}
                  >
                    <div className="p-relate">
                      <p>Upcoming</p>
                      <div className="number-list">
                        <p>{remindersUpcoming.length}</p>
                      </div>
                    </div>
                    <i
                      className={
                        upcoming
                          ? "fa-solid fa-chevron-up"
                          : "fa-solid fa-chevron-down"
                      }
                      style={{
                        color: "#fff",
                        fontSize: "14px",
                      }}
                    ></i>
                  </div>
                  <div
                    style={{
                      display: upcoming ? "block" : "none",
                    }}
                  >
                    <ul>
                      {remindersUpcoming?.map((itm: any) => (
                        <li
                          key={itm.id}
                          className="p-relate"
                          style={{ cursor: "pointer" }}
                        >
                          <div className="openNoti">
                            <div className="notifications-pannel flex space-bw al-center">
                              <i className="fa-regular fa-circle-user"></i>
                              <p>{itm.note}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-50">
                <div className="common-back mb-15">
                  <h3>This Happened an year ago</h3>
                  <ul>
                    {contactAndNotes.notes?.map((itm: any) => (
                      <li key={itm} className="flex">
                        <span
                          style={{
                            color: "#fff",
                            marginRight: "10px",
                            fontWeight: "700",
                          }}
                        >
                          {itm?.contact_full_name}
                        </span>
                        <p>{itm.note}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="common-back">
                  <h3>Birthdays</h3>
                  <ul>
                    {birthdays?.map((itm: any) => (
                      <li key={itm.id}>
                        <div className="flex space-bw al-center">
                          <div className="flex al-center">
                            <i className="fa-regular fa-circle-user"></i>
                            <p>{itm.full_name}</p>
                          </div>
                          <p>{itm.birthday}</p>
                        </div>
                      </li>
                    ))}
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
