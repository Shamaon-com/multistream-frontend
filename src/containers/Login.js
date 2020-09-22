import React, { useState } from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import { Auth } from "aws-amplify";
import "./Login.css";
import Logo from "../img/logo.svg";
import { useAppContext } from "../libs/contextLib";
import { useHistory } from "react-router-dom";
import Footer from "../components/Footer.js";

export default function Login(props) {
  const [password, setPassword] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [email, setEmail] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [isConfirmation, setIsConfirmation] = useState(false);
  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userHasAuthenticated } = useAppContext();
  const history = useHistory();

  /*
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
        } 
      }
    } 
  }
  */

  async function handleRegistration(event) {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }else{
      try {
        await Auth.signUp(email, password);
        setIsConfirmation(true);
        return;
      } catch (e) {
        setErrorMessage("error");
      }
    }
    setValidated(true);
  }

  async function handleConfirmation(event) {
    event.preventDefault();
    try {
      await Auth.confirmSignUp(email, confirmationCode);
      setIsRegister(false);
      setIsConfirmation(false);
    } catch (e) {
      console.log(e.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    console.log(form);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      history.push("/chainlog");
    } catch (e) {
      if (e.code === "UserNotConfirmedException") {
        setIsRegister(true);
        setIsConfirmation(true);
      }
    }

    setValidated(true);
  }

  const renderLogin = () => {
    return (
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <Form.Control.Feedback type="invalid">
            Por favor rellene este campo con un email valido.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Control
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Contraseña"
            required
          />
          <Form.Control.Feedback type="invalid">
            Por favor rellene este campo.
          </Form.Control.Feedback>
        </Form.Group>
        <div className="buttonLayout">
          <Button className="loginButton" type="submit">
            Entrar
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsRegister(true);
              setValidated(false);
            }}
          >
            Regístrate
          </Button>
        </div>
      </Form>
    );
  };


  const renderRegister = () => {
    return (
      <div>
        <p className="text">Esta funcionalidad esta desactivada</p>
        <div className="buttonLayout">
            <Button
              className="backwardsButton"
              onClick={(e) => {
                e.preventDefault();
                setIsRegister(false);
                setValidated(false);
              }}
            >
              &lt;
            </Button>
          </div>
      </div>
    )
  }
/*
  const renderRegister = () => {
    if (!isConfirmation) {
      return (
        <Form noValidate validated={validated} onSubmit={handleRegistration}>
        <Form.Group controlId="formBasicEmail">
          <Form.Control
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          />
          <Form.Control.Feedback type="invalid">
            Por favor rellene este campo con un email valido.
          </Form.Control.Feedback>
        </Form.Group>
          <Form.Group controlId="formRegisterPassword">
            <Form.Control
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="Contraseña"
            />
            <Form.Control.Feedback type="invalid">
              Por favor rellene este campo.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="errorMessage">
            {errorMessage}
          </div>
          <div className="buttonLayout">
            <Button
              className="backwardsButton"
              onClick={(e) => {
                e.preventDefault();
                setIsRegister(false);
                setValidated(false);
              }}
            >
              &lt;
            </Button>
            <Button type="submit">Registrarse</Button>
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
            <Button
              className="backwardsButton"
              onClick={(e) => {
                e.preventDefault();
                setIsRegister(false);
              }}
            >
              &lt;
            </Button>
            <Button
              onClick={handleConfirmation}
              variant="primary"
              type="submit"
            >
              Entrar
            </Button>
          </div>
        </Form>
      );
    }
  };
*/
  return (
    <>
      <div className="loginForm">
        <Row>
          <Col md={4}>
            <img className="loginLogo" src={Logo} alt="React Logo" />
          </Col>
          <Col md={8}>{isRegister ? renderRegister() : renderLogin()}</Col>
        </Row>
      </div>
      <Footer />
    </>
  );
}
