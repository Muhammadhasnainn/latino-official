import axios from "axios";
import React, { useEffect, useState } from "react";
import PageBanner from "../Components/PageBanner";
import { useAuthContext } from "../Contexts/AuthContext";

const ResetPassword = () => {
  const { userdata } = useAuthContext();
  const [data, setData] = useState({});

  const onSubmit = async () => {
    if (data.newpassword === data.confirmpassword) {
      try {
        await axios.put("http://localhost:8800/api/auth/changepassword", {
          email: userdata.email,
          oldpassword: data.oldpassword,
          newpassword: data.newpassword,
        });

        alert("Successfully Changed!");

        // form.resetFields()
      } catch (err) {
        alert(err?.response?.data.msg);
      }
    } else {
      alert("Password does't matches");
    }
  };

  useEffect(() => {
    const ScrollToTop = () => {
      window.scrollTo(0, 0);
    };
    ScrollToTop();
  }, []);

  return (
    <div>
      <PageBanner title={"Reset Password"} />
      <div className="mt-10 w-50 forgot_form py-3 mx-auto bg-white px-5 rounded shadow">
        <div>
          <label className="fw-bold">Old Password:</label>
          <input
            type={"password"}
            placeholder="Enter old password!"
            className="form-control mt-1 rounded-0"
            onChange={(e) => setData({ ...data, oldpassword: e.target.value })}
          />
        </div>
        <div className="mt-2">
          <label className="fw-bold">New password:</label>
          <input
            type={"password"}
            placeholder="Enter new password!"
            className="form-control mt-1 rounded-0"
            onChange={(e) => setData({ ...data, newpassword: e.target.value })}
          />
          <div className="mt-2">
            <label className="fw-bold">Confirm password:</label>
            <input
              type={"password"}
              placeholder="Confirm password!"
              className="form-control mt-1 rounded-0"
              onChange={(e) =>
                setData({ ...data, confirmpassword: e.target.value })
              }
            />
          </div>
          <button className="continue w-auto px-3 mx-auto" onClick={onSubmit}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
