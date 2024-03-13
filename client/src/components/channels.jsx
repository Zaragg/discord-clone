import { React, useState } from "react";

export default function channels({ Channels, channelSelect }) {
  const [selectedChannel, setSelectedChannel] = useState();
  return (
    <div className="channel-list">
      {Channels ? (
        Channels.map((channel) => {
          return (
            <div
              className="channel"
              key={channel._id}
              onClick={() => channelSelect(channel._id)}
            >
              <box-icon name="hash" color="#949ba4"></box-icon>
              <div className="channel-name">{channel.name}</div>
            </div>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
