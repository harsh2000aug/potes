import React, { useEffect, useRef, useState } from "react";
import logo from "../images/logo.png";
import { useNavigate } from "react-router-dom";
import { RiGeminiFill } from "react-icons/ri";
import { deleteAiChat, getAiChat, postAiChat } from "../store/Services/AllApi";
import avatar from "../images/avatar.png";
import chitti from "../images/robotji.jpg";
import { FaRobot } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import toast from "react-hot-toast";
const GeminiFill: any = RiGeminiFill;
const menuTab: any = [
  {
    name: "Create Contact",
    icon: "fa-solid fa-plus",
    isButton: true,
  },
  {
    name: "Create Note",
    icon: "fa-solid fa-plus",
    isButton: true,
  },
  {
    name: "Chat with AI",
    isButton: true,
  },
  {
    name: "Home",
    icon: "fa-solid fa-house",
  },
  {
    name: "Directory",
    icon: "fa-solid fa-user",
  },
  {
    name: "About Us",
    icon: "fa-solid fa-circle-exclamation",
  },
  {
    name: "Contact Us",
    icon: "fa-solid fa-phone",
  },
  {
    name: "Privacy Policy",
    icon: "fa-solid fa-shield-halved",
  },
  {
    name: "Logout",
    icon: "fa-solid fa-right-from-bracket",
  },
];
const Sidebar = ({ current }: any) => {
  const [logoutPopup, setLogoutPopup]: any = useState(false);

  const PopupHandler = () => {
    setLogoutPopup(!logoutPopup);
  };
  const logoutBtnHandler = () => {
    localStorage.clear();
    window.location.reload();
  };
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const tabChangeHandler = (val: any) => {
    if (val === "Home") {
      navigate("/");
    } else if (val === "Directory") {
      navigate("/directory");
    } else if (val === "About Us") {
      navigate("/about-us");
    } else if (val === "Contact Us") {
      navigate("/contact-us");
    } else if (val === "Create Contact") {
      navigate("/create-contact");
    } else if (val === "Create Note") {
      navigate("/create-a-note");
    } else if (val === "Privacy Policy") {
      navigate("/privacy");
    } else if (val === "Logout") {
      // logoutBtnHandler();
      setLogoutPopup(true);
    } else if (val === "Chat with AI") {
      setShowChat(true);
    }
  };

  const [chatSave, setChatSave]: any = useState([]);
  const [msgText, setMsgText] = useState("");
  const [loading, setLoading]: any = useState(false);
  const [conversationId, setConversationId]: any = useState("");

  const Robot: any = FaRobot;
  const Send: any = FaPaperPlane;
  const toggleChat = () => {
    setShowChat(true);
  };

  const formatResponse = (text: string) => {
    // Extract heading (first paragraph)
    const headingMatch = text.match(/^(.*?)\n\s*\n/);
    const heading = headingMatch ? headingMatch[1] : "";

    const lines: string[] = [];

    const keyValueRegex = /\*\*(.+?):\*\*\s*(.+)/g;
    let match;

    while ((match = keyValueRegex.exec(text)) !== null) {
      lines.push(`${match[1]}: ${match[2]}`);
    }

    if (lines.length === 0) {
      const bulletRegex = /^\*\s+(.*)$/gm;
      while ((match = bulletRegex.exec(text)) !== null) {
        if (match[1].trim()) {
          lines.push(match[1].trim());
        }
      }
    }

    return heading ? `${heading}\n\n${lines.join("\n")}` : lines.join("\n");
  };

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const chatWithMe = () => {
    setLoading(true);
    getAiChat()
      .then((res: any) => {
        setChatSave(res);
      })
      .catch((err: any) => {
        toast.error(err?.data?.error);
        console.log("err", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    chatWithMe();
  }, []);

  const handleSendSms = () => {
    if (!msgText.trim()) return toast.error("Message can't be empty");
    setLoading(true);
    postAiChat({
      body: {
        message: msgText,
        query: msgText,
        conversation_id: conversationId ? conversationId : null,
      },
    })
      .then((res: any) => {
        setChatSave((prev: any) => [
          ...prev,
          {
            message: msgText,
            reply: formatResponse(res?.response),
            msgfinal: res?.crud_result?.notes || [],
          },
        ]);
        setConversationId(res?.conversation_id);
        setMsgText("");
      })
      .catch((err: any) => {
        console.log("err", err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (showChat) {
      scrollToBottom();
    }
  }, [chatSave, loading, showChat]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const deleteChatBot = () => {
    deleteAiChat().then((res: any) => {
      setChatSave([]);
    });
  };

  return (
    <>
      <div className="sidebar">
        <div className="logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Logo" />
        </div>
        <div className="menu">
          <ul>
            {menuTab.slice(0, 4).map((item: any) => (
              <li
                key={item.name}
                className={`${item.isButton ? "btns" : ""} ${
                  current === item.name ? "active" : ""
                }`.trim()}
              >
                {item.isButton ? (
                  <button
                    onClick={() => tabChangeHandler(item.name)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {item.icon ? (
                      <i className={item.icon}></i>
                    ) : (
                      <span
                        style={{
                          marginRight: "10px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <GeminiFill />
                      </span>
                    )}
                    {item.name}
                  </button>
                ) : (
                  <span onClick={() => tabChangeHandler(item.name)}>
                    <i className={item.icon}></i> {item.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <ul className="p-absolute">
            {menuTab.slice(4).map((item: any) => (
              <li
                key={item.name}
                className={`${item.isButton ? "btns" : ""} ${
                  current === item.name ? "active" : ""
                }`.trim()}
              >
                {item.isButton ? (
                  <button onClick={() => tabChangeHandler(item.name)}>
                    <i className={item.icon}></i> {item.name}
                  </button>
                ) : (
                  <span onClick={() => tabChangeHandler(item.name)}>
                    <i className={item.icon}></i> {item.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {logoutPopup && (
        <div id="logoutPopup" className="overlay">
          <div className="popup">
            <h2>Are you sure you want to logout?</h2>
            <div className="btn-group">
              <button className="cancel-btn" onClick={PopupHandler}>
                Cancel
              </button>
              <button className="logout-btn" onClick={logoutBtnHandler}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {showChat && (
        <div className="chat-wa-wid">
          <div className="chat-widget">
            <div className="chat-header">
              <span
                className="close-bttn"
                onClick={() => {
                  setShowChat(false);
                  deleteChatBot();
                }}
              >
                &times;
              </span>
            </div>

            <div className="chat-body">
              <div className="chat-message left">
                <div className="avatar robot">
                  <img src={chitti} alt="Avatar" />
                </div>
                <div className="message-bubble">Welcome to Potes!</div>
              </div>
              {chatSave?.map((msg: any, i: number) => (
                <React.Fragment key={i}>
                  <div className="chat-message right">
                    <div className="message-bubble">{msg.message}</div>
                    <div className="avatar">
                      <img src={avatar} alt="Avatar" />
                    </div>
                  </div>

                  <div className="chat-message left">
                    <div className="avatar robot">
                      <img src={chitti} alt="Avatar" />
                    </div>
                    <div className="message-bubble">
                      <div
                        // className="message-bubble"
                        style={{ whiteSpace: "pre-line" }}
                      >
                        {msg.reply}
                      </div>

                      {msg?.msgfinal?.map((itm: any, index: any) => (
                        <div key={itm?.id}>
                          <p>
                            {index + 1}. {itm?.note}
                          </p>
                          <br />
                        </div>
                      ))}
                    </div>
                  </div>
                </React.Fragment>
              ))}
              {loading && (
                <div className="chat-message left">
                  <div className="avatar robot">
                    <img src={chitti} alt="Avatar" />
                  </div>
                  <div className="message-bubble loadeing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef}></div>
            </div>

            <div className="chat-footer">
              <input
                type="text"
                placeholder="Ask Something..."
                className="chat-input"
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendSms();
                }}
              />
              <div className="chat-actions" onClick={handleSendSms}>
                <Send className="icon send-icon" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
