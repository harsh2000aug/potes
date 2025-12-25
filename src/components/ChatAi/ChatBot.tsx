import React, { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

import avatar from "../../images/avatar.png";
import chitti from "../../images/robotji.jpg";
import {
  deleteAiChat,
  getAiChat,
  postAiChat,
} from "../../store/Services/AllApi";
import toast from "react-hot-toast";

const ChatBot = () => {
  const Robot: any = FaRobot;
  const Send: any = FaPaperPlane;

  const [showChat, setShowChat] = useState(false);
  const [chatSave, setChatSave]: any = useState([]);
  const [msgText, setMsgText] = useState("");
  const [loading, setLoading]: any = useState(false);
  const [conversationId, setConversationId]: any = useState("");
  const toggleChat = () => {
    setShowChat(true);
  };

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    <div className="chat-app">
      {/* <div className="cm-fixed-btn" onClick={toggleChat}>
        <div className="cm-wa-btn">
          <Robot />
        </div>
      </div> */}

      {showChat && (
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
                    <div style={{ whiteSpace: "pre-line" }}>{msg.reply}</div>

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
      )}
    </div>
  );
};

export default ChatBot;
