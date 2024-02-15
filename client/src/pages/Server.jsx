import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ServerList from "../components/ServerList";
import Chat from "../components/Chat";
import Channels from "../components/Channels";
export default function () {
  const [selectedServerID, setSelectedServerID] = useState("");
  const [selectedServer, setSelectedServer] = useState({});
  // const defaultServerID = "65c67b457a0550f6aaa921dd";
  function handleClick(id) {
    setSelectedServerID(id);
  }
  //if (selectedServerID == "") setSelectedServerID(defaultServerID);

  var route = useLocation();
  var Afterslash = route.pathname.lastIndexOf("/");
  const serverRouteID = route.pathname.substring(Afterslash + 1);

  useEffect(() => {
    async function getID() {
      setSelectedServerID(serverRouteID);
    }
    getID();
  }, [route]);

  console.log(`selected server ID: ${selectedServerID}`);

  useEffect(() => {
    async function servers() {
      if (selectedServerID !== "") {
        const response = await fetch(
          `http://localhost:5000/api/${selectedServerID}`
        ).then((resp) => resp.json());
        console.log(response);
        setSelectedServer(response);
      }
    }
    servers();
  }, [selectedServerID]);

  console.log(selectedServer.channels);
  return (
    <div className="me-page">
      <ServerList selectedServerID={selectedServerID} />
      <Channels Channels={selectedServer.channels} />
      <Chat />
    </div>
  );
}
