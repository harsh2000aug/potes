import React from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import { useLocation, useNavigate } from "react-router-dom";
import { profileContactApi } from "../store/Services/AllApi";
import user from "../images/user.png";

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fetchedresults = location?.state?.searchAnswer;
  const fetchedword = location?.state?.word;

  const profileHandler = (pussy: any) => {
    profileContactApi({
      query: {
        id: pussy,
      },
    }).then((res) => {
      navigate("/profile", { state: { profileData: res } });
    });
  };
  const sendParticularNote = (noteData: any) => {
    navigate("/notes", {
      state: { profileId: noteData?.contact?.id, currentNote: noteData },
    });
  };

  const highlightWord = (text: any) => {
    if (!fetchedword) return text;
    const regex = new RegExp(fetchedword, "gi");
    return text
      .split(regex)
      .reduce((acc: any, part: any, index: any, array: any) => {
        acc.push(part);
        if (index < array.length - 1) {
          acc.push(<span className="highlight">{fetchedword}</span>);
        }
        return acc;
      }, []);
  };

  const truncateAndHighlight = (text: any) => {
    if (!fetchedword) return text;

    const regex = new RegExp(fetchedword, "gi");
    const startIndex = text.toLowerCase().indexOf(fetchedword.toLowerCase());

    // ✅ Case 1: If the text is a single word, return the full text
    if (!text.includes(" ")) {
      return <>{startIndex !== -1 ? highlightWord(text) : text}</>;
    }
    if (text.length < 10) {
      const startText = text.slice(0, 2);
      const highlightedWord =
        startIndex !== -1
          ? highlightWord(
              text.slice(startIndex, startIndex + fetchedword.length)
            )
          : "";
      const endText = text.slice(-2);

      return (
        <>
          {startText}...
          {highlightedWord}...
          {endText}
        </>
      );
    }
    if (text.length < 30) {
      const startText = text.slice(0, 5);
      const highlightedWord =
        startIndex !== -1
          ? highlightWord(
              text.slice(startIndex, startIndex + fetchedword.length)
            )
          : "";
      const endText = text.slice(-5);

      return (
        <>
          {startText}...
          {highlightedWord}...
          {endText}
        </>
      );
    }

    // ✅ Case 2: For text <= 20 characters
    if (text.length >= 30) {
      const startText = text.slice(0, 10);
      const highlightedWord =
        startIndex !== -1
          ? highlightWord(
              text.slice(startIndex, startIndex + fetchedword.length)
            )
          : "";
      const endText = text.slice(-10);

      return (
        <>
          {startText}...
          {highlightedWord}...
          {endText}
        </>
      );
    }

    // ✅ Case 3: When the word is not found
    if (startIndex === -1) {
      return (
        text.slice(0, 20) + (text.length > 40 ? "..." : "") + text.slice(-20)
      );
    }

    // ✅ Case 4: Normal truncation and highlighting
    const initialText = text.slice(0, 20);
    const highlightedWord = highlightWord(
      text.slice(startIndex, startIndex + fetchedword.length)
    );
    const endingText = text.slice(
      Math.max(startIndex + fetchedword.length, text.length - 20)
    );

    return (
      <>
        {initialText}...
        {highlightedWord}
        {endingText.length < text.length && <span>...</span>}
        {endingText}
      </>
    );
  };

  return (
    <div className="searchResult">
      <div className="flex h-100">
        <Sidebar />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <div className="common-back">
              <h3>Search result for "{fetchedword}"</h3>
              <div className="contact">
                <h4>Contacts</h4>
                {fetchedresults.contacts.length > 0 ? (
                  fetchedresults.contacts.map((itm: any) => (
                    <ul key={itm.id}>
                      <li
                        style={{ cursor: "pointer" }}
                        onClick={() => profileHandler(itm.id)}
                      >
                        <div className="flex al-center space-bw">
                          <img alt="" src={itm.photo ? itm.photo : user} />
                          <p>{itm.full_name}</p>
                        </div>
                      </li>
                    </ul>
                  ))
                ) : (
                  <p>No contact found</p>
                )}
              </div>
              <div className="notes-search">
                <h4>Notes</h4>
                {fetchedresults.notes.length > 0 ? (
                  fetchedresults.notes.map((itm: any) => (
                    <ul key={itm.id}>
                      <li
                        style={{ cursor: "pointer" }}
                        onClick={() => sendParticularNote(itm)}
                      >
                        <div className="flex space-bw">
                          <div className="flex">
                            <img
                              alt="userimage"
                              src={itm.contact.photo ? itm.contact.photo : user}
                            />
                            <p>{itm.contact.full_name}</p>
                          </div>
                          <p className="searchnote">
                            {truncateAndHighlight(itm.note)}
                          </p>
                        </div>
                      </li>
                    </ul>
                  ))
                ) : (
                  <p>No note found</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
