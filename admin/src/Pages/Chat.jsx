import React, { useEffect, useRef, useState } from "react";
import { SendOutlined } from "@ant-design/icons";
import axios from "axios";
import Conversation from "../Components/Conversation";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { useAuthContext } from "../Contexts/AuthContext";

const Chat = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [current, setCurrent] = useState([]);
  const [msg, setMsg] = useState("");
  const socket = useRef("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [convo, setConvo] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:5000");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?.id);
    socket.current.emit("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    arrivalMessage &&
      current?.members.includes("640082f10587418948825a21") &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, current]);

  const getMessages = async () => {
    try {
      setLoading(false);

      const { data } = await axios.get(
        "http://localhost:8800/api/message/" + current._id,
        // {},
        {
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
          },
        }
      );
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8800/api/conversation/" +
            "640082f10587418948825a21",
            // user?.id,
          // {},
          {
            headers: {
              "Content-Type": "application/json",
              token: Cookies.get("token"),
            },
          }
        );
        setConversations(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getConversations();

  }, [user?.id]);

  useEffect(() => {
    getMessages();
  }, [current])

  const SendMessage = async () => {
    try {
      const receiverId = current.members.find((member) => member !== user?.id);

      setLoading(false);
      await axios.post(
        "http://localhost:8800/api/message",
        {
          conversationId: current._id,
          sender: "640082f10587418948825a21",
          text: msg,
        },
        {
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
          },
        }
      );

      socket.current.emit("sendMessage", {
        senderId: "640082f10587418948825a21",
        receiverId: receiverId,
        text: msg,
      });

      getMessages();
      setMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="d-flex justify-content-between Chat-section">
     {((!convo && window.matchMedia("(max-width: 700px)").matches) ||
     (window.matchMedia("(min-width: 700px)").matches)) && 
     <div className="chats_list w-25 border py-2">
        <p className="fs-5 fw-bold px-2 py-2 border-bottom mb-3">Chats</p>

        {!loading
          ? conversations.map((elem) => {
              return (
                <div key={elem._id} onClick={() =>{
                   setCurrent(elem)
                   setConvo(true)
                   }}>
                  <Conversation elem={elem} />
                </div>
              );
            })
          : "Loading!"}
      </div>}
      {((convo && window.matchMedia("(max-width: 700px)").matches) ||
     (convo && window.matchMedia("(min-width: 700px)").matches))  &&
       <div className="chat-convo w-75 ms-3 border border-l-0 py-2">
        <div className="header border-bottom pb-2 px-2">
          <div className="d-flex align-items-center">
            <div
              className="avatar sm-avatar"
              style={{
                background: `url("https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/1f8a697e4cd3938fb1129bacdf8e4601-1664508849655/c1365d67-74fe-48b6-9ba5-daadc96a3470.jpg")
                `,
              }}
            ></div>
            <p className="ms-2">Muhammad</p>
          </div>

          <div className="send d-flex">
            <input
              type={"text"}
              className="form-control rounded-0"
              placeholder="Enter message here!"
              onChange={(e) => setMsg(e.target.value)}
              value={msg}
            />
            <button
              className="btn_primary px-3 h-100 w-auto"
              onClick={SendMessage}
            >
              <SendOutlined style={{ color: "white", fontSize: "1.3rem" }} />
            </button>
          </div>
        </div>
        <div className="mt-3 px-2 msg_scrollable" ref={scrollRef}>
          {messages?.map((elem) => {
            console.log(elem)
            return (
              <div
                className={`d-block rounded-pill py-1 fs-6 px-3 msg mt-2 ${
                  elem.sender === "640082f10587418948825a21"
                    ? "bg-blue ms-auto"
                    : "bg-gray me-auto"
                } `}
              >
                <p>{elem.text}</p>
              </div>
            );
          })}
        </div>
      </div>}
    </section>
  );
};

export default Chat;
