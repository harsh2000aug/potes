import React, { useEffect, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import { allContactApi, profileContactApi } from "../store/Services/AllApi";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { table } from "console";

const Directory = () => {
  const [allContacts, setAllContacts]: any = useState(undefined);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const [search, setSearch]: any = useState("");

  useEffect(() => {
    allContactApi({
      query: {
        page: currentPage,
        name: search,
      },
    }).then((res: any) => {
      setAllContacts(res?.results);
      setTotalPages(res?.total_pages || 0);
    });
  }, [currentPage, search]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

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
          <TopArea search={search} setSearch={setSearch} />
          {allContacts && (
            <div className="body-area">
              {allContacts?.length > 0 ? (
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
                  {totalPages > 1 && (
                    <Pagination
                      current={currentPage}
                      total={totalPages * 10}
                      onChange={onPageChange}
                      showSizeChanger={false}
                      align="center"
                    />
                  )}
                </div>
              ) : (
                <div className="common-back">
                  <table
                    style={{
                      width: "100%",
                      color: "#fff",
                      textAlign: "left",
                    }}
                  >
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No.</th>
                      <th>Birthday</th>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>No contact found!</td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directory;
