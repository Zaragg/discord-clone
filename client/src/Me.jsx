import React from "react";
import ServerList from "./components/ServerList";
import Chat from "./components/Chat";
export default function () {
  return (
    <div className="me-page">
      <ServerList />
      <Chat />
    </div>
  );
}
