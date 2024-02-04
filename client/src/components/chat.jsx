import { React, useState } from "react";
import Message from "./Message";

//mayhaps this should in the future react(heh) on a message event triggered when a user sends msg
//so we get the user info from the server
//and pass it to this

export default function Chat() {
  const [date, setDate] = useState(new Date());
  return (
    <div className="chat-background">
      <Message
        username={"User 1"}
        time={date.toDateString()}
        text={"Hello this is a test."}
      />
    </div>
  );
}
