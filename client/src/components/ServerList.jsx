import React from "react";
import { useState, useEffect } from "react";
export default function serverList({ handleClick, selectedServerID }) {
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
              <div
                className={
                  server._id == selectedServerID
                    ? "serverIconSelectedDiv"
                    : "serverIconDiv"
                }
              >
                <img
                  src={server.icon_url}
                  className={
                    server._id == selectedServerID
                      ? "serverIconSelected"
                      : "serverIcon"
                  }
                ></img>
              </div>
              <span className="tooltiptext">{server.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
