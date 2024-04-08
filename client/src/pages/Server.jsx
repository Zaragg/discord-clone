import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ServerList from "../components/ServerList";
import Chat from "../components/Chat";
import Channels from "../components/Channels";
import UserList from "../components/UserList";
export default function () {
  const [selectedServerID, setSelectedServerID] = useState("");
  const [selectedServer, setSelectedServer] = useState({});
  const [defaultChannel, setDefaultChannel] = useState();
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState();
  // const defaultServerID = "65c67b457a0550f6aaa921dd";
  function handleClick(id) {
    setSelectedServerID(id);
  }
  function channelSelect(id) {
    console.log(id);
    setSelectedChannel(id);
  }

  // MAKE SURE TO TRY USEPARAMS INSTEAD
  // var route = useLocation();
  // var Afterslash = route.pathname.lastIndexOf("/");
  // const serverRouteID = route.pathname.substring(Afterslash + 1);

  // useEffect(() => {
  //   async function getID() {
  //     setSelectedServerID(serverRouteID);
  //   }
  //   getID();
  // }, [route]);

  const { serverId } = useParams();
  console.log(serverId);
  // useEffect(() => {
  //   async function getID() {
  //     setSelectedServerID(serverId);
  //     console.log(`selected server ID: ${selectedServerID}`);
  //   }

  //   getID();
  // }, [serverId]);

  useEffect(() => {
    async function servers() {
      if (serverId) {
        const server = await fetch(
          `http://localhost:5000/api/${serverId}`
        ).then((resp) => resp.json());
        setSelectedServer(server);
      }
    }
    async function channels() {
      if (serverId) {
        const channels = await fetch(
          `http://localhost:5000/api/channels/${serverId}`
        ).then((channels) => channels.json());
        setChannels(channels);
        setDefaultChannel(channels[0]._id);
      }
    }

    servers();
    channels();
  }, [serverId]);

  return (
    <div className="me-page">
      <ServerList selectedServerID={serverId} />
      <Channels
        Channels={channels}
        channelSelect={channelSelect}
        selectedChannel={selectedChannel}
        defaultChannel={defaultChannel}
      />
      <Chat channel={selectedChannel} />
      <UserList serverId={serverId} />
    </div>
  );
}
