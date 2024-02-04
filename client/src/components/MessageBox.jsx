import { React, useState } from "react";

export default function MessageBox() {
  const [Message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="message-input">
      <div className="box-icon-container">
        <box-icon
          name="plus-circle"
          type="solid"
          color="#b5bac1"
          size="26px"
        ></box-icon>
      </div>
      <input type="text" name="message" placeholder="Message @pomy" />
    </div>
  );
}
