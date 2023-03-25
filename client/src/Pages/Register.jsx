import React, { useEffect, useState } from "react";
import PageBanner from "../Components/PageBanner";
import logo from "../assets/logo2.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [creds, setCreds] = useState({});
  const [success, setSuccess] = useState(false);
  const [show, setshow] = useState(false);
  const [token, setToken] = useState(null);

  const HandleRegister = async () => {
    setshow(true);
    try {
      await axios
        .post(
          "https://neocheck.net/api/v1/VideoIdentifications/unattended/link",
          { language: "es", lang: "es" },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(async (data) => {
          let url = new URL(data.data);
          let id = url.pathname.split("/").at(-1);

          await axios.post("http://localhost:8800/api/auth/register", {
            ...creds,
            neocheckId: id,
          });
          setSuccess(true);
          alert("Check your mail For verification!");
        })
        .catch((err) => {
          console.log(err);
        });

    } catch (err) {
      console.log(err);
      setSuccess(false);
    }
  };

  const HandleChange = (e) => {
    setCreds((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  useEffect(() => {
    const ScrollToTop = () => {
      window.scrollTo(0, 0);
    };
    ScrollToTop();

    const FetchToken = async () => {
      const { data } = await axios.post(
        "https://neocheck.net/api/authorization/token",
        {
          username: "latinotransferPRE",
          password: "ht59TTp1",
        }
      );

      setToken(data.access_token);
    };
    FetchToken();
  }, []);

  return (
    <div className="Register bg-white column-resp">
      <PageBanner title={"REGISTRO"} />

      {show &&
        (success ? (
          <div className="alert alert-success" role="alert">
            Account created Successfully! Check your email for verification.
          </div>
        ) : (
          <div className="alert alert-danger" role="alert">
            Please fill all the fields below!
          </div>
        ))}

      <div className="d-flex justify-content-between canvas col_resp py-5">
        <div className="register_1 text-center mt-5">
          <img src={logo} alt="LatinoTransfer-logo" />
          <p className="mt-2 fs-4">
            Necesitamos registrar tus datos y verificar tu Identidad solo por
            una vez.
          </p>
          <small style={{ color: "#eaa835" }}>
            Artículo 3 de la Ley 10/2010 de 28 de abril de prevención del
            Blanqueo de Capitales y de la Financiación del Terrorismo.
          </small>
        </div>
        <div className="register_2">
          <div className="register-fields mt-2">
            <label className="font2">Datos Personales:</label>
            <div
              className="d-flex justify-content-between flex-wrap 
            align-items-center mt-1"
            >
              <div className="mt-2 field">
                <input
                  type={"text"}
                  placeholder="Nombres"
                  className="form-control border-0 rounded-0 mt-2"
                  id="name"
                  onChange={(e) => HandleChange(e)}
                />
                <small>Debe coincidir con DNI/NIE/Pas.</small>
              </div>
              <div className="mt-2 field">
                <input
                  type={"text"}
                  placeholder="Apellidos"
                  className="form-control border-0 rounded-0 mt-2"
                  id="surname"
                  onChange={(e) => HandleChange(e)}
                />
                <small>Debe coincidir con DNI/NIE/Pas.</small>
              </div>
            </div>
          </div>
          <div className="register-fields mt-2">
            <div
              className="d-flex justify-content-between flex-wrap 
              mt-1"
            >
              <div className="mt-2 field">
                <input
                  type={"text"}
                  placeholder="Birth Day/Month/Year"
                  className="form-control border-0 rounded-0"
                  id="dob"
                  onChange={(e) => HandleChange(e)}
                />
                <small>Only +18 years</small>
              </div>

              <div className="field mt-2">
                <input
                  type={"text"}
                  placeholder="Phone"
                  className="form-control w-100 border-0 rounded-0"
                  id="phone"
                  onChange={(e) => HandleChange(e)}
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between flex-wrap register-fields mt-2">
            <input
              type={"email"}
              placeholder="E-mail"
              className="form-control field rounded-0 border-0 mt-2"
              id="email"
              onChange={(e) => HandleChange(e)}
            />
            <input
              type={"text"}
              placeholder="Nacionalidad"
              className="form-control field rounded-0 border-0 mt-2"
              id="nationality"
              onChange={(e) => HandleChange(e)}
            />
          </div>

          <div className="d-flex justify-content-between flex-wrap register-fields mt-2">
            <input
              type={"text"}
              placeholder="Pais de Residencia"
              className="form-control field rounded-0 border-0 mt-2"
              id="residence"
              onChange={(e) => HandleChange(e)}
            />
            <div className="dropdown">
              <button
                className="form-control field rounded-0 border-0 mt-2 text-start"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {creds.profession ? creds.profession : "Profesión"}
              </button>
              <ul className="dropdown-menu">
                <li
                  className="dropdown-item"
                  type="button"
                  onClick={(e) =>
                    setCreds({ ...creds, profession: e.target.innerHTML })
                  }
                >
                  Empresario
                </li>
                <li
                  className="dropdown-item"
                  type="button"
                  onClick={(e) =>
                    setCreds({ ...creds, profession: e.target.innerHTML })
                  }
                >
                  Estudiante
                </li>
                <li
                  className="dropdown-item"
                  type="button"
                  onClick={(e) =>
                    setCreds({ ...creds, profession: e.target.innerHTML })
                  }
                >
                  Ama de casa
                </li>
              </ul>
            </div>
          </div>

          <div className="register-fields mt-2">
            <label className="font2">Domicilio:</label>
            <div className="d-flex justify-content-between flex-wrap align-items-center mt-1">
              <input
                type={"text"}
                placeholder="Via"
                id="homevia"
                onChange={(e) => HandleChange(e)}
                className="form-control border-0 rounded-0 mt-2 field mt-2"
              />
              <input
                type={"number"}
                placeholder="Numero"
                id="homenumber"
                onChange={(e) => HandleChange(e)}
                className="form-control border-0 rounded-0 mt-2 field mt-2"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between flex-wrap register-fields mt-2">
            <input
              type={"text"}
              placeholder="Provincia/Estado"
              className="form-control field rounded-0 border-0 mt-2"
              id="province"
              onChange={(e) => HandleChange(e)}
            />
            <input
              type={"text"}
              placeholder="Codigo Postal"
              id="postalcode"
              onChange={(e) => HandleChange(e)}
              className="form-control field rounded-0 border-0 mt-2"
            />
          </div>
          <input
            type={"password"}
            placeholder="Password"
            className="form-control field rounded-0 border-0 mt-3 w-100"
            id="password"
            onChange={(e) => HandleChange(e)}
          />
          <div className="d-flex align-items-start form-check mt-3">
            <input
              className="form-check-input mb-0"
              style={{ width: "35px" }}
              type="checkbox"
              id="flexCheckDefault"
              //   ref={privacyRef}
            />
            <label
              className="form-check-label text-muted ms-2"
              htmlFor="flexCheckDefault"
            >
              Haciendo click aquí, aceptas nuestros Términos y Condiciones y
              Política general en materia de Protección de Datos de
              LatinoTransfer y nos autorizas a contactarte por E-mail, SMS y
              Whatsapp.
            </label>
          </div>
          <button
            className="continue mt-3 d-block mx-auto w-auto px-3"
            onClick={HandleRegister}
          >
            REGISTRAREME
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
