import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { GoUnverified, GoVerified } from "react-icons/go";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import PageBanner from "../Components/PageBanner";
import { useAuthContext } from "../Contexts/AuthContext";

const Profile = () => {
  const { userdata, setuserData } = useAuthContext();
  const [data, setData] = useState({});

  const HandleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    const ScrollToTop = () => {
      window.scrollTo(0, 0);
    };
    ScrollToTop();
  }, []);

  const HandleEdit = async () => {
    await axios.put(
      `http://localhost:8800/api/auth/update/${userdata._id}`,
      {
        newUser: {
          ...userdata,
          ...data,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      }
    );

    document.getElementById("exampleModal").classList.remove("show");
    document.querySelector(".modal-backdrop").classList.remove("show");

    getUser();
  };

  const getUser = async () => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/user",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          token: Cookies.get("token"),
        },
      }
    );
    setuserData(res.data);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = async () => {
        console.log(fileReader.result);
        await axios.put(
          `http://localhost:8800/api/auth/update/${userdata._id}`,
          {
            newUser: {
              ...userdata,
              img: fileReader.result,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
              token: Cookies.get("token"),
            },
          }
        );

        getUser();
        resolve(fileReader.result);
      };
      fileReader.onerror = (err) => {
        reject(err);
      };
    });
  }

  return (
    <div className="ProfileSection">
      <PageBanner title="My Profile" />
      <div className="px-5 profile_box mx-auto py-5 mt-10 bg-white rounded position-relative">
        <div className="d-flex align-items-center w-100 mt-3">
          <Link
            to={"/resetpassword"}
            style={{ position: "absolute", right: "5%", top: "5%" }}
            className="nav-link highlight"
          >
            Want to change password?
          </Link>
          <div className="upload-btn-wrapper">
            {/* <div className="overlay justify-content-between align-items-center">
              <AiFillPlusCircle size={50} color="white" className="mx-auto" />
            </div> */}
            <div
              className="avatar d-flex justify-content-center align-items-center"
            >
              <FaUserAlt size={
                window.matchMedia("(max-width: 550px)").matches ?
               40 : 70} />
            </div>
            {/* <img
              className="avatar"
              src={userdata?.img ? userdata.img : "https://img.freepik.com/free-photo/lot-question-notes-why-who-where-how-why_53876-121555.jpg?size=626&ext=jpg&ga=GA1.2.1109020129.1675219190&semt=ais"}
              style={{
                height: "200px",
                width: "200px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            /> */}
            {/* <input
              type="file"
              name="myfile"
              id="img"
              onChange={(e) => convertToBase64(e.target.files[0])}
            /> */}
          </div>
          <div className="ms-5 prof_info">
            <h1>
              {userdata.name + " " + userdata.surname}
              {userdata?.verified ? (
                <GoVerified className="highlight ms-3" type="button" />
              ) : (
                <GoUnverified className="highlight ms-3" type="button" />
              )}
            </h1>
            <p className="text-muted fs-6">
              {userdata.residence}, {userdata.province}
            </p>
          </div>
        </div>

        <div className="personal_det w-100 mt-5">
          <p className="fs-4 highlight fw-bold d-flex align-items-center">
            Personal Details
            <MdModeEdit
              className="ms-2 text-muted fs-4"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            />{" "}
          </p>
          <p className="mt-1 fs-5 font2">Email : {userdata.email}</p>
          <p className="mt-1 fs-5 font2">Phone Number : {userdata.phone}</p>
          <p className="mt-1 fs-5 font2">Date Of Birth : {userdata.dob}</p>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ marginTop: "100px", zIndex: 30000000 }}
      >
        <div className="modal-dialog mx-auto">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>First Name:</label>
              <input
                type={"text"}
                className="form-control rounded-0 mt-1"
                id="name"
                onChange={(e) => HandleChange(e)}
              />
              <label>Surname:</label>
              <input
                type={"text"}
                className="form-control rounded-0 mt-1"
                id="surname"
                onChange={(e) => HandleChange(e)}
              />
              <label className="mt-2">Phone:</label>
              <input
                type={"text"}
                className="form-control rounded-0 mt-1"
                id="phone"
                onChange={(e) => HandleChange(e)}
              />
              <label className="mt-2">Date of Birth:</label>
              <input
                type={"date"}
                className="form-control rounded-0 mt-1"
                id="dob"
                onChange={(e) => HandleChange(e)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={HandleEdit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
