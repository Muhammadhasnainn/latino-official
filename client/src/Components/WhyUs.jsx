import React from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";

const WhyUs = () => {
  return (
    <div className="Whyus mt-10 py-5 fs-60 column-resp">
      <div
        className="d-flex justify-content-between canvas canvas_col"
        style={{ position: "relative" }}
      >
        <img
          src="https://img.freepik.com/free-photo/lot-question-notes-why-who-where-how-why_53876-121555.jpg?size=626&ext=jpg&ga=GA1.2.1109020129.1675219190&semt=ais"
          alt="latinotransfer img"
          className="w-50 me-5 rounded"
          style={{
            objectFit: "cover",
            height: "100vh"
          }}
        />
        <div className="why_content w-50">
          <h1 className="fw-bold">¿Por qué Elegirnos?</h1>
          <p className="mt-2 fs-6 text-muted">
            Desde el año 2001 venimos operando a través de Entidades de Pago
            colaboradoras y desarrollando las capacidades necesarias para
            ofrecer un servicio rápido y sencillo, sin reducir la calidad,
            seguridad y confiabilidad del proceso. Siempre enfocados hacia el
            cliente moderno, con un equipo de profesionales con 22 años de
            experiencia.
          </p>

          <div className="mt-3">
            <div className="d-flex align-items-center mt-4">
              <BsFillCheckCircleFill color="#0094ff" size={27}/>
              <p className="ms-2 fs-5 fw-bold">iListo en Minutos!</p>
            </div>
            <p className="mt-1 text-muted fs-6 font2">
              {" "}
              Como Empresa Regulada, seguimos los más estrictos protocolos AMLD,
              cumpliendo al 100% con los requerimientos del SEPBLAC.
            </p>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center mt-4">
              <BsFillCheckCircleFill color="#0094ff" size={27}/>
              <p className="ms-2 fs-5 fw-bold">¡Transferencias en Minutos!</p>
            </div>
            <p className="mt-1 text-muted fs-6 font2">
              {" "}
              Desde que recibamos tu pago, sólo tardaremos pocos minutos en
              emitir la transferencia al beneficiario que hayas indicado.
            </p>
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center mt-4">
              <BsFillCheckCircleFill color="#0094ff" size={27}/>
              <p className="ms-2 fs-5 fw-bold">Trato Personalizado</p>
            </div>
            <p className="mt-1 text-muted fs-6 font2">
              {" "}
              Si lo deseas, tendrás a tu disposición un trato directo con un
              Agente a través de Whatsapp para aclarar tus dudas y guiarte en el
              proceso.
            </p>{" "}
          </div>
          <div className="mt-3">
            <div className="d-flex align-items-center mt-4">
              <BsFillCheckCircleFill color="#0094ff" size={27}/>
              <p className="ms-2 fs-5 fw-bold">Simple y Rápido</p>
            </div>
            <p className="mt-1 text-muted fs-6 font2">
              {" "}
              El proceso de Registro y Verificación es sólo por una vez, luego
              podrás gestionar tus envíos y pagar desde nuestra web con Tarjeta
              en segundos.
            </p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
