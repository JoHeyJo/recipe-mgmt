import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import API from "../api";

function useWebSocket() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");

  const { userId, currentBookId, user, defaultBook } = useContext(UserContext);

  /** Initiates handshake, maintains connection, & disconnects on unmount */
  useEffect(() => {
    const newSocket = io("http://localhost:5000", {
      auth: { userId: userId, token: API.token },
    });

    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });

    newSocket.on("share", (data) => {
      setMessage(data.data)
      console.log("received message", data);
    });

    return () => {
      newSocket.disconnect();
      console.log("Disconnected from server");
    };
  }, []);

  /** Sends message to share book with recipient */
  function sendMessage(recipient: string) {
    if (socket && recipient) {
      socket.emit("share", {
        userId,
        recipient,
        currentBookId,
        user,
        defaultBook,
      });
    }
  }

  /** Resests message value */
  function resetMessage(){
    setMessage("")
  }

  return { sendMessage, message, resetMessage };
}

export default useWebSocket;
