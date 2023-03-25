import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import { MdCall, MdMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="footer mt-10 pt-4 pb-5">
      <div className="canvas">
        <div className="d-flex justify-content-between flex-wrap">
          <div className="footer-col">
            <img src={logo} alt="LatinoTransfer" />
            <div className="d-flex mt-3">
              <div className="social_icon">
                <AiOutlineTwitter />
              </div>
              <div className="social_icon ms-2">
                <FaFacebookF />
              </div>
              <div className="social_icon ms-2">
                <BsInstagram />
              </div>
            </div>
          </div>
          <div className="footer-col">
            <h2>Ayuda</h2>
            <div className="mt-3">
              <Link to="/" className="text-white">
                Help
              </Link>
            </div>
            <div className="mt-2">
              <Link to={"/"} className="text-white">
                FAQ's
              </Link>
            </div>
            <div className="mt-2">
              <Link to={"/"} className="text-white">
                Terms & Conditions
              </Link>
            </div>
            <div className="mt-2">
              <Link to={"/contact"} className="text-white">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="footer-col">
            <h2>Atención al Cliente</h2>
            <div className="mt-3">
              <MdMailOutline size={20} color="#0094ff" />
              <Link to={"/"} className="text-white ms-3">
                info@latinotransfer.com
              </Link>
            </div>
            <div className="mt-2">
              <MdCall size={20} color="#0094ff" />
              <Link to={"/"} className="text-white ms-3">
                +34 919 93 93 30
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
