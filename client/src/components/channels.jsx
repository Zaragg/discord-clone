import { React, useState } from "react";

export default function channels() {
  const [selectedChannel, setSelectedChannel] = useState();
  return (
    <div className="channel-list">
      <div className="channel">
        <box-icon name="hash" color="#949ba4"></box-icon>
        <div className="channel-name">general</div>
      </div>
    </div>
  );
}
