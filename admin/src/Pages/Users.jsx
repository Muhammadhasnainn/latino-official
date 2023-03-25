import { Typography, Table } from "antd";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

const Users = () => {
  const { Title } = Typography;
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");

  const columns = [
    {
      title: "SNO.#",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
    },
    {
      title: "Report",
      dataIndex: "report",
      key: "report",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const DownloadReport = async (elem) => {
    const token = await axios.post(
      "https://neocheck.net/api/authorization/token",
      {
        username: "latinotransferPRE",
        password: "ht59TTp1",
      }
    );

    const videoID = await axios.get(
      `https://neocheck.net/api/v1/VideoIdentifications/${elem.neocheckId}`,
      { headers: { Authorization: `Bearer ${token.data.access_token}` } }
    );

    const { data } = await axios.get(
      `https://neocheck.net/api/v1/Verifications/${videoID.data.documentVerificationId}/report`,
      {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token.data.access_token}`,
          Accept: "application/pdf",
        },
      }
    );

    var blob = new Blob([data], { type: "application/pdf" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "report.pdf";
    link.click();
  };

  const DisabledAcc = async (elem) => {
    const reason = prompt("Whats the reason for blocking?");
    if (reason) {
      await axios.put(
        `http://localhost:8800/api/auth/update/${elem._id}`,
        {
          newUser: {
            ...elem,
            verified: false,
          },
        },
        { headers: { token: Cookies.get("token") } }
      );

      await axios.post(
        `http://localhost:8800/api/auth/mailstatus/${elem.email}`,
        {
          msg: `Hola!
      
      ${reason}
      `,
        },
        { headers: { token: Cookies.get("token") } }
      );
    }
  };

  const MarkVerified = async (elem) => {
    await axios.put(
      `http://localhost:8800/api/auth/update/${elem._id}`,
      {
        newUser: {
          ...elem,
          verified: true,
        },
      },
      { headers: { token: Cookies.get("token") } }
    );
  };

  const dataSource = [
    ...data.map((elem, i) => {
      return {
        key: i + 1,
        sno: i + 1,
        email: elem.email,
        name: elem.name,
        dob: elem.dob,
        verified: elem.verified ? "Verified" : "Not Verified",
        report: (
          <button
            className="btn btn-primary px-2 py-1"
            onClick={() => DownloadReport(elem)}
          >
            Download
          </button>
        ),
        actions: (
          <>
            <button
              className="btn btn-danger px-2 py-1"
              onClick={() => DisabledAcc(elem)}
            >
              Disabled
            </button>
            <button
              className="btn btn-success px-2 py-1 ms-3"
              onClick={() => MarkVerified(elem)}
            >
              Mark Verified
            </button>
          </>
        ),
      };
    }),
  ];

  useEffect(() => {
    const Fetch = async () => {
      const { data } = await axios.get(
        "http://localhost:8800/api/admin/users",
        {
          headers: {
            "Content-Type": "application/json",
            token: Cookies.get("token"),
          },
        }
      );

      const token = await axios.post(
        "https://neocheck.net/api/authorization/token",
        {
          username: "latinotransferPRE",
          password: "ht59TTp1",
        }
      );
      setToken(token.data.access_token);

      setData(data.users);
    };
    Fetch();
  });

  return (
    <div>
      <Title level={window.matchMedia("(max-width: 600px)").matches ? 4 : 3}>
        All Registered Users
      </Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="responsiveTable"
      />
      ;
    </div>
  );
};

export default Users;
