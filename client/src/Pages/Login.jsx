import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import PageBanner from "../Components/PageBanner";
import { useAuthContext } from "../Contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

const Login = () => {
  const { setUser, user } = useAuthContext();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({});

  const HandleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8800/api/auth/login",
        {
          ...credentials,
        }
      );
      if (data.success) {
        setUser(jwt_decode(data.authToken));
        Cookies.set("token", data.authToken, {expires: 3, secure: true});
        navigate("/");
      } else {
        alert("Invalid Credentials!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const HandleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    const ScrollToTop = () => {
      window.scrollTo(0, 0);
    };
    ScrollToTop();
  }, []);

  if (user) return <Navigate to={"/"} />;

  return (
    <div className="Login">
      <PageBanner title={"Login"} />
      <div
        className="d-flex align-items-center
        mt-10 w-50 login_form mx-auto bg-white px-3 py-5 rounded shadow"
      >
        <form className="w-100" onSubmit={HandleLogin}>
          <div className="mb-3">
            <label for="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control w-100"
              id="email"
              aria-describedby="emailHelp"
              placeholder="test@gmail.com"
              onChange={(e) => HandleChange(e)}
            />
          </div>
          <div className="mb-3">
            <label for="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control w-100"
              id="password"
              placeholder="Enter your password!"
              onChange={(e) => HandleChange(e)}
            />
            <Link
              to={"/forgotpassword"}
              className="highlight nav-link mt-1 text-end w-100 d-block"
            >
              Forgot Password!
            </Link>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <p className="text-center mt-2">
            Already have a account? <Link to="/registro">Register now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
