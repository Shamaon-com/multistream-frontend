import React, { useEffect, useState, useRef } from "react";
import "./GoLivePage.css";
import { Auth, API, input } from "aws-amplify";
import { packages } from "../data/samples";
import short from 'short-uuid';

export default function GoLivePage(props) {
  const [streamkey, setStreamkey] = useState("");

  useEffect(() => {
    props.setIsLoading(true);
    onLoad();

  }, []);

  async function onLoad() {

    const apiName = "api720b87a2";
    const path = "/main/" + props.user.username;
    await API.get(apiName, path)
      .then((response) => {
        console.log(response);
        const activeChannels = response.filter((channel) => channel.active);
        const key = genererateKey(
          response.filter((channel) => channel.service === "primary")
        );
        console.log(key);
        if (key !== null) {
          activeChannels.forEach((channel) => {
            channel.sk = key;
            handleUpdate(channel);
          });
        }
        props.setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleUpdate(body) {
    const apiName = "api720b87a2";
    const path = "/main";
    const data = {
      body,
    };
    API.put(apiName, path, data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  async function handleDelete(sk) {
    const apiName = "api720b87a2";
    const path = "/main/object/" + props.user.username + "/" + sk;

    API.del(apiName, path)
      .catch((error) => {
        console.log(error.response);
      });
  }


  const genererateKey = (keyObject) => {
    //console.log(keyObject[0].createdat, (packages[keyObject[0].userpackage].hours*60*60*1000));
    //console.log(keyObject[0].createdat + (packages[keyObject[0].userpackage].hours*60*60*1000) < Date.now()); 
    const shortkey = short.generate()
    const key = {
        'pk':props.user.username,
        'sk': props.user.username + '_' + shortkey,
        'service': "primary",
        'createdat': Date.now(),
        'userpackage': 1
    };
    if(keyObject.length === 0){
        console.log(key);
        setStreamkey(key);
        handleUpdate(key);
        return shortkey;
    }
    else if (keyObject[0].createdat + (packages[keyObject[0].userpackage].hours*60*60*1000) < Date.now()){
        console.log(key);
        handleDelete(keyObject[0].sk);
        handleUpdate(key);
        setStreamkey(key);
        return shortkey;
    }
    else {
        setStreamkey(keyObject[0].sk);
        return null;

    }
  };

  const renderDetails = () => {
    return (
      <div>
        <div className="textBig">¡Ya puedes emtir en directo!</div>
        <div className="streamDetails">
          <div className="streamKey">rtmp://live.shamaon.com/live</div>
          <div className="key">{streamkey}</div>
        </div>
      </div>
    );
  };

  const renderWaiting = () => {
      return (
    <div>
        <div className="textBig">Generando clave de emision...</div>

    </div> 
    )
  }
  /*
    const renderPaymentForm = () => {

    }

    */

  return <>{props.isLoading ? renderWaiting() : renderDetails()}</>;
}
