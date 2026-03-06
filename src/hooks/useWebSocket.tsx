import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { UserContext } from "../context/UserContext";
import { RecipeContext } from "../context/RecipeContext";
import API from "../api";
import { BASEURL, protocol } from "../api";

/** Custom Hook to create open connection between client and server 
 * 
 * Notes: Should auto connect be turned off? 
 * 
 * MainContainer - > useWebSocket
 */
function useWebSocket() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [data, setData] = useState();

  const { userId, currentBookId, user, currentBook } = useContext(UserContext);
  const {recipeId, created_by_id, } = useContext(RecipeContext); 
  console.log("web hook data",recipeId, created_by_id, user)
  /** Initiates handshake, maintains connection, & disconnects on unmount */
  useEffect(() => {
    const newSocket = io(`${protocol}://${BASEURL}`, {
      auth: { userId: userId, token: API.token },
    });

    setSocket(newSocket);
    newSocket.on("connect", () => {
    });

    newSocket.on("book_shared", (data) => {
      console.log(data)
      setMessage(data.message);
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
      // console.log("Disconnected from server");
    };
  }, []);

  /** Sends message to share book with recipient */
  function sendBook(recipient: string) {
    if (socket && recipient) {
      socket.emit("share_book", {
        userId,
        recipient,
        currentBookId,
        user,
        currentBook: currentBook.title,
      });
    }
  }

  function sendRecipe(recipient: string) {
    if (socket && recipient) {
      socket.emit("share_book", {
        userId,
        recipient,
        currentBookId,
        user,
        currentBook: currentBook.title,
      });
    }
  }

  /** Resets message */
  function resetMessage() {
    setMessage("");
    setStatus(null);
  }

  return { sendRecipe, sendBook, message, resetMessage, status, data };
}

export default useWebSocket;
