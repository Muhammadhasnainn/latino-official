import React from "react";
import {FaUser, FaHourglassEnd} from "react-icons/fa";
import {RiMoneyDollarCircleLine} from "react-icons/ri";

const HowWorks = () => {
  return (
    <div className="how_works mt-10">
      <div className="canvas canvas_col">
        <h1 className="text-center fw-bold">¿Cómo Funciona?</h1>

        <div className="grid mt-5">
          <div className="text-center Card">
            <h2 className="fs-4 fw-bold">Crea tu Ficha Cliente</h2>
            <FaUser size={35} className="mt-1" color="#0094ff"/>
            <p className="mt-2 font2">
              ¡Es gratis! y en pocos minutos podrás gestionar tus envíos de
              dinero a familiares, amigos y proveedores.
            </p>
          </div>
          <div className="text-center Card">
            <h2 className="fs-4 fw-bold">Solicita tu Envío</h2>
            <RiMoneyDollarCircleLine size={40} className="mt-1"  color="#0094ff"/>
            <p className="mt-2 font2">
              Desde nuestra Web 24 Hrs. todos los días o a través de nuestra
              Atención Personalizada en horario laboral.
            </p>
          </div>
          <div className="Card text-center">
            <h2 className="fs-4 fw-bold">Recibe en Destino</h2>
            <FaHourglassEnd size={35} className="mt-1" color="#0094ff"/>
            <p className="mt-2 font2">
              Al confirmar tu pago, nuestros Agentes proceden a emitir tu
              transferencia en pocos minutos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowWorks;
