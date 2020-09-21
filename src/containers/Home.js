import React, { useEffect, useState } from "react";
import { ListGroupItem } from "react-bootstrap";
import "./Home.css";
import Logo from "../img/logo.svg";
import NewDestination from "./NewDestination.js";
import GoLivePage from "./GoLivePage.js";
import { Auth, API, input } from "aws-amplify";
import { destinations } from "../data/samples.js";
import { AiFillEye, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { TiTick } from "react-icons/ti";
import { Spinner } from "react-bootstrap";


export default function Home(props) {
  const [channels, setChannels] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [goLive, setGoLive] = useState(false);
  const [user, setUser] = useState([]);
  const [showGoLive, setShowGoLive] = useState(false);
  const [userStreamKey, setUserStreamKey] = useState("");
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    const user = await Auth.currentAuthenticatedUser();
    setUser(user);
    const apiName = "api720b87a2";
    const path = "/main/" + user.username;
    setIsLoading(true);
    API.get(apiName, path)
      .then((response) => {
        setChannels(
          response.filter((response) => response.service !== "primary")
        );
        setUserStreamKey(
          response.filter((response) => response.service === "primary")
        );
        //console.log(response);
        setIsLoading(false);
        if (response.filter((response) => response.service !== "primary").length > 0) {
          setShowGoLive(true);
        }
        else {
          setShowGoLive(false);
        }
      })
      .catch((error) => {
        //console.log(error.response);
      });
  }

  async function handleDelete(e) {
    console.log(user);
    e.preventDefault();
    setIsLoading(true);
    const id = e.currentTarget.id.split("_")[1];
    const apiName = "api720b87a2";
    const path = "/main/object/" + user.username + "/" + channels[id].sk;

    API.del(apiName, path)
      .then((response) => {
        //console.log(response);
        setIsLoading(false);
        onLoad();
      })
      .catch((error) => {
        //console.log(error.response);
      });
  }

  async function handleUpdate(e) {
    setIsLoading(true);
    const id = e.currentTarget.id.split("_")[1];
    const apiName = "api720b87a2";
    const path = "/main";
    const data = {
      body: {
        pk: user.username,
        sk: channels[id].sk,
        name: document.getElementById("title_" + id).value,
        service: channels[id].service,
        active: channels[id].active,
      },
    };
    API.put(apiName, path, data)
      .then((response) => {
        //console.log(response);
        document.getElementById("tick_" + id).style.display = "none";
        document.getElementById("edit_" + id).style.display = "inline";
        setIsLoading(false);
      })
      .catch((error) => {
        //console.log(error.response);
      });
  }

  /**
   * Can be refractored into a more Reactjs way
   */
  const handleShowKey = (e) => {
    e.preventDefault();
    //console.log(e);
    const id = e.currentTarget.id.split("_")[1];
    const key = document.getElementById("key_" + id);
    if (key.type === "text") {
      key.type = "password";
    } else {
      key.type = "text";
    }
  };

  const handleEdit = (e) => {
    const id = e.currentTarget.id.split("_")[1];
    var edit = document.getElementById("edit_" + id);
    var title = document.getElementById("title_" + id);
    var tick = document.getElementById("tick_" + id);

    edit.style.display = "none";
    tick.style.display = "inline";
    title.readOnly = false;
    title.focus();
    title.value = "";
  };

  /** 
   * Missing a way to get out of focus and then click the tick
   * onBlur={handleEditReset}
   
  const handleEditReset = (e) => {
    //console.log(e);
    const id = e.currentTarget.id.split("_")[1];
    var edit = document.getElementById("edit_" + id);
    var title = document.getElementById("title_" + id);
    var tick = document.getElementById("tick_" + id);
    tick.style.display = "none";
    edit.style.display = "inLine";
  };
  */

  const handleEditChange = (e) => {
    const id = e.currentTarget.id.split("_")[1];
    let newArr = [...channels];
    newArr[id].name = e.target.value;
    setChannels(newArr);
  };

  const activeToggle = (e) => {
    e.preventDefault();
    const id = e.currentTarget.id.split("_")[1];
    let newArr = [...channels];
    newArr[id].active = !newArr[id].active;
    setChannels(newArr);
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
                    return destination.name === channel.service.toLowerCase();
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
                  //onBlur={handleEditReset}
                  onChange={handleEditChange}
                />
                <input
                  id={"key_" + i}
                  type="password"
                  value={channel.sk}
                  readOnly="readonly"
                />
              </div>
              <div className="destinationOptions">
                <TiTick
                  id={"tick_" + i}
                  className="destinationOptionsIcon"
                  onClick={handleUpdate}
                  display="none"
                />
                <AiOutlineEdit
                  id={"edit_" + i}
                  className="destinationOptionsIcon"
                  onClick={handleEdit}
                  display="true"
                />
                <AiFillEye
                  id={"view_" + i}
                  className="destinationOptionsIcon"
                  onClick={handleShowKey}
                />
              </div>
              {channel.active ? (
                <BsToggleOn
                  id={"toggle_" + i}
                  className="largeOptionIconsToggle"
                  onClick={(e) => {
                    activeToggle(e);
                    handleUpdate(e);
                  }}
                />
              ) : (
                <BsToggleOff
                  id={"toggle_" + i}
                  className="largeOptionIconsToggle"
                  onClick={(e) => {
                    activeToggle(e);
                    handleUpdate(e);
                  }}
                />
              )}
              <AiOutlineDelete
                id={"delete_" + i}
                className="largeOptionIcons"
                onClick={handleDelete}
              />
            </ListGroupItem>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="homeContainer">
      <div className="homeHeader">
        <img
          className="logoSmall"
          src={Logo}
          onClick={(e) => {
            e.preventDefault();
            setIsNew(false);
            setGoLive(false);
            onLoad();
          }}
        />
        {isLoading ? (
          <Spinner animation="grow" />
        ) : showGoLive ? (
          <div
            className="redEmitirButton"
            onClick={(e) => {
              e.preventDefault();
              //console.log(e);
              setGoLive(true);
              setShowGoLive(false);
            }}
          >
            emitir
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="homeBody">
        {isNew ? (
          <NewDestination
            setIsLoading={setIsLoading}
            setIsNew={setIsNew}
            onLoad={onLoad}
          />
        ) : goLive ? (
          <GoLivePage
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            userStreamKey={userStreamKey}
            user={user}
          />
        ) : (
          renderchannelsList()
        )}
      </div>
    </div>
  );
}
