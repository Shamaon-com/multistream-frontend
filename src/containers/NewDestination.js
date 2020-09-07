import "./Home.css";
import "./Login.css";
import React, { useState, useEffect } from "react";
import { destinations } from "../data/samples.js";
import { Form, Button } from "react-bootstrap";
import { API, Auth } from 'aws-amplify';


export default function NewDestination(props) {
  const [didChoose, setDidChoose] = useState(false);
  const [choosen, setChoosen] = useState("");
  const [streamkey, setStreamkey] = useState("");
  const [channelName, setChannelName] = useState("");


  async function handleSubmit(){
    props.setIsLoading(true);
    if (!validate()){
      alert("Rellen todo los campos");
      return;
    }
    
    const user = await Auth.currentAuthenticatedUser();
    const apiName = "api720b87a2";
    const path = "/main"
    const data = {
        body: {
            'pk': user.username,
            'sk': streamkey, 
            'service': destinations[choosen].name.toUpperCase(),
            'name': channelName,
            'active': true
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
    return (streamkey !== "" && channelName !== "");
  }


  const appGrid = () => {
    //console.log(destinations);
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
                value={channelName}
                onChange={(e) => {
                  e.preventDefault();
                  setChannelName(e.target.value);
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
                placeholder="Streamkey / clave de emision"
              />
            </Form.Group>
            
            <div className="buttonLayout">
              <Button
                className="backwardsButton"
                onClick={(e) => {
                  e.preventDefault();
                  setDidChoose(false);
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

  return (
    <>
      {didChoose ? appForm() : appGrid()}
    </>
  );
}
