import { React, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../context/AuthContext";
//need to implement the avatar not being duplicated
//when user sends message again here I think

export default function Message({ messageID, userID, time, text }) {
  const [editing, setEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(text);
  const { authState } = useAuthContext();
  async function fetchUserData(userID) {
    const response = await fetch(
      `http://localhost:5000/api/user/${userID}`
    ).then((resp) => resp.json());
    return response;
  }

  async function handleEdit(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/message/update`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageID: messageID, newMessage: editedMessage }),
    }).then((resp) => resp.json());
    setEditing(false);
  }

  async function handleDelete(e) {
    const response = await fetch(`http://localhost:5000/api/message/delete`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageID: messageID }),
    }).then((resp) => resp.json());
  }

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["user", userID],
    queryFn: () => fetchUserData(userID),
  });
  return isLoading ? (
    "Loading"
  ) : (
    <div className="message">
      {userID == authState._id && (
        <div className="message-menu">
          <div className="message-menu-button" onClick={() => setEditing(true)}>
            <box-icon name="edit-alt" type="solid" color="#ffffff"></box-icon>
          </div>
          <div className="message-menu-button" onClick={() => handleDelete()}>
            <box-icon name="trash" type="solid" color="#ff0000"></box-icon>
          </div>
        </div>
      )}

      <div>
        <img src={userInfo.avatar_url} className="avatar"></img>
      </div>
      <div className="message-container">
        <div className="message-headers">
          <div className="username"> {userInfo.username}</div>
          <div className="time"> {time}</div>
        </div>
        {editing ? (
          <div className="message-box-editing">
            <div className="message-input">
              <form
                onSubmit={handleEdit}
                autoComplete="off"
                onKeyDown={(e) => {
                  if (e.key == "Escape") {
                    setEditing(false);
                  }
                }}
              >
                <input
                  type="text"
                  name="message"
                  value={editedMessage}
                  onChange={(e) => {
                    setEditedMessage(e.target.value);
                  }}
                />
              </form>
            </div>
          </div>
        ) : (
          <div className="message-text">{text}</div>
        )}
      </div>
    </div>
  );
}
