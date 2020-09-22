import React from "react";
import "./Home.css";
import "./Chainlog.css";
import Logo from "../img/logo.svg";
import { useHistory } from "react-router-dom";
import { TiThumbsOk } from "react-icons/ti";
import Footer from "../components/Footer.js";

export default function Chainlog(props) {
  const history = useHistory();

  return (
    <>
      <div className="homeContainer chainlogContainer">
        <div className="homeHeader">
          <img className="logoSmall" src={Logo} />
        </div>
        <div className="homeBody">
          <div className="chainLogWelcome">
            Bienvenido a la version Alpha del servicio multistream de Shamaon.
            <br />
            <br />
            Algunas funcionalidades estan desactivadas y/o en desarollo. Aqui
            puedes ver las funcionalidades que quedan por implementar y su
            tiempo estimado de implementación.
            <br />
            <br />
            Alpha:
            <ul>
              <li>
                {" "}
                Video player para previsualizar la señal entrante.
                <br />
                <div className="detalles">
                  <div className="detallesSmall">Prioridad: Alta</div>
                  <div className="detallesSmall">TEI: 2 semanas</div>
                </div>
              </li>
              <li>
                {" "}
                Transcodificacion para Facebook e Instagram.
                <br />
                <div className="detalles">
                  <div className="detallesSmall">Prioridad: Baja</div>
                  <div className="detallesSmall">TEI: none</div>
                </div>
              </li>
              <li>
                {" "}
                Posibilidad de emitir a direcciones RTMP independientes
                <br />
                <div className="detalles">
                  <div className="detallesSmall">Prioridad: Alta</div>
                  <div className="detallesSmall">TEI: 2 semanas</div>
                </div>
              </li>
              <li>
                {" "}
                Soprte optimizado para movil.
                <br />
                <div className="detalles">
                  <div className="detallesSmall">Prioridad: Baja</div>
                  <div className="detallesSmall">TEI: None</div>
                </div>
              </li>
            </ul>
          </div>
          <div className="footerBar">
            <TiThumbsOk
              className="okIcon"
              onClick={(e) => {
                history.push("/");
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
