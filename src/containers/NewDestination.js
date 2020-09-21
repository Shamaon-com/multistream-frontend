import "./Home.css";
import "./Login.css";
import React, { useState } from "react";
import { destinations } from "../data/samples.js";
import { Form, Button } from "react-bootstrap";
import { API, Auth } from 'aws-amplify';
import short from "short-uuid";


export default function NewDestination(props) {
  const [didChoose, setDidChoose] = useState(false);
  const [choosen, setChoosen] = useState("");
  // Destination params
  const [streamkey, setStreamkey] = useState("");
  const [name, setName] = useState("");
  //const [userStreamKey, setUserStreamKey] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleSubmit(){
    props.setIsLoading(true);
    if (!validate()){
      alert("Rellen todo los campos");
      return;
    }
    
    var key = streamkey;
    if(key === ""){
      key = short.generate();
    }
    const user = await Auth.currentAuthenticatedUser();
    const apiName = "api720b87a2";
    const path = "/main"
    const data = {
        body: {
            'pk': user.username,
            'sk': key.split('?')[0],
            'service': destinations[choosen].name.toUpperCase(),
            'name': name,
            'active': true,
            'password': password,
            'username': username,
            'fbKey': key.split('?')[1]
        }
    }

    API.post(apiName, path, data)
      .then((response) => {
        props.setIsLoading(false);
        props.setIsNew(false);
        props.onLoad();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const validate = () => {
    return ((streamkey !== "" && name !== "") || (username !== "" && password !== ""));
  }


  const appGrid = () => {
    return (
      <div className="destinationGrid">
        {destinations.map((destination, i) => (
          <div
            className="destinationItem"
            onClick={(e) => {
              e.preventDefault();
              setDidChoose(true);
              setChoosen(i);
            }}
          >
            <div>
              <img className="destiantionIcon" src={destination.icon} />
            </div>
            <div>{destination.name}</div>
          </div>
        ))}
      </div>
    );
  };

  const appForm = () => {
    const destination = destinations[choosen];
    return (
      <div className="itemContainer">
        <div className="itemTitle">
          <img className="destiantionIcon" src={destination.icon} />
          {destination.name}
        </div>
        <div className="itemDescription">{destination.description}</div>
        <div className="itemForm">
          <Form>
            <Form.Group controlId="formNameFiled">
              <Form.Control
                value={name}
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Nombre de la emision"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                value={streamkey}
                onChange={(e) => {
                  e.preventDefault();
                  setStreamkey(e.target.value);
                }}
                type="text"
                placeholder="Clave de emision"
              />
            </Form.Group>
            
            <div className="buttonLayout">
              <Button
                className="backwardsButton"
                onClick={(e) => {
                  e.preventDefault();
                  setDidChoose(false);
                  setName("");
                }}
              >
                &lt;
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                variant="primary"
                type="submit"
              >
                Entrar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  };

  const appFormWithLogin = () => {
    const destination = destinations[choosen];
    return (
      <div className="itemContainer">
        <div className="itemTitle">
          <img className="destiantionIcon" src={destination.icon} />
          {destination.name}
        </div>
        <div className="itemDescription">{destination.description}</div>
        <div className="itemForm">
          <Form>
          <Form.Group controlId="formBasicPassword">
              <Form.Control
                value={name}
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                placeholder="Nombre de la emision"
              />
            </Form.Group>
            <Form.Group controlId="formNameFiled">
              <Form.Control
                value={username}
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
                type="text"
                placeholder="Usuario"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                type="password"
                placeholder="Contraseña"
              />
            </Form.Group>
            
            <div className="buttonLayout">
              <Button
                className="backwardsButton"
                onClick={(e) => {
                  e.preventDefault();
                  setDidChoose(false);
                  setName("");
                }}
              >
                &lt;
              </Button>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                variant="primary"
                type="submit"
              >
                Entrar
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }


  return (
    <>
      {didChoose ?  destinations[choosen].name === 'instagram' ? appFormWithLogin(): appForm() : appGrid()}
    </>
  );
}
