import React from "react";
import ServerList from "./components/ServerList";
import Chat from "./components/Chat";
import Channels from "./components/Channels";
export default function () {
  return (
    <div className="me-page">
      <ServerList />
      <Channels />
      <Chat />
    </div>
  );
}
