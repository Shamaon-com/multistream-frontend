import React, { useEffect, useState } from "react";
import "./GoLivePage.css";
import { API } from "aws-amplify";
import { packages } from "../data/samples";
import short from "short-uuid";
import { HiOutlineClipboardCopy } from "react-icons/hi";

export default function GoLivePage(props) {
  const [streamkey, setStreamkey] = useState("");

  useEffect(() => {
    props.setIsLoading(true);
    genererateKey(props.userStreamKey);
    props.setIsLoading(false);
  }, []);

  async function handleUpdate(body) {
    const apiName = "api720b87a2";
    const path = "/main";
    const data = {
      body,
    };
    API.put(apiName, path, data)
      .then((response) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  async function handleDelete(sk) {
    const apiName = "api720b87a2";
    const path = "/main/object/" + props.user.username + "/" + sk;

    API.del(apiName, path).catch((error) => {
      console.log(error.response);
    });
  }

  const genererateKey = (keyObject) => {
    const shortkey = short.generate();
    const key = {
      pk: props.user.username,
      sk: props.user.username + "_" + shortkey,
      service: "primary",
      createdat: Date.now(),
      userpackage: 1,
    };
    if (keyObject.length === 0) {
      handleUpdate(key);
      setStreamkey(key.sk);

    } else if (
      keyObject[0].createdat +
        packages[keyObject[0].userpackage].hours * 60 * 60 * 1000 <
      Date.now()
    ) {
      handleDelete(keyObject[0].sk);
      handleUpdate(key);
      setStreamkey(key.sk);
    } else {
      setStreamkey(keyObject[0].sk);
    }
  };

  const renderDetails = () => {
    return (
      <div>
        <div className="textBig">¡Ya puedes emtir en directo!</div>
        <div className="streamSettingsGrid">
          <div className="streamSettingsBox">
            <p className="streamSettingsTag">Servidor:</p>
            <input readOnly="readonly" className="streamSettingsText" value="rtmp://madrid.shamaon.com/live"/>
            <HiOutlineClipboardCopy className="streamSettingsIcon" />
          </div>
          <div className="streamSettingsBox">
            <p className="streamSettingsTag">Clave:</p>
            <input readOnly="readonly" className="streamSettingsText" value={streamkey}/>
            <HiOutlineClipboardCopy className="streamSettingsIcon" />
          </div>
        </div>
      </div>
    );
  };

  const renderWaiting = () => {
    return (
      <div>
        <div className="textBig">Generando clave de emision...</div>
      </div>
    );
  };
  /*
    const renderPaymentForm = () => {

    }

    */

  return <>{props.isLoading ? renderWaiting() : renderDetails()}</>;
}
