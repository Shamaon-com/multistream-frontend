import React, { useEffect, useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import "./Home.css";
import Logo from "../img/logo.svg";
import NewDestination from "./NewDestination.js";



export default function Home(props) {

    const [channels, setChannels ] = useState([]);
    const [isNew, setIsNew ] = useState(true);


    function renderchannelsList() {
        return [{}].concat(channels).map((channel, i) =>
          i !== 0 ? (
              <ListGroupItem header={channel.content.trim().split("\n")[0]}>
                {"Created: " + new Date(channel.createdAt).toLocaleString()}
              </ListGroupItem>
          ) : (
              <ListGroupItem className="createNewButton" onClick={(e) => {e.preventDefault(); alert("test");}}> 
                <h4>
                  <b>{"\uFF0B"}</b> Create a new destination
                </h4>
              </ListGroupItem>
          )
        );
      }
      

    return (
        <div className="homeContainer">
            <div className="homeHeader">
                <img className="logoSmall" src={Logo} />

            </div>
            <div className="homeBody">
                { isNew ? <NewDestination/> : renderchannelsList() }
            </div>
        </div>
    )
}