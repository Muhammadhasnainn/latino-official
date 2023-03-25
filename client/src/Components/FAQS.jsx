import React from "react";

const FAQS = () => {
  return (
    <div className="FAQS mt-10">
      <div className="canvas">
        <h1 className="text-center fw-bold">Preguntas Frecuentes</h1>
        <div className="accordion mt-5" id="accordionExample">
          <div className="accordion-item rounded border-0">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button rounded fs-5"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                ¿Cómo hago un Envío de Dinero?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body font2 font2">
                Una vez creada correctamente tu Ficha de Cliente, podrás
                gestionarlo tú mism@ desde nuestra web o a través de nuestra
                Atención Personalizada. Es un proceso rápido y podrás hacer tu
                pago de manera segura con tu Tarjeta de Débito o Crédito desde
                nuestra Pasarela de Pago Online.
              </div>
            </div>
          </div>
          <div className="accordion-item mt-3 rounded border-0">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button rounded fs-5 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                ¿Cómo crear mi Ficha de Cliente?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body font2">
                Crea tu Ficha de Cliente haciendo Click en "REGISTRO" en el Menú
                superior de nuestra web. Cualquier duda contacta con nuestra
                Atención Personalizada.
              </div>
            </div>
          </div>
          <div className="accordion-item mt-3 rounded border-0">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button rounded fs-5 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                ¿Cómo pago mi Envío?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body font2">
                Puedes pagar tus Envíos de forma segura con tu Tarjeta de Débito
                o Crédito a través de nuestra Pasarela de Pago Online en esta
                misma web. Para otras formas de pago contacta con nuestra
                Atención Personalizada.
              </div>
            </div>
          </div>

          <div className="accordion-item mt-3 rounded border-0">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button rounded fs-5 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                ¿Por qué deben verificar mi Identidad?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body font2">
                Somos sujetos obligados a cumplir con el Artículo 3 de la Ley
                10/2010 de 28 de abril de prevención del Blanqueo de Capitales y
                de la Financiación del Terrorismo. La empresa se reserva el
                derecho de no aceptar solicitudes de clientes no verificados o
                cuando se sospeche de alguna situación irregular.
              </div>
            </div>
          </div>

          <div className="accordion-item mt-3 rounded border-0">
            <h2 className="accordion-header" id="headingFive">
              <button
                className="accordion-button rounded fs-5 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Plazos de Pago
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              aria-labelledby="headingFive"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body font2">
                Nuestras operativas se realizan en pocos minutos desde que se
                recibe tu orden y el pago del importe que deseas enviar.
                Recibirás una notificación de confirmación en tu email junto a
                tu factura.
              </div>
            </div>
          </div>

          <div className="accordion-item mt-3 rounded border-0">
            <h2 className="accordion-header" id="headingSix">
              <button
                className="accordion-button rounded fs-5 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                Monto mínimo y máximo que puedes enviar
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse"
              aria-labelledby="headingSix"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body font2">
                Desde 1,00€ como mínimo y hasta un máximo de 3.000,00€ por
                trimestre. Para montos mayores será necesario aportar
                información sobre el origen de los fondos.
              </div>
            </div>
          </div>
          <div className="accordion-item mt-3 rounded border-0">
            <h2 className="accordion-header" id="headingSeven">
              <button
                className="accordion-button rounded fs-5 collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
              >
                ¿Desde qué países puedo enviar dinero?
              </button>
            </h2>
            <div
              id="collapseSeven"
              className="accordion-collapse collapse"
              aria-labelledby="headingSeven"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body font2">
                En Europa, desde cualquier país perteneciente a la Unión
                Europea. En América, desde USA a través de nuestra web
                LatinoTransfer América AQUÍ.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQS;
