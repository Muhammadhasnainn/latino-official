import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({});

  const onSubmit = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8800/api/auth/login",
        {
          email: credential.email,
          password: credential.password,
        }
      );
      const token = jwt_decode(data.authToken);

      // if(token.user.isAdmin){
        Cookies.set("token", data.authToken, {expires: 3, secure: true})
        navigate("/")
      // }
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray d-flex justify-content-center align-items-center h-100vh w-100">
      <Form
        name="normal_login"
        className="login-form w-50 mx-auto bg-white px-3 py-3 rounded-2 shadow"
        onFinish={onSubmit}
      >
        <h1 className="mb-3 text-center">Login</h1>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            prefix={
              <UserOutlined
                className="site-form-item-icon"
                style={{ fontSize: "18px" }}
              />
            }
            placeholder="Email"
            type="email"
            className="py-2 px-3"
            onChange={(e) =>
              setCredential({ ...credential, email: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={
              <LockOutlined
                className="site-form-item-icon"
                style={{ fontSize: "18px" }}
              />
            }
            type="password"
            placeholder="Password"
            className="py-2 px-3"
            onChange={(e) =>
              setCredential({ ...credential, password: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item className="w-100 center">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button w-100 rounded"
            size="large"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
