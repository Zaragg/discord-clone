import { React, useEffect, useState } from "react";

export default function MessageBox({ channel }) {
  const [Message, setMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    async function getChannelName() {
      if (channel) {
        const response = await fetch(
          `http://localhost:5000/api/channel/${channel}`
        ).then((resp) => resp.json());
        setChannelName(response.name);
      }
    }
    getChannelName();
  }, [channel]);
  return (
    <div className="message-input">
      <div className="box-icon-container">
        <box-icon
          name="plus-circle"
          type="solid"
          color="#b5bac1"
          size="26px"
        ></box-icon>
      </div>
      <input
        type="text"
        name="message"
        placeholder={`Message #${channelName}`}
      />
    </div>
  );
}
