import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import PageBanner from "../Components/PageBanner";
import { HiMail } from "react-icons/hi";
import { FiPhoneCall } from "react-icons/fi";
import axios from "axios";

const Contact = () => {
  const [cred, setCred] = useState({});

  useEffect(() => {
    const ScrollToTop = () => {
      window.scrollTo(0, 0);
    };
    ScrollToTop();
  }, []);

  const HandleSubmit = async () => {
    await axios.post("http://localhost:8800/api/auth/contact", {
      ...cred,
    });
  };

  const HandleChange = (e) => {
    setCred((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="contact bg-white column-resp">
      <PageBanner title={"Contacto"} />
      <div className="canvas col_resp pb-4">
        <h1 className="fw-bold mt-5 p-3 text-center">Atención al Cliente</h1>
        <form className="d-flex justify-content-between mt-4 col_resp">
          <div className="register_1">
            <div className="d-flex w-100">
              <div className="d-flex align-items-center justify-content-center icon me-3">
                <HiMail size={40} color="white" />
              </div>
              <div>
                <h3 className="fw-bold">Email</h3>
                <p className="font2 mt-2">info@latinotransfer.com</p>
                <p className="font2 mt-1">pagos@latinotransfer.com</p>
              </div>
            </div>
            <div className="d-flex w-100 mt-4">
              <div
                className="d-flex align-items-center justify-content-center
           icon me-3"
              >
                <FiPhoneCall size={37} color="white" />
              </div>
              <div>
                <h3 className="fw-bold">Call Center</h3>
                <p className="font2 mt-2">+34 919 93 93 30</p>
                <p className="font2 mt-1">+34 611 59 19 19</p>
              </div>
            </div>
          </div>
          <div className="register_2">
            <label>Nombre</label>
            <input
              type={"text"}
              placeholder="Nombre"
              className="rounded-0 form-control mt-2"
              onChange={(e) => HandleChange(e)}
              id="phone"
            />
            <label className="mt-1">Email</label>
            <input
              type={"email"}
              placeholder="Email"
              className="rounded-0 form-control mt-1"
              onChange={(e) => HandleChange(e)}
              id="email"
            />
            <label className="mt-2">Message</label>
            <textarea
              className="form-control mt-1 rounded-0"
              placeholder="Escribe tu mensaje"
              onChange={(e) => HandleChange(e)}
              id="message"
            />
            <button className="continue w-auto px-4" onClick={HandleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
