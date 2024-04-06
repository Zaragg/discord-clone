import { React, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
//need to implement the avatar not being duplicated
//when user sends message again here I think

export default function Message({ userID, time, text }) {
  async function fetchUserData(userID) {
    const response = await fetch(
      `http://localhost:5000/api/user/${userID}`
    ).then((resp) => resp.json());
    return response;
  }
  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user", userID],
    queryFn: () => fetchUserData(userID),
  });
  return isLoading ? (
    "Loading"
  ) : (
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
