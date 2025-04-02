import React from "react";
import Sidebar from "../reusable/Sidebar";
import TopArea from "../reusable/TopArea";
import { useLocation, useNavigate } from "react-router-dom";
import { profileContactApi } from "../store/Services/AllApi";
import user from "../images/user.png";

const SearchResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const fetchedresults = location?.state?.searchAnswer || {
    contacts: [],
    notes: [],
  };
  const fetchedword = location?.state?.word || "";

  const profileHandler = (contactId: string | number) => {
    if (!contactId) {
      console.error("Profile Handler called without a valid contact ID");
      return;
    }
    profileContactApi({
      query: {
        id: contactId,
      },
    })
      .then((res) => {
        if (res) {
          navigate("/profile", { state: { profileData: res } });
        } else {
          console.error("Failed to fetch profile data or data is empty:", res);
        }
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  };

  const sendParticularNote = (noteData: any) => {
    if (!noteData?.contact?.id) {
      console.error(
        "Cannot navigate to notes: Missing contact ID in note data"
      );
      return;
    }
    navigate("/notes", {
      state: { profileId: noteData.contact.id, currentNote: noteData },
    });
  };

  /**
   * Generates a snippet of text centered around the search word,
   * showing context before and after, and highlighting the word.
   * @param {string} text The full text of the note.
   * @param {string} word The word to highlight and center on.
   * @param {number} contextLength Number of characters before/after the word.
   * @returns {React.ReactNode} JSX with highlighted snippet or original text.
   */
  const highlightAndShowContext = (
    text: string | null | undefined,
    word: string | null | undefined,
    contextLength: number = 50
  ): React.ReactNode => {
    if (!text || !word) {
      return text || "";
    }

    const lowerText = text.toLowerCase();
    const lowerWord = word.toLowerCase();
    const index = lowerText.indexOf(lowerWord);

    if (index === -1) {
      return text.length > contextLength * 2 + 10
        ? `${text.substring(0, contextLength * 2 + 10)}...`
        : text;
    }

    const start = Math.max(0, index - contextLength);
    const end = Math.min(text.length, index + word.length + contextLength);

    const prefix = text.substring(start, index);
    const highlightedMatch = text.substring(index, index + word.length);
    const suffix = text.substring(index + word.length, end);

    return (
      <>
        {start > 0 && "..."} {prefix}
        <span className="highlight">{highlightedMatch}</span>
        {suffix}
        {end < text.length && "..."}{" "}
      </>
    );
  };

  return (
    <div className="searchResult">
      <div className="flex h-100">
        {" "}
        <Sidebar />
        <div className="main-area">
          <TopArea />
          <div className="body-area">
            <h3 className="result-heading">
              Search result for "{fetchedword || "..."}"
            </h3>
            <div className="common-back mb-15">
              <div className="contact">
                <h4>Contacts</h4>
                {fetchedresults?.contacts?.length > 0 ? (
                  <ul
                    style={{
                      maxHeight:
                        fetchedresults.contacts.length > 16 ? "400px" : "auto",
                      overflowY:
                        fetchedresults.contacts.length > 16
                          ? "scroll"
                          : "visible",
                    }}
                  >
                    {fetchedresults.contacts.map((itm: any) => (
                      <li
                        key={itm.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => profileHandler(itm.id)}
                        className="search-result-item"
                      >
                        <div className="flex al-center space-bw">
                          <img
                            alt={`${itm.full_name} profile`}
                            src={itm.photo || user}
                            onError={(e) => (e.currentTarget.src = user)}
                            className="search-result-avatar"
                          />
                          <p className="search-result-name">{itm.full_name}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-results-message">
                    No contacts found matching "{fetchedword}".
                  </p>
                )}
              </div>
            </div>
            <div className="common-back">
              <div className="notes-search">
                <h4>Notes</h4>
                {fetchedresults?.notes?.length > 0 ? (
                  <ul
                    style={{
                      maxHeight:
                        fetchedresults.notes.length > 16 ? "400px" : "auto",
                      overflowY:
                        fetchedresults.notes.length > 16 ? "scroll" : "visible",
                    }}
                  >
                    {fetchedresults.notes.map((itm: any) => (
                      <li
                        key={itm.id}
                        style={{ cursor: "pointer" }}
                        onClick={() => sendParticularNote(itm)}
                        className="search-result-item"
                      >
                        <div className="flex space-bw note-result-layout">
                          <div className="flex note-contact-info">
                            <img
                              alt={`${
                                itm.contact?.full_name || "Contact"
                              } profile`}
                              src={itm.contact?.photo || user}
                              onError={(e) => (e.currentTarget.src = user)}
                              className="search-result-avatar"
                            />
                            <p className="search-result-name">
                              {itm.contact?.full_name || "Unknown Contact"}
                            </p>
                          </div>
                          <p className="searchnote search-result-snippet">
                            {highlightAndShowContext(itm.note, fetchedword, 50)}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-results-message">
                    No notes found matching "{fetchedword}".
                  </p>
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
