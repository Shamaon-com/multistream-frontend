import React, { useEffect, useState, useRef } from "react";
import { ListGroupItem } from "react-bootstrap";
import "./Home.css";
import Logo from "../img/logo.svg";
import NewDestination from "./NewDestination.js";
import { Auth, API, input } from 'aws-amplify';
import { destinations } from "../data/samples.js";
import { AiFillEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { TiTick } from "react-icons/ti";

export default function Home(props) {

    const [channels, setChannels ] = useState([]);
    const [isNew, setIsNew ] = useState(false);
    const [newTitle, setNewTitle] = useState("");

    useEffect(() => {
        onLoad();
      }, []);

    async function onLoad(){
        const user = await Auth.currentAuthenticatedUser();
        const apiName = 'apiadae06fa';
        const path = '/main/' + user.username; 

        API.get(apiName, path)
          .then(response => {
            setChannels(response);
            console.log(response);
          })
          .catch(error => {
            console.log(error.response);
         });
    };

    async function submitTitleChange(){
        return true;
    };


    /** 
     * Can be refractored into a more Reactjs way
     */
    const handleShowKey = (e) => {
        e.preventDefault();
        const id = e.currentTarget.id.split("_")[1];
        const key = document.getElementById('key_' + id);
        if(key.type == "text"){
            key.type = "password";
        } else {
            key.type = "text";
        }
    };

    const handleEdit = (e) => {
        const id = e.currentTarget.id.split("_")[1]
        var edit = document.getElementById('edit_'+ id);
        var title = document.getElementById('title_' + id);
        var tick = document.getElementById('tick_' + id);

        edit.style.display = "none";
        tick.style.display = "inline";
        title.readOnly = false;
        title.focus();
        title.value = "";
        channels[id].name = "";
    };

    const handleEditReset = (e) => {
        const id = e.currentTarget.id.split("_")[1]
        var edit = document.getElementById('edit_'+ id);
        var title = document.getElementById('title_' + id);
        var tick = document.getElementById('tick_' + id);
        tick.style.display = "none";
        edit.style.display = "inLine";
    };

    const handleEditChange = (e) => {
        const id = e.currentTarget.id.split("_")[1];
        var title = document.getElementById('title_' + id);
        if(title.value == channels[id].name){
            setNewTitle(channels[id].name);
            title.value = e.target.value;
        }
        
        console.log(title, title.value);
    };

    function renderchannelsList() {
      return (
        <>
          <ListGroupItem
            className="createNewButton"
            onClick={(e) => {
              e.preventDefault();
              setIsNew(true);
            }}
          >
            <h4>
              <b>{"\uFF0B"}</b> Create a new destination
            </h4>
          </ListGroupItem>
          <div className="destinationMainGrid">
            {channels.map((channel, i) => (
              <ListGroupItem key={i} className="destinationBox">
                <img
                  className="destiantionIcon"
                  src={
                    destinations.find((destination) => {
                      return destination.name == channel.service.toLowerCase();
                    }).icon
                  }
                />
                <div className="streamKeyHidden">
                  <input
                    className="destinationTitle"
                    id={"title_" + i}
                    type="text"
                    value={channel.name}
                    readOnly="readonly"
                    onBlur={handleEditReset}
                    onChange={handleEditChange}
                  />
                  <input
                    id={'key_' + i}
                    type="password"
                    value={channel.sk}
                    readOnly="readonly"
                  />
                </div>
                <div className="destinationOptions">
                  <TiTick
                    id={"tick_" + i}
                    className="destinationOptionsIcon"
                    onClick={submitTitleChange}
                    display="none"
                  />
                  <AiOutlineEdit
                    id={"edit_" + i}
                    className="destinationOptionsIcon"
                    onClick={handleEdit}
                    display="true"
                  />
                  <AiFillEye
                    id={'view_' + i}
                    className="destinationOptionsIcon"
                    onClick={handleShowKey}
                  />
                </div>
                {channel.active ? (
                  <BsToggleOn className="largeOptionIconsToggle" />
                ) : (
                  <BsToggleOff className="largeOptionIconsToggle" />
                )}
                <AiOutlineDelete className="largeOptionIcons" />
              </ListGroupItem>
            ))}
          </div>
        </>
      );
    }
      

    return (
        <div className="homeContainer">
            <div className="homeHeader">
                <img className="logoSmall" src={Logo} onClick={(e) => {e.preventDefault(); setIsNew(false);}}/>

            </div>
            <div className="homeBody">
                { isNew ? <NewDestination/> : renderchannelsList() }
            </div>
        </div>
    )
}