import React, { useRef, useState } from "react";

const Calculator = () => {
  const country = useRef();
  const [filterData, setFilter] = useState([]);
  const countryInp = useRef();
  const curr2 = useRef();
  const totalFees = useRef();
  const exchangerate = useRef();
  const flag = useRef();
  const gets = useRef();
  const amountInp = useRef();
  const total = useRef();

  const data = [
    {
      FLAG: "https://i.ibb.co/hCX1skd/BANDERA-ARGENTINA.jpg",
      COUNTRY: "Argentina",
      EXCHRATE: "52.00",
      FEE: "5.00 €",
      NOM: "ARS",
    },
    {
      FLAG: "https://i.ibb.co/vvMrk3b/BANDERA-BOLIVIA.jpg",
      COUNTRY: "Bolivia",
      EXCHRATE: "6.00",
      FEE: "5.00 €",
      NOM: "BOB",
    },
    {
      FLAG: "https://i.ibb.co/PC1Bwgg/BANDERA-BRASIL.jpg",
      COUNTRY: "Brasil",
      EXCHRATE: "22.00",
      FEE: "5.00 €",
      NOM: "BRL",
    },
    {
      FLAG: "https://i.ibb.co/0h9t6XX/BANDERA-CHILE.jpg",
      COUNTRY: "Chile",
      EXCHRATE: "1,225.00",
      FEE: "5.00 €",
      NOM: "CLF",
    },
    {
      FLAG: "https://i.ibb.co/KjYHjZc/BANDERA-COLOMBIA.jpg",
      COUNTRY: "Colombia",
      EXCHRATE: "223.00",
      FEE: "5.00 €",
      NOM: "COP",
    },
    {
      FLAG: "https://i.ibb.co/GFhHp3S/BANDERA-COSTA-RICA.jpg",
      COUNTRY: "Costa Rica",
      EXCHRATE: "25.00",
      FEE: "5.00 €",
      NOM: "CRC",
    },
    {
      FLAG: "https://i.ibb.co/r6s3kGc/BANDERA-ECUADOR.jpg",
      COUNTRY: "Ecuador",
      EXCHRATE: "5.00",
      FEE: "5.00 €",
      NOM: "USD",
    },
    {
      FLAG: "https://i.ibb.co/YTTGYLG/BANDERA-EL-SALVADOR.jpg",
      COUNTRY: "El Salvador",
      EXCHRATE: "2.00",
      FEE: "5.00 €",
      NOM: "USD",
    },
    {
      FLAG: "https://i.ibb.co/8mkPCDC/BANDERA-USA-1.jpg",
      COUNTRY: "Estados Unidos",
      EXCHRATE: "8.00",
      FEE: "5.00 €",
      NOM: "USD",
    },
    {
      FLAG: "https://i.ibb.co/DRFWdvB/BANDERA-GUATEMALA.jpg",
      COUNTRY: "Guatemala",
      EXCHRATE: "21.52",
      FEE: "5.00 €",
      NOM: "GTQ",
    },
    {
      FLAG: "https://i.ibb.co/NTsmcwP/BANDERA-HONDURAS.jpg",
      COUNTRY: "Honduras",
      EXCHRATE: "13.66",
      FEE: "5.00 €",
      NOM: "HNL",
    },
    {
      FLAG: "https://i.ibb.co/sFYfKX3/BANDERA-MEXICO.jpg",
      COUNTRY: "México",
      EXCHRATE: "5,110.23",
      FEE: "5.00 €",
      NOM: "MXN",
    },
    {
      FLAG: "https://i.ibb.co/256nM3c/BANDERA-NICARAGUA.jpg",
      COUNTRY: "Nicaragua",
      EXCHRATE: "2.00",
      FEE: "5.00 €",
      NOM: "NIO",
    },
    {
      FLAG: "https://i.ibb.co/6Zt5qCV/BANDERA-PANAMA.jpg",
      COUNTRY: "Panamá",
      EXCHRATE: "551.00",
      FEE: "5.00 €",
      NOM: "USD",
    },
    {
      FLAG: "https://i.ibb.co/51T6p0B/BADERA-PARAGUAY.jpg",
      COUNTRY: "Paraguay",
      EXCHRATE: "20.00",
      FEE: "5.00 €",
      NOM: "PYG",
    },
    {
      FLAG: "https://i.ibb.co/WpGxz1r/BANDERA-PERU.jpg",
      COUNTRY: "Perú",
      EXCHRATE: "3.51",
      FEE: "5.00 €",
      NOM: "PEN",
    },
    {
      FLAG: "https://i.ibb.co/sm6tqhr/BANDERA-REPUBLICA-DOMINICANA.jpg",
      COUNTRY: "Rep. Dominicana",
      EXCHRATE: "10.50",
      FEE: "5.00 €",
      NOM: "DOP",
    },
    {
      FLAG: "https://i.ibb.co/S52QHnx/BANDERA-URUGUAY.jpg",
      COUNTRY: "Uruguay",
      EXCHRATE: "1,235.51",
      FEE: "5.00 €",
      NOM: "UYU",
    },
    {
      FLAG: "https://i.ibb.co/BBndwHf/BANDERA-VENEZUELA.jpg",
      COUNTRY: "Venezuela",
      EXCHRATE: "23.50",
      FEE: "0.00 €",
      NOM: "VES",
    },
  ];

  function showList(e) {
    var filtered = data.filter((elem) => {
      return elem.COUNTRY.toLowerCase().startsWith(
        e.target.value.toLowerCase()
      );
    });

  setFilter(filtered)
  }

  let countryData = [];

  const setCountry = (country, nom) => {
    curr2.current.innerHTML = nom;
    countryInp.current.value = country;

    countryData = data.filter((elem) => {
      return elem.NOM === nom && elem.COUNTRY === country;
    });

    totalFees.current.innerHTML = countryData[0].FEE;
    exchangerate.current.innerHTML = countryData[0].EXCHRATE + " " + nom;
    flag.current.style.display = "flex";
    flag.current.src = countryData[0].FLAG;
    Calculate();
  };

  function Calculate() {
    if (countryData.length > 0) {
        console.log(gets);
      gets.current.value =
        Number(
          amountInp.current.value * countryData[0].EXCHRATE.replace(",", "")
        ).toLocaleString() + ".00";
      total.current.value =
        (
          Number(amountInp.current.value.replace(",", "")) +
          Number(countryData[0].FEE.replace("€", ""))
        ).toLocaleString() + ".00";
    }
  }


  return (
    <div className="rounded border calculator">
      <div className="curr w-100 fs-5 py-2">ENVIAR</div>
      <div className="mt-3 px-2">
        <label>Destino</label>
        <div
          className="d-flex mt-1 bb"
          style={{ position: "relative", width: "100%" }}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img id="flag" ref={flag} />
          <input
            type="text"
            className="form-control rounded-0"
            onInput={(e) => showList(e)}
            id="countryInp"
            ref={countryInp}
          />
          <div className="dropdown" style={{ position: "static" }}>
            <button
              className="btn border dropdown-toggle rounded-0 h-100"
              type="button"
            ></button>
            <ul className="dropdown-menu" id="country" ref={country}>
              {filterData.length > 0 ? filterData.map((elem) => {
                return (
                  <li
                    type="button"
                    className="py-1 px-2"
                    onClick={() => setCountry(`${elem.COUNTRY}`, `${elem.NOM}`)}
                  >
                    {elem.COUNTRY}
                  </li>
                );
              })
              :
              data.map((elem) => {
                return (
                  <li
                    type="button"
                    className="py-1 px-2"
                    onClick={() => setCountry(`${elem.COUNTRY}`, `${elem.NOM}`)}
                  >
                    {elem.COUNTRY}
                  </li>
                );
              })
            }
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-3 px-2">
        <label>Envía</label>
        <div
          className="bb d-flex mt-1"
          style={{ position: "relative", width: "100%" }}
        >
          <input
            type="text"
            className="form-control"
            id="amountInp"
            onInput={Calculate}
            ref={amountInp}
          />
          <div className="curr">EUR</div>
        </div>
      </div>

      <div className="mt-3 px-2">
        <label>Recibe*</label>
        <div
          className="bb d-flex mt-1"
          style={{ position: "relative", width: "100%" }}
        >
          <input type="text" className="form-control" id="gets" ref={gets} />
          <div className="curr" id="curr2" ref={curr2}></div>
        </div>
      </div>
      <p className="text-muted mt-1 px-2">
        Comisión:{" "}
        <span className="fw-bold" id="totalFees" ref={totalFees}></span>
      </p>
      <p className="text-muted px-2">
        Tasa: 1 EUR =
        <span className="fw-bold" id="exchangerate" ref={exchangerate}></span>
      </p>

      <div className="mt-3 px-2">
        <label>Total a pagar </label>
        <div
          className="bb d-flex mt-1"
          style={{ position: "relative", width: "100%" }}
        >
          <input type="text" className="form-control" id="total" ref={total} />
          <div className="curr">EUR</div>
        </div>
      </div>
      <p className="text-muted px-2 small">
        *Resultado sujeto a tasas y tipos de cambio variables.
      </p>
      <a href="http://europe.latinotransfer.com/registro/" className="continue">
        Continuar
      </a>
    </div>
  );
};

export default Calculator;
