import React from "react";
import { useAuthContext } from "../../context/AuthContext";

const user = await fetch(`http://localhost:5000/api/users/profile`, {
  credentials: "include",
}).then((resp) => resp.json());

function UserCard() {
  const { setAuthState } = useAuthContext();

  const logOutHandler = async () => {
    const response = await fetch(`http://localhost:5000/api/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((resp) => resp.json());
    localStorage.removeItem("userInfo", JSON.stringify(response));
    setAuthState(null);
  };

  return (
    <div className="user-list-item">
      <div className="user-list-item-pfp-name">
        <div className="pfp-container">
          <img src={user.avatar_url} className="pfp"></img>
          <div className="pfp-status pfp-status-busy">
            <box-icon
              name="minus"
              flip="horizontal"
              color="#1E1F22"
              size="15px"
            ></box-icon>
          </div>
        </div>
        <div>
          <p>{user.username}</p>
          <p>Do Not Distu...</p>
        </div>
      </div>
      <div>
        <box-icon
          name="microphone-off"
          type="solid"
          flip="horizontal"
          color="#EC3E41"
          size="20px"
        ></box-icon>
        <box-icon
          name="headphone"
          flip="horizontal"
          size="20px"
          color="#B5BAC1"
        ></box-icon>
        <div className="log-out-button" onClick={() => logOutHandler()}>
          <box-icon name="log-out" color="#B5BAC1" size="20px"></box-icon>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
