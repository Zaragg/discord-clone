import { React, useState } from "react";
//need to implement the avatar not being duplicated
//when user sends message again here I think

export default function Message({ userID, time, text }) {
  const [userInfo, setUserInfo] = useState({});
  async function fetchUserData(userID) {
    const response = await fetch(
      `http://localhost:5000/api/user/${userID}`
    ).then((resp) => resp.json());
    setUserInfo(response);
  }

  fetchUserData(userID);

  return (
    <div className="message">
      <div>
        <img src={userInfo.avatar_url} className="avatar"></img>
      </div>
      <div className="message-container">
        <div className="message-headers">
          <div className="username"> {userInfo.username}</div>
          <div className="time"> {time}</div>
        </div>
        <div className="message-text">{text}</div>
      </div>
    </div>
  );
}
