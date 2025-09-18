import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import API from "../api";

const BASEURL = process.env.REACT_APP_BASE_URL;

const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

function useWebSocket() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [data, setData] = useState();

  const { userId, currentBookId, user, currentBook } = useContext(UserContext);
  console.log("Current Book", currentBook)
  /** Initiates handshake, maintains connection, & disconnects on unmount */
  useEffect(() => {
    const newSocket = io(`${protocol}://${BASEURL}`, {
      auth: { userId: userId, token: API.token },
    });

    setSocket(newSocket);
    newSocket.on("connect", () => {
    });

    newSocket.on("book_shared", (data) => {
      setMessage(data.data);
    });

    newSocket.on("user_shared_book", (data) => {
      setMessage(data.message);
      setData(data.books);
      setStatus(200);
    });

    newSocket.on("error_sharing_book", (data) => {
      setMessage(data.data);
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
        currentBook,
      });
    }
  }

  /** Resets message */
  function resetMessage() {
    setMessage("");
    setStatus(null);
  }

  return { sendMessage, message, resetMessage, status, data };
}

export default useWebSocket;
