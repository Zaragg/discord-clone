import { React, useState, useEffect, useRef } from "react";
import Message from "./Message";
import MessageBox from "./MessageBox";
import { formatTime } from "../../utils/formatTime";
import { useSocketContext } from "../../context/SocketContext";
import { useAuthContext } from "../../context/AuthContext";
export default function Chat({ channel }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingText, setTypingText] = useState("");
  const messagesEndRef = useRef();
  const { authState } = useAuthContext();
  const { socket } = useSocketContext();
  const setNewMessageReceived = (message) => {
    setNewMessage(message);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  let timer;
  useEffect(() => {
    async function messages() {
      if (channel) {
        const response = await fetch(
          `http://localhost:5000/api/message/${channel}`
        ).then((resp) => resp.json());
        setMessages(response);
      }
    }

    messages();
    setTimeout(() => {
      scrollToBottom();
    }, 200);
    socket?.on("newMessage", (newMessage) => {
      setNewMessage(newMessage);
    });
    socket?.on("typing", (currentUser, currentChannel) => {
      if (currentUser._id == authState._id || currentChannel !== channel) {
        return;
      }
      clearTimeout(timer);
      setTypingText(currentUser.name);
      timer = setTimeout(() => {
        setTypingText("");
      }, 3000);
    });
    return () => {
      socket?.off("newMessage");
      socket?.off("typing");
    };
  }, [channel, newMessage, socket]);

  return (
    <div className="chat-background">
      {messages ? (
        messages.map((message) => {
          return (
            <div key={message._id} ref={messagesEndRef}>
              <Message
                userID={message.author_id}
                time={formatTime(message.timestamp)}
                text={message.message_content}
              />
            </div>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
      <div className="message-box-container">
        <div className="message-box">
          <MessageBox
            channel={channel}
            setNewMessageReceived={setNewMessageReceived}
          />
        </div>
        <div
          className={typingText == "" ? "typing-text" : "typing-text-visible"}
        >
          <div className="dot-flashing"></div>
          <p>{typingText} is typing...</p>
        </div>
      </div>
    </div>
  );
}
