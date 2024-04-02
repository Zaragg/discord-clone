import { React, useState, useEffect } from "react";
import Message from "./Message";
import MessageBox from "./MessageBox";
//mayhaps this should in the future react(heh) on a message event triggered when a user sends msg
//so we get the user info from the server
//and pass it to this

export default function Chat({ channel }) {
  const [date, setDate] = useState(new Date());
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function messages() {
      if (channel) {
        const response = await fetch(
          `http://localhost:5000/api/message/${channel}`
        ).then((resp) => resp.json());
        setMessages(response);
        console.log(response);
      }
    }

    messages();
  }, [channel]);

  return (
    <div className="chat-background">
      {messages ? (
        messages.map((message) => {
          return (
            <Message
              userID={message.author_id}
              time={date.toDateString()}
              text={message.message_content}
            />
          );
        })
      ) : (
        <p>Loading...</p>
      )}
      <div className="message-box">
        <MessageBox channel={channel} />
      </div>
    </div>
  );
}
