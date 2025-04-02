import React, { useEffect, useState } from "react";
import user from "../images/user.png";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import {
  profileContactApi,
  showBirthdays,
  showReminders,
  yearsAgo,
} from "../store/Services/AllApi";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [birthdays, setBirthdays]: any = useState([]);
  const [spousebirthdays, setSpouseBirthdays]: any = useState([]);
  const [childBirthdays, setChildBirthdays]: any = useState([]);
  const [anniversary, setAnniversary]: any = useState([]);
  const [reminders, setReminders]: any = useState([]);
  const [remindersTomm, setRemindersTomm]: any = useState([]);
  const [remindersUpcoming, setRemindersUpcoming]: any = useState([]);
  const [today, setToday]: any = useState(true);
  const [tommorow, setTommorow]: any = useState(false);
  const [upcoming, setUpcoming]: any = useState(false);
  const [contactAndNotes, setContactAndNotes]: any = useState({});
  const [loading, setLoading]: any = useState(false);
  const navigate = useNavigate();
  const profileHandler = (userId: any) => {
    profileContactApi({
      query: {
        id: userId,
      },
    }).then((res: any) => {
      navigate("/profile", { state: { profileData: res } });
    });
  };

  function formatDate(timestamp: any) {
    const date = new Date(timestamp);
    const yy = String(date.getFullYear());
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");

    return `${mm}-${dd}-${yy}`;
  }

  useEffect(() => {
    setLoading(true);
    showBirthdays()
      .then((res: any) => {
        setBirthdays(res.birthdays);
        setAnniversary(res.anniversary);
        setSpouseBirthdays(res.spouse_birthday);
        setChildBirthdays(res.child_birthday);
      })
      .catch((err: any) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
      });
    showReminders()
      .then((res: any) => {
        setReminders(res.reminders.today);
        setRemindersTomm(res.reminders.tomorrow);
        setRemindersUpcoming(res.reminders.upcoming);
      })
      .catch((err: any) => {
        console.log("err", err);
      })
      .finally(() => {
        setLoading(false);
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

  const handleNotePage = () => {};

  return (
    <div className="dashboard">
      <div className="flex h-100">
        <Sidebar current={"Home"} />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="flex space-bw">
              <div className="col-50 common-back">
                <h3>Reminders(This week)</h3>
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
                          onClick={handleNotePage}
                        >
                          <div className="openNoti">
                            <div className="notifications-pannel flex space-bw al-center">
                              <img
                                src={
                                  itm.contact_photo ? itm.contact_photo : user
                                }
                                alt=""
                              />
                              <p onClick={() => profileHandler(itm?.contact)}>
                                <b
                                  style={{
                                    marginRight: "5px",
                                  }}
                                >
                                  {itm.contact_full_name}:
                                </b>
                                {itm.note.length > 50
                                  ? `${itm.note.slice(
                                      0,
                                      25
                                    )} ... ${itm.note.slice(-25)}`
                                  : itm.note}
                              </p>
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
                              <img
                                src={
                                  itm.contact_photo ? itm.contact_photo : user
                                }
                                alt=""
                              />
                              <p onClick={() => profileHandler(itm?.contact)}>
                                <b
                                  style={{
                                    marginRight: "5px",
                                  }}
                                >
                                  {itm.contact_full_name}:
                                </b>
                                {itm.note.length > 50
                                  ? `${itm.note.slice(
                                      0,
                                      25
                                    )} ... ${itm.note.slice(-25)}`
                                  : itm.note}
                              </p>
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
                              <img
                                src={
                                  itm.contact_photo ? itm.contact_photo : user
                                }
                                alt=""
                              />
                              <p onClick={() => profileHandler(itm?.contact)}>
                                <b
                                  style={{
                                    marginRight: "5px",
                                  }}
                                >
                                  {itm.contact_full_name}:
                                </b>
                                {itm.note.length > 50
                                  ? `${itm.note.slice(
                                      0,
                                      25
                                    )} ... ${itm.note.slice(-25)}`
                                  : itm.note}
                              </p>
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
                  <div className="scroll">
                    <ul>
                      {contactAndNotes.notes?.map((itm: any) => (
                        <li
                          style={{
                            cursor: "pointer",
                          }}
                          key={itm}
                          className="flex"
                          onClick={() => profileHandler(itm?.contact)}
                        >
                          <span
                            style={{
                              color: "#fff",
                              marginRight: "10px",
                              fontWeight: "700",
                            }}
                          >
                            {itm?.contact_full_name} :
                          </span>
                          <p>
                            {itm.note.length > 60
                              ? `${itm.note.slice(
                                  0,
                                  30
                                )} ....... ${itm.note.slice(-10)}`
                              : itm.note}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="common-back">
                  <h3>Events</h3>
                  <div className="scroll">
                    <h5
                      style={{
                        color: "#fff",
                        fontSize: "18px",
                        marginBottom: "10px",
                        fontWeight: 700,
                      }}
                    >
                      Birthdays
                    </h5>
                    <ul style={{ marginBottom: "20px" }}>
                      {birthdays && birthdays.length > 0 ? (
                        birthdays.map((itm: any) => (
                          <li
                            key={itm.id}
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => profileHandler(itm?.id)}
                          >
                            <div className="flex space-bw al-center">
                              <div className="flex al-center">
                                {itm?.photo ? (
                                  <img src={itm?.photo} alt="" />
                                ) : (
                                  <i className="fa-regular fa-circle-user"></i>
                                )}
                                <p>{itm.full_name}</p>
                              </div>
                              <p>{formatDate(itm.birthday)}</p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>No birthdays found</p>
                      )}
                    </ul>
                    <h5
                      style={{
                        color: "#fff",
                        fontSize: "18px",
                        marginBottom: "10px",
                        fontWeight: 700,
                      }}
                    >
                      Anniversary
                    </h5>
                    <ul style={{ marginBottom: "20px" }}>
                      {anniversary && anniversary.length > 0 ? (
                        anniversary.map((itm: any) => (
                          <li
                            key={itm.id}
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => profileHandler(itm?.id)}
                          >
                            <div className="flex space-bw al-center">
                              <div className="flex al-center">
                                {itm?.photo ? (
                                  <img src={itm?.photo} alt="" />
                                ) : (
                                  <i className="fa-regular fa-circle-user"></i>
                                )}
                                <p>{itm.full_name}</p>
                              </div>
                              <p>{formatDate(itm.anniversary)}</p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>No anniversaries found</p>
                      )}
                    </ul>
                    <h5
                      style={{
                        color: "#fff",
                        fontSize: "18px",
                        marginBottom: "10px",
                        fontWeight: 700,
                      }}
                    >
                      Spouse's Birthdays
                    </h5>
                    <ul style={{ marginBottom: "20px" }}>
                      {spousebirthdays && spousebirthdays.length > 0 ? (
                        spousebirthdays.map((itm: any) => (
                          <li
                            key={itm.id}
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => profileHandler(itm?.id)}
                          >
                            <div className="flex space-bw al-center">
                              <div className="flex al-center">
                                {itm?.photo ? (
                                  <img src={itm?.photo} alt="" />
                                ) : (
                                  <i className="fa-regular fa-circle-user"></i>
                                )}
                                <p>
                                  {itm.spouse_name} ({itm.full_name}'s Spouse)
                                </p>
                              </div>
                              <p>{formatDate(itm.spouse_birthday)}</p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>No spouse's birthdays found</p>
                      )}
                    </ul>
                    <h5
                      style={{
                        color: "#fff",
                        fontSize: "18px",
                        marginBottom: "10px",
                        fontWeight: 700,
                      }}
                    >
                      Child's Birthdays
                    </h5>
                    <ul>
                      {childBirthdays && childBirthdays.length > 0 ? (
                        childBirthdays.map((itm: any) => (
                          <li
                            key={itm.id}
                            style={{
                              cursor: "pointer",
                            }}
                            onClick={() => profileHandler(itm?.contact)}
                          >
                            <div className="flex space-bw al-center">
                              <div className="flex al-center">
                                {itm?.contact__photo ? (
                                  <img src={itm?.contact__photo} alt="" />
                                ) : (
                                  <i className="fa-regular fa-circle-user"></i>
                                )}
                                <p>
                                  {itm.name} ({itm.contact__full_name}'s Child)
                                </p>
                              </div>
                              <p>{formatDate(itm.birthday)}</p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p>No child's birthdays found</p>
                      )}
                    </ul>
                  </div>
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
