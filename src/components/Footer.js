import React from 'react';
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

export default function Footer(props) {

  const history = useHistory();

  async function handleLogout() {
    Auth.signOut();
    window.location.reload(false);
  }

  const test = () => {
    history.push("/chainlog");

  };

  return (
    <div className="footer">
      <div className="logoutButton" onClick={handleLogout}>
        Salir
      </div>
      <div
        className="logoutButton"
      >
        Sporte Tecnico
      </div>
      <div className="logoutButton" onClick={test}>
        Chainlog
      </div>
    </div>
  );
}
