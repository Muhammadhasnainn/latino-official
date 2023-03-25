import { Typography, Table, Tag } from "antd";
import React from "react";

const Transactions = () => {
  const { Title } = Typography;

  const data = [
    {
      sno: "1",
      name: "Muhammad hasnain",
      status: ["Pending"],
      amount: "$ 15,000",
    },
    {
      sno: "2",
      name: "ALi hasnain",
      amount: "$ 10,000",
      status: ["Transferred"],
    },
  ];

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
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, { status }) => (
        <>
          {status.map((stats) => {
            let color = stats === "Pending" ? "volcano" : "green";
            return (
              <Tag color={color} key={stats}>
                {stats.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
  ];

  const dataSource = [
    ...data.map((elem, i) => {
      return {
        key: i + 1,
        sno: i + 1,
        name: elem.name,
        amount: elem.amount,
        status: elem.status,
      };
    }),
  ];

  return (
    <div>
      <Title level={window.matchMedia("(max-width: 600px)").matches ? 4 : 3}>
        All Recent Transactions
      </Title>
      <Table
        dataSource={dataSource}
        columns={columns}
        className="responsiveTable transactions"
      />
      ;
    </div>
  );
};

export default Transactions;
