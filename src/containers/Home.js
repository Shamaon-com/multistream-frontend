import React, { useEffect, useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import "./Home.css";
import Logo from "../img/logo.svg";
import NewDestination from "./NewDestination.js";
import { Auth, API } from 'aws-amplify';

 
export default function Home(props) {

    const [channels, setChannels ] = useState([]);
    const [isNew, setIsNew ] = useState(false);

    useEffect(() => {
        onLoad();
      }, []);

    async function onLoad(){
        const user = await Auth.currentAuthenticatedUser();
        const apiName = 'apiadae06fa';
        const path = '/main/' + '_USERID_' + user.username; 

        API.get(apiName, path)
          .then(response => {
            setChannels(response);
          })
          .catch(error => {
            console.log(error.response);
         });
    };


    function renderchannelsList() {
        return (
            <div>
            <ListGroupItem className="createNewButton" onClick={(e) => {e.preventDefault(); setIsNew(true);}}> 
                <h4>
                    <b>{"\uFF0B"}</b> Create a new destination
                </h4>
            </ListGroupItem>
            {
                channels.map((channel, i) =>(
                    <ListGroupItem key={i}>
                        {channel.sk}
                    </ListGroupItem>
                ))
            }
            </div>
        )
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