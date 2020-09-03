import "./Home.css";
import "./Login.css";
import React, { useState } from "react";
import { destinations } from "../data/samples.js";
import { Form, Button } from "react-bootstrap";
import { API, Auth } from 'aws-amplify';
import { useHistory } from "react-router-dom";


export default function NewDestination(props) {
  const [didChoose, setDidChoose] = useState(false);
  const [choosen, setChoosen] = useState("");
  const [streamkey, setStreamkey] = useState("");
  const history = useHistory();


  async function handleSubmit(){
    
    const user = await Auth.currentAuthenticatedUser();
    const apiName = "apiadae06fa";
    const path = "/main"
    const data = {
        /*
        body: {
            'pk': '#USERID#' + user.username,
            'sk': '#' + destinations[choosen].name.toUpperCase() + '#' + streamkey
        }
        */
       body: {
           'pk': user.username,
           'sk': streamkey
       }
    };
    
    API.post(apiName, path, data)
      .then((response) => {
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const appGrid = () => {
    console.log(destinations);
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
