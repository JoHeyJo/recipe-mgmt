import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import API from "../api";

function useWebSocket() {
  const [socket, setSocket] = useState(null);
  const [recipient, setRecipient] = useState(""); 
  const [action, setAction] = useState(null);
  const [message, setMessage] = useState("");

  const { userId, currentBookId, user, defaultBook } = useContext(UserContext);
  
  /** Initiates handshake, maintains connection, & disconnects on unmount */
  useEffect(() => {
    console.log("useWebSocket is mounting")

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


    /** Sends message to share book with recipient */
    function sendMessage() {
      if (socket && recipient) {
        socket.emit("share", {
          userId,
          recipient,
          currentBookId,
          user,
          defaultBook,
        });
      }
    };

  function handleRecipient(recipient:string){
    setRecipient(recipient)
  }

  return { handleRecipient, message };
}

export default useWebSocket;
