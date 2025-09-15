import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import API from "../api";

function MyComponent({recipientUserName="Jo"}) {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  // const [receivedMessages, setReceivedMessages] = useState([]);

  const { userId, currentBookId, user, defaultBook } = useContext(UserContext);

  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      auth: { userId: userId, token: API.token },
    });
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("share", (data) => {
      console.log("received message", data);
    });

    return () => {
      newSocket.disconnect();
      console.log("Disconnected from server");
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit("share", { userId, recipientUserName, currentBookId, user, defaultBook });
      // setMessage("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <div>
        <h3>Received Messages:</h3>
        <ul>
          {/* {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
}

export default MyComponent;
