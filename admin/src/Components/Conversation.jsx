import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {UserOutlined} from "@ant-design/icons";

const Conversation = ({ elem }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const client = elem.members.find((id) => id !== "640082f10587418948825a21");

    const FetchUser = async () => {
      const { data } = await axios.get(
        "http://localhost:8800/api/admin/anyuser?user=" + client,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );
      setUser(data);
    };
    FetchUser();
  }, []);

  return (
    <div className="user-chat d-flex align-items-center justify-content-between mt-3 px-3">
      <div className="avatar d-flex justify-content-center align-items-center">
        <UserOutlined style={{fontSize: "30px"}} />
      </div>
      <div className="chat-info">
        <p className="fs-6 truncate">{user.name + " " + user.surname}</p>
        <p className="text-muted truncate">Me: Follow the guidelines above </p>
      </div>
    </div>
  );
};

export default Conversation;
