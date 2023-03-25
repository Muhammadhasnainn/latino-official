import React from "react";
import { BsFillChatFill } from "react-icons/bs";
import { MdSend } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { io } from "socket.io-client";
import { useAuthContext } from "../Contexts/AuthContext";

const Chat = () => {
  const { user } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState([]);
  const [current, setCurrent] = useState({});
  const [msg, setMsg] = useState("");
  const socket = useRef();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

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
    socket.current.emit("addUser", user?.user?.id);
    socket.current.emit("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    arrivalMessage &&
      current?.members?.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  
  const getMessages = async (id) => {
    try {
      setLoading(true);
      
      const { data } = await axios.get(
        "http://localhost:8800/api/message/" + (id ? id : current?._id),
        {
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
          },
        }
      );
      
      console.log(arrivalMessage);
      setMessages(data);
      setMsg("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages();
  }, [current]);

  const SendMessage = async () => {
    try {
      setLoading(false);

      const res = await axios.get(
        "http://localhost:8800/api/conversation/" + user?.user?.id,
        {
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
          },
        }
      );

      let data;
      if (res.data[0] === undefined) {
        data = await axios.post(
          "http://localhost:8800/api/conversation/",
          { senderId: user?.user?.id, receiverId: "640082f10587418948825a21" },
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        setCurrent(data.data);

        await axios.post(
          "http://localhost:8800/api/message",
          {
            conversationId: data?.data._id,
            sender: user?.user?.id,
            text: msg,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: Cookies.get("token"),
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:8800/api/message",
          {
            conversationId: current?._id,
            sender: user?.user?.id,
            text: msg,
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: Cookies.get("token"),
            },
          }
        );
      }

      const receiverId = current?.members.find(
        (member) => member !== user?.user?.id
      );

      socket.current.emit("sendMessage", {
        senderId: user?.user?.id,
        receiverId,
        text: msg,
      });

      data?.data?._id ? getMessages(data?.data?._id) : getMessages();

      setMsg("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          "http://localhost:8800/api/conversation/" + user?.user?.id,
          {
            headers: {
              "Content-Type": "application/json",
              token: Cookies.get("token"),
            },
          }
        );
        setCurrent(res.data[0]);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getConversations();
  }, [user?.user?.id]);
  

  document.addEventListener("click", (evt) => {
    const chatElement = document.getElementById("chat");
    let targetElement = evt.target;

    do {
      if (targetElement == chatElement) {
        setShow(true);
        return;
      } else {
        setShow(false);
        // return;
      }
      targetElement = targetElement.parentNode;
    } while (targetElement);
    
  });

  return (
    <>
      <div class="dropdown dropup chat_drop w-100" id="chat">
        <div
          className="d-flex align-items-center justify-content-center
           chat_icon shadow"
          role="button"
          onClick={() => setShow(true)}
        >
          <BsFillChatFill size={30} />
        </div>

        {show && (
          <ul class="dropdown_menu shadow border-0 rounded">
            <div
              className="text-center bg-primary text-white
               py-2 mb-2 w-100"
              style={{
                position: "absolute",
                left: 0,
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
              }}
            >
              Live Chat
            </div>
            <div className="msgs">
              {messages.map((elem) => {
                return (
                  <p
                    className={`msg mt-2 ${
                      elem.sender !== user?.user?.id
                        ? "bg-gray"
                        : "d-block ms-auto bg-blue"
                    } py-1 px-3 rounded-pill p-3`}
                  >
                    {elem.text}
                  </p>
                );
              })}
            </div>
            <div className="d-flex align-items-center mt-5 send_box">
              <input
                type={"text"}
                className="form-control rounded-0 h-100"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
              />
              <button
                className="continue h-100 mt-0 rounded-0"
                style={{ width: "fit-content" }}
                onClick={SendMessage}
              >
                <MdSend color="white" size={20} />
              </button>
            </div>
          </ul>
        )}
      </div>
    </>
  );
};

export default Chat;
