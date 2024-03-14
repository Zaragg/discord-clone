import { React, useEffect, useState } from "react";

export default function channels({
  Channels,
  channelSelect,
  selectedChannel,
  defaultChannel,
}) {
  //this shit is not fucking working

  useEffect(() => {
    if (!selectedChannel) {
      channelSelect(defaultChannel);
    }
    channelSelect(defaultChannel);
  }, [Channels]);

  return (
    <div className="channel-list">
      {Channels ? (
        Channels.map((channel) => {
          return (
            <div
              className={
                channel._id == selectedChannel ? "channel-selected" : "channel"
              }
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
