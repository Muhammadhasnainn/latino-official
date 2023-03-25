import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineClose } from "react-icons/md";
import logo from "../assets/logo.png";
import logo2 from "../assets/logo2.png";
import { FaUserAlt } from "react-icons/fa";
import { useAuthContext } from "../Contexts/AuthContext";
import Cookies from "js-cookie";

const Navbar = ({ color }) => {
  const { userdata, user, setUser } = useAuthContext();
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const nav = useRef();

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY >= 30) {
        nav.current.classList.add("nav-colored");
        nav.current.classList.remove("nav-transparent");
        nav.current.style.top = 0;
        setScroll(true);
      } else {
        nav.current.classList.add("nav-transparent");
        nav.current.classList.remove("nav-colored");
        nav.current.style.top = !userdata?.verified && user  ? "100px" : 0;
        setScroll(false);
      }
    };
  }, [nav.current?.offsetTop]);

  return (
    <nav
      className={`Navbar ${color}`}
      id="nav"
      ref={nav}
      style={{ top: !userdata?.verified && user && "100px" }}
    >
      <div
        className="d-flex justify-content-between align-items-center 
      canvas h-100"
      >
        <Link to={"/"} className="me-auto">
          {" "}
          <img
            src={scroll || color === "nav-colored" ? logo2 : logo}
            alt="LatinoTransfer"
            className="logo"
          />
        </Link>
        {window.matchMedia("(max-width: 650px)").matches && (
          <>
            {user ? (
              <div className="dropdown user_box">
                <div
                  className="d-flex align-items-center justify-content-center 
                ms-3 nav-link user_avatar"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserAlt size={25} color="white" />
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item py-2" to={"/profile"}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2" to={"/orderhistory"}>
                      Order history
                    </Link>
                  </li>
                  <li>
                    <p
                      onClick={() => {
                        Cookies.remove("token");
                        setUser(false);
                        navigate("/");
                      }}
                      type="button"
                      className="dropdown-item py-2"
                    >
                      Logout
                    </p>
                  </li>
                </ul>
              </div>
            ) : (
              <div>
                <Link to="/login" className="continue py-1 px-3 mt-0 w-auto">
                  Login
                </Link>
              </div>
            )}

            <AiOutlineMenu
              className="menu_icon ms-2"
              size={30}
              onClick={() => setMenu(!menu)}
              cursor={"pointer"}
            />
          </>
        )}
        {((window.matchMedia("(max-width: 650px)").matches && menu) ||
          window.matchMedia("(min-width: 650px)").matches) && (
          <div className="d-flex align-items-center menu">
            {window.matchMedia("(max-width: 650px)").matches && (
              <MdOutlineClose
                style={{
                  position: "absolute",
                  right: "2px",
                  top: "5%",
                }}
                onClick={() => setMenu(false)}
                color="white"
                cursor={"pointer"}
                size={30}
              />
            )}

            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="ms-3 nav-link">
              About
            </Link>
            <Link to="/contact" className="ms-3 nav-link">
              Contacto
            </Link>
            {!user && (
              <>
                <Link to="/registro" className="ms-3 nav-link">
                  Registero
                </Link>
                {window.matchMedia("(min-width: 650px").matches && (
                  <Link
                    to="/login"
                    className="continue py-1 px-3 mt-0 ms-3 nav-link"
                  >
                    Login
                  </Link>
                )}
              </>
            )}
            {user && window.matchMedia("(min-width: 650px)").matches && (
              <>
                <div className="dropdown user_box">
                  <div
                    className="d-flex align-items-center justify-content-center 
                ms-3 nav-link user_avatar"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserAlt size={25} color="white" />
                  </div>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to={"/profile"}>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item py-2" to={"/orderhistory"}>
                        Order history
                      </Link>
                    </li>
                    <li>
                      <p
                        onClick={() => {
                          Cookies.remove("token");
                          setUser(false);
                          navigate("/");
                        }}
                        type="button"
                        className="dropdown-item"
                      >
                        Logout
                      </p>
                    </li>
                  </ul>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
