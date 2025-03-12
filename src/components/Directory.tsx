import React, { useEffect, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import { allContactApi, profileContactApi } from "../store/Services/AllApi";
import { useNavigate } from "react-router-dom";

const Directory = () => {
  const [allContacts, setAllContacts]: any = useState([]);
  useEffect(() => {
    allContactApi().then((res: any) => {
      setAllContacts(res.results);
    });
  }, []);

  const profileHandler = (userId: any) => {
    profileContactApi({
      query: {
        id: userId,
      },
    }).then((res: any) => {
      navigate("/profile", { state: { profileData: res } });
    });
  };
  const navigate = useNavigate();

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
                  {allContacts.map((itm: any) => (
                    <tr
                      style={{ cursor: "pointer" }}
                      key={itm.id}
                      onClick={() => profileHandler(itm.id)}
                    >
                      <td>
                        <div className="flex al-center">
                          <i className="fa-regular fa-circle-user"></i>
                          <p>{itm.full_name || "-"}</p>
                        </div>
                      </td>
                      <td>{itm.email || "-"}</td>
                      <td>{itm.phone || "-"}</td>
                      <td>{itm.birthday || "-"}</td>
                    </tr>
                  ))}
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
