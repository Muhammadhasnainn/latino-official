import React from "react";
import Navbar from "./Navbar";

const PageBanner = ({ title }) => {
  return (
    <>
      <Navbar color="nav-transparent" />
      <div
        className="d-flex justify-content-center 
        banner align-items-center"
        style={{
          height: "50vh",
          background:
            "rgba(0,0,0,0.3)url(https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundBlendMode: "darken",
          backgroundAttachment: "fixed"
        }}
      >
        <h1 className="text-white fw-bold mt-5">{title}</h1>
      </div>
    </>
  );
};

export default PageBanner;
