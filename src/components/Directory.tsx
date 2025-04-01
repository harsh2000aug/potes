import React, { useEffect, useState } from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import { allContactApi, profileContactApi } from "../store/Services/AllApi";
import { useNavigate } from "react-router-dom";
import { Pagination } from "antd";
import { table } from "console";
import toast from "react-hot-toast";
import FullScreenLoader from "./FullScreenLoader/FullScreenLoader";

const Directory = () => {
  const [allContacts, setAllContacts]: any = useState(undefined);
  const [currentPage, setCurrentPage]: any = useState(1);
  const [totalPages, setTotalPages]: any = useState(0);
  const [search, setSearch]: any = useState("");
  const [loading, setLoading]: any = useState(false);

  useEffect(() => {
    setLoading(true);
    allContactApi({
      query: {
        page: currentPage,
        name: search,
      },
    })
      .then((res: any) => {
        setAllContacts(res?.results);
        setTotalPages(res?.total_pages || 0);
      })
      .catch((err: any) => {
        toast.error(err.data.error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, search]);

  const onPageChange = (page: any) => {
    setCurrentPage(page);
  };

  const navigate = useNavigate();
  const profileHandler = (userId: any) => {
    profileContactApi({
      query: {
        id: userId,
      },
    }).then((res: any) => {
      navigate(`/profile`, { state: { profileData: res } });
    });
  };

  function formatDate(date: any) {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
  }

  return (
    <div className="directory">
      {loading && <FullScreenLoader />}
      <div className="flex h-100">
        <Sidebar current={"Directory"} />
        <div className="main-area">
          <TopArea search={search} setSearch={setSearch} />
          {allContacts && (
            <div className="body-area">
              {allContacts?.length > 0 ? (
                <div className="common-back">
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Number</th>
                          <th>Birthday</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allContacts.map((itm: any, index: any) => (
                          <React.Fragment key={itm.id}>
                            {itm?.full_name?.[0]?.toUpperCase() !==
                              allContacts[
                                index - 1
                              ]?.full_name?.[0]?.toUpperCase() && (
                              <p className="table-header">
                                {/[^A-Z]/.test(
                                  itm?.full_name?.[0]?.toUpperCase()
                                )
                                  ? "#"
                                  : itm?.full_name?.[0]?.toUpperCase()}
                              </p>
                            )}
                            <tr
                              style={{ cursor: "pointer" }}
                              onClick={() => profileHandler(itm.id)}
                            >
                              <td>
                                <div className="flex al-center">
                                  {itm?.photo ? (
                                    <img src={itm?.photo} alt="" />
                                  ) : (
                                    <i className="fa-regular fa-circle-user"></i>
                                  )}
                                  <p>{itm.full_name || "-"}</p>
                                </div>
                              </td>
                              <td>{itm.email || "-"}</td>
                              <td>{itm.phone || "-"}</td>
                              <td>{formatDate(itm.birthday) || "-"}</td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Number</th>
                          <th>Birthday</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td></td>
                          <td>No contact found!</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
