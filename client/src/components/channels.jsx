import { React, useState } from "react";

export default function channels({ Channels }) {
  const [selectedChannel, setSelectedChannel] = useState();
  return (
    <div className="channel-list">
      {Channels ? (
        Channels.map((channel) => {
          return (
            <div className="channel">
              <box-icon name="hash" color="#949ba4"></box-icon>
              <div className="channel-name">{channel}</div>
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
