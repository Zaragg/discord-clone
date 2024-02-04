import React from "react";
//need to implement the avatar not being duplicated
//when user sends message again here I think
export default function Message({ username, time, text }) {
  return (
    <div className="message">
      <div className="avatar"></div>
      <div className="message-container">
        <div className="message-headers">
          <div className="username"> {username}</div>
          <div className="time"> {time}</div>
        </div>
        <div className="message-text">{text}</div>
      </div>
    </div>
  );
}
