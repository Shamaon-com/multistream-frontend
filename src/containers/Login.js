import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Login.css";
import Logo from "../img/logo.svg";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);

  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();


  const validate = () => {
    if (email !== "" && password !== "") {
      return true;
    }
    return false;
  };

  const validateCode = () => {
    return true;
  };

  async function handleLogin(event) {
    event.preventDefault();
    if (validate()) {
      try {
        await Auth.signIn(email, password);
        userHasAuthenticated(true);
        history.push("/chainlog");
      } catch (e) {
        if (e.code === "UserNotConfirmedException") {
          setIsRegister(true);
          setIsConfirmation(true);
        } else {
          alert("La contraseña y el usuario no coinciden.");
        }
      }
    } else {
      alert("Porvafor rellene todos los campos.");
    }
  }

  async function handleRegistration(event) {
    event.preventDefault();
    if (validate()) {
      try {
        await Auth.signUp(email, password);
        alert("Registration successful!");
        setIsConfirmation(true);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      alert("Porvafor rellene todos los campos.");
    }
  }

  async function handleConfirmation(event) {
    event.preventDefault();
    if (validateCode()) {
      try {
        await Auth.confirmSignUp(email, confirmationCode);
        alert("Confirmation successful!");
        setIsRegister(false);
        setIsConfirmation(false);
      } catch (e) {
        console.log(e.message);
      }
    } else {
      alert("Porvafor rellene todos los campos.");
    }
  }

  const renderLogin = () => {
    return (
      <Form>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <div className="buttonLayout">
          <Button className="loginButton" onClick={handleLogin} type="submit">
            Entrar
          </Button>
          <Button
            onClick={(e) => {
              setIsRegister(true);
            }}
            type="submit"
          >
            Registrate
          </Button>
        </div>
      </Form>
    );
  };

  const renderRegister = () => {
    if (!isConfirmation) {
      return (
        <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Email"
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
		  <div className="buttonLayout">
		  	<Button className="backwardsButton" onClick={(e) => {e.preventDefault(); setIsRegister(false);}}>
              &lt;
            </Button>
            <Button onClick={handleRegistration}>
              Register
            </Button>
		  </div>	
        </Form>
      );
    } else {
      return (
        <Form>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              value={confirmationCode}
              onChange={(e) => {
                setConfirmationCode(e.target.value);
              }}
              type="text"
              placeholder="Codigo de confirmación"
            />
          </Form.Group>
		  <div className="buttonLayout">
		  	<Button className="backwardsButton" onClick={(e) => {e.preventDefault(); setIsRegister(false);}}>
              &lt;
            </Button>
          <Button onClick={handleConfirmation} variant="primary" type="submit">
            Entrar
          </Button>
		  </div>
        </Form>
      );
    }
  };

  return (
    <div className="loginForm">
      <Row>
        <Col md={4}>
          <img className="loginLogo" src={Logo} alt="React Logo" />
        </Col>
        <Col md={8}>{isRegister ? renderRegister() : renderLogin()}</Col>
      </Row>
    </div>
  );
}
