import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageBanner from "../Components/PageBanner";
import axios from "axios";

const Forget = () => {
  const [otpBox, setOTPBox] = useState(false);
  const [credentials, setCredentials] = useState({});
  const [change, setChange] = useState(false);
  const navigate = useNavigate();

  const onEmailSubmit = async () => {
    try {
      await axios.get(
        `http://localhost:8800/api/auth/generateotp?email=${credentials.email}`
      );
      // setData({ email: credentials.email });
      setOTPBox(true);
    } catch (err) {
      console.log(err?.response?.data);
      alert(err?.response?.data);
    }
  };

  const Verification = async () => {
    try {
      await axios.post(
        `http://localhost:8800/api/auth/verifyotp?code=${credentials.otp}`
      );
      setChange(true);
    } catch (err) {
      console.log(err);
      alert("wrong code!");
    }
  };

  const ChangePassword = async () => {
    try {
      await axios.put("http://localhost:8800/api/auth/resetPassword", {
        email: credentials.email,
        password: credentials.password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return (
    <div>
      <PageBanner title={"Forgot Password ?"} />
      <div className="mt-10 w-50 forgot_form py-3 mx-auto bg-white px-5 rounded shadow">
        {!change &&
          (!otpBox ? (
            <div>
              <label className="fw-bold">Email:</label>
              <input
                type={"email"}
                placeholder="Enviaremos un correo electrónico de reinicio!"
                className="form-control mt-1 rounded-0"
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              <button
                className="continue w-auto px-3 mx-auto"
                onClick={onEmailSubmit}
              >
                Continuar
              </button>
            </div>
          ) : (
            <div>
              <label className="fw-bold">Enter OTP:</label>
              <input
                type={"number"}
                placeholder="Introduzca el código"
                className="form-control mt-1 rounded-0"
                onChange={(e) =>
                  setCredentials({ ...credentials, otp: e.target.value })
                }
              />
              <button
                className="continue w-auto px-3 mx-auto"
                onClick={Verification}
              >
                Verify
              </button>
            </div>
          ))}

        {change && (
          <div>
            <label className="fw-bold">New Password:</label>
            <input
              type={"password"}
              placeholder="Introduzca el código"
              className="form-control mt-1 rounded-0"
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <label className="fw-bold mt-2">Confirm Password:</label>
            <input
              type={"password"}
              placeholder="Confirm password"
              className="form-control mt-1 rounded-0"
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  confirmpassword: e.target.value,
                })
              }
            />
            <button
              className="continue w-auto px-3 mx-auto"
              onClick={ChangePassword}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forget;
