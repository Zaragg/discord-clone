import { React, useEffect, useState } from "react";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";
export default function MessageBox({ channel, setNewMessageReceived }) {
  const [Message, setMessage] = useState("");
  const [channelName, setChannelName] = useState("");
  const { authState } = useAuthContext();
  const currentUser = authState;
  const { socket } = useSocketContext();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/message/send`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: Message, channelID: channel }),
    }).then((resp) => resp.json());
    setMessage("");
    setNewMessageReceived(Message);
  };
  let timer = null;
  const onChangeHandler = (e) => {
    setMessage(e.target.value);
    if (timer === null) {
      socket.emit("typing", currentUser, channel);
      timer = setTimeout(() => {
        timer = null;
      }, 3000);
    }
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
    <>
      <div className="message-input">
        <div className="box-icon-container">
          <box-icon
            name="plus-circle"
            type="solid"
            color="#b5bac1"
            size="26px"
          ></box-icon>
        </div>
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            name="message"
            placeholder={`Message #${channelName}`}
            value={Message}
            onChange={(e) => {
              onChangeHandler(e);
            }}
          />
        </form>
      </div>
    </>
  );
}
