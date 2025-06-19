import React, { useEffect, useState, useRef, useCallback } from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import { allContactApi, profileContactApi } from "../store/Services/AllApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FullScreenLoader from "./FullScreenLoader/FullScreenLoader";
import dayjs from "dayjs";

const Directory = () => {
  const [allContacts, setAllContacts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const SmallLoader = () => (
    <div
      style={{
        display: "inline-block",
        border: "3px solid #f3f3f3",
        borderTop: "3px solid #3498db",
        borderRadius: "50%",
        width: "20px",
        height: "20px",
        animation: "spin 1s linear infinite",
      }}
    ></div>
  );
  const navigate = useNavigate();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastContactElementRef = useCallback(
    (node: HTMLTableRowElement | HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setAllContacts([]);
    setCurrentPage(1);
    setHasMore(true);
    setInitialLoading(true);
  }, [search]);

  useEffect(() => {
    if (!hasMore && currentPage > 1) return;

    if (currentPage === 1) {
      setInitialLoading(true);
    }
    setLoading(true);

    allContactApi({
      query: {
        page: currentPage,
        name: search,
      },
    })
      .then((res: any) => {
        setAllContacts((prevContacts) => {
          const existingIds = new Set(prevContacts.map((c) => c.id));
          const newContacts =
            res?.results?.filter((c: any) => !existingIds.has(c.id)) || [];
          return currentPage === 1
            ? res?.results || []
            : [...prevContacts, ...newContacts];
        });

        setHasMore(
          (res?.results?.length || 0) > 0 &&
            currentPage < (res?.total_pages || 0)
        );
      })
      .catch((err: any) => {
        toast.error(err?.data?.error || "Failed to fetch contacts");
        setHasMore(false);
      })
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });
  }, [currentPage, search, hasMore]);

  const profileHandler = (userId: any) => {
    profileContactApi({
      query: {
        id: userId,
      },
    })
      .then((res: any) => {
        navigate(`/profile`, { state: { profileData: res } });
      })
      .catch((err: any) => {
        toast.error(err?.data?.error || "Failed to load profile");
      });
  };

  // function formatDate(dateStringYMD: any) {
  //   if (!dateStringYMD || typeof dateStringYMD !== "string") {
  //     console.error("Invalid input: Please provide a date string.");
  //     return null;
  //   }

  //   const parts = dateStringYMD.split("-");

  //   if (parts.length !== 3) {
  //     console.error(
  //       `Invalid date format: Expected YYYY-MM-DD, but received "${dateStringYMD}"`
  //     );
  //     return null;
  //   }

  //   const year = parts[0];
  //   const month = parts[1];
  //   const day = parts[2];

  //   if (
  //     year.length !== 4 ||
  //     month.length !== 2 ||
  //     day.length !== 2 ||
  //     isNaN(parseInt(year)) ||
  //     isNaN(parseInt(month)) ||
  //     isNaN(parseInt(day))
  //   ) {
  //     console.warn(
  //       `Potentially invalid date parts in "${dateStringYMD}". Proceeding with formatting.`
  //     );
  //   }

  //   return `${month}-${day}-${year}`;
  // }

  const showHeader = (currentItem: any, index: number) => {
    if (index === 0) return true;
    const prevItem = allContacts[index - 1];
    const currentInitial = currentItem?.full_name?.[0]?.toUpperCase();
    const prevInitial = prevItem?.full_name?.[0]?.toUpperCase();
    return currentInitial !== prevInitial;
  };

  const getHeaderChar = (item: any) => {
    const initial = item?.full_name?.[0]?.toUpperCase();
    return initial && /[A-Z]/.test(initial) ? initial : "#";
  };

  return (
    <div className="directory">
      {initialLoading && <FullScreenLoader />}
      <div className="flex h-100">
        <Sidebar current={"Directory"} />
        <div className="main-area">
          <TopArea search={search} setSearch={setSearch} />
          {!initialLoading && (
            <div className="body-area">
              <div className="common-back">
                <div className="table-container directory">
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
                      {allContacts.length > 0
                        ? allContacts.map((itm: any, index: any) => (
                            <React.Fragment key={`${itm.id}-${index}`}>
                              {" "}
                              {showHeader(itm, index) && (
                                <tr className="table-header-row">
                                  <td colSpan={4}>
                                    {" "}
                                    <tr className="table-header">
                                      {getHeaderChar(itm)}
                                    </tr>
                                  </td>
                                </tr>
                              )}
                              <tr
                                ref={
                                  index === allContacts.length - 1
                                    ? lastContactElementRef
                                    : null
                                }
                                style={{ cursor: "pointer" }}
                                onClick={() => profileHandler(itm.id)}
                              >
                                <td>
                                  <div className="flex al-center">
                                    {itm?.photo ? (
                                      <img
                                        className="contact-photo"
                                        src={itm?.photo}
                                        alt=""
                                        onError={(e) =>
                                          (e.currentTarget.style.display =
                                            "none")
                                        }
                                      />
                                    ) : (
                                      <i className="fa-regular fa-circle-user default-user-icon"></i>
                                    )}
                                    <div
                                      className={
                                        itm.full_name?.length > 20
                                          ? "marquee"
                                          : ""
                                      }
                                    >
                                      <span>{itm.full_name || "-"}</span>
                                    </div>
                                    {/* <div>
                                      <span>
                                        {itm.full_name
                                          ? itm.full_name
                                              .match(/.{1,20}/g)
                                              .map((chunk: any, index: any) => (
                                                <React.Fragment key={index}>
                                                  {chunk}
                                                  <br />
                                                </React.Fragment>
                                              ))
                                          : "-"}
                                      </span>
                                    </div> */}
                                  </div>
                                </td>
                                <td>
                                  {itm.email ? (
                                    itm.email.length > 10 ? (
                                      <>
                                        {itm.email.slice(0, 14)}
                                        <br />
                                        {itm.email.slice(14)}
                                      </>
                                    ) : (
                                      itm.email
                                    )
                                  ) : (
                                    "-"
                                  )}
                                </td>
                                <td>{itm.phone || "-"}</td>
                                <td>
                                  {itm.birthday
                                    ? dayjs(itm.birthday).format("MM-DD-YYYY")
                                    : "-"}
                                </td>
                              </tr>
                            </React.Fragment>
                          ))
                        : !loading && (
                            <tr>
                              <td
                                colSpan={4}
                                style={{ textAlign: "center", padding: "20px" }}
                              >
                                No contacts found!
                              </td>
                            </tr>
                          )}
                      {loading && !initialLoading && (
                        <tr>
                          <td
                            colSpan={4}
                            style={{ textAlign: "center", padding: "10px" }}
                          >
                            <SmallLoader />
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                {/* Remove Antd Pagination */}
                {/* {totalPages > 1 && (
                    <Pagination
                      current={currentPage}
                      total={totalPages * 10} // Antd pagination expects total items, not pages
                      onChange={onPageChange}
                      showSizeChanger={false}
                      align="center"
                    />
                  )} */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Directory;
