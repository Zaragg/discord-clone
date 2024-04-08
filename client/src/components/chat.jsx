import { React, useState, useEffect, useRef } from "react";
import Message from "./Message";
import MessageBox from "./MessageBox";
import { formatTime } from "../../utils/formatTime";
export default function Chat({ channel }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef();
  const setNewMessageReceived = (message) => {
    setNewMessage(message);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

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
  }, [channel, newMessage]);

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
      </div>
    </div>
  );
}
