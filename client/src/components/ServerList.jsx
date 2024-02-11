import React from "react";
import { useState, useEffect } from "react";
export default function serverList({ handleClick }) {
  const [serverList, setServerList] = useState([]);
  useEffect(() => {
    async function servers() {
      const response = await fetch(`http://localhost:5000/api/servers`).then(
        (resp) => resp.json()
      );
      setServerList(response);
    }
    servers();
  }, []);

  return (
    <div>
      <div className="serverList">
        {serverList.map((server) => {
          return (
            <div
              className="servertooltip"
              key={server._id}
              onClick={() => handleClick(server._id)}
            >
              <img src={server.icon_url} className="serverIcon"></img>
              <span className="tooltiptext">{server.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
