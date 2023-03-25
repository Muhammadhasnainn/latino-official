import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Calculator from "./Calculator";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <div className="Hero_section py-4">
      <Navbar />
      <div className="d-flex justify-content-between align-items-center hero_main canvas mt-10 pt-5">
        <div className="w-50">
          <h1 className="hero_h">
            Tus Envíos a Latinoamérica, ¡Rápido y Seguro!
          </h1>
          <div className="d-flex align-items-center mt-4">
            <BsFillCheckCircleFill color="#0094ff"/>
            <p className="ms-2 fs-5">iListo en Minutos!</p>
          </div>
          <div className="d-flex align-items-center mt-2">
            <BsFillCheckCircleFill color="#0094ff"/>
            <p className="ms-2 fs-5">Trato Personalizado</p>
          </div>
          <div className="d-flex align-items-center mt-2">
            <BsFillCheckCircleFill color="#0094ff"/>
            <p className="ms-2 fs-5">Sistema 24/7</p>
          </div>
          <div className="d-flex align-items-center mt-2">
            <BsFillCheckCircleFill color="#0094ff"/>
            <p className="ms-2 fs-5">Más de 20 Países</p>
          </div>
          <div className="d-flex align-items-center mt-2">
            <BsFillCheckCircleFill color="#0094ff"/>
            <p className="ms-2 fs-5">Agentes Autorizados</p>
          </div>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default Hero;
