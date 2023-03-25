import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  UserOutlined,
  DollarCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Routes from "../Routes";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const { Header, Sider } = Layout;

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    window.matchMedia("(max-width: 800px)").matches && setCollapsed(true);
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{ height: 24, margin: 16 }}>
          {!collapsed && (
            <img
              src="data:image/png;base64,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"
              alt="latinotransfer-logo"
              className="w-100"
            />
          )}{" "}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          onClick={(item) => {
            navigate(item.key);
          }}
          items={[
            {
              key: "/",
              icon: <UserOutlined style={{ fontSize: "1.3rem" }} />,
              label: "Users",
            },
            {
              key: "/transactions",
              icon: <DollarCircleOutlined style={{ fontSize: "1.3rem" }} />,
              label: "Transactions",
            },
            {
              key: "/chats",
              icon: <MessageOutlined style={{ fontSize: "1.3rem" }} />,
              label: "Chat",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex align-items-center justify-content-between"
          style={{
            padding: "0px 20px",
            fontSize: "1.4rem",
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <button
            className="btn btn-danger"
            onClick={() => {
             Cookies.remove("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Routes />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
