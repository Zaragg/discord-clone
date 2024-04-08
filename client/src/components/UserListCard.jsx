import React from "react";

export default function UserListCard({ member, isOffline }) {
  return (
    <div className={isOffline ? "user-list-card-offline" : "user-list-card"}>
      <div className="pfp-container">
        <img src={member.avatar_url} className="pfp"></img>
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
        <p>{member.username}</p>
      </div>
    </div>
  );
}
